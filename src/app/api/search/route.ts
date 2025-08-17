import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/utils/db';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    // Check if database is available
    if (!process.env.DATABASE_URL) {
      console.error('DATABASE_URL is not configured');
      return NextResponse.json(
        { error: 'Database configuration error' },
        { status: 500 }
      );
    }

    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q');

    if (!query || query.trim() === '') {
      return NextResponse.json({ results: [] });
    }

    const searchTerm = query.trim();
    
    // Split search term into individual words for better matching
    const searchWords = searchTerm.split(/\s+/).filter(word => word.length > 0);
    
    // Create search conditions for each word
    const searchConditions = searchWords.map(word => ({
      OR: [
        {
          title: {
            contains: word,
            mode: 'insensitive' as const,
          },
        },
        {
          section: {
            course: {
              title: {
                contains: word,
                mode: 'insensitive' as const,
              },
            },
          },
        },
        {
          section: {
            course: {
              instructorName: {
                contains: word,
                mode: 'insensitive' as const,
              },
            },
          },
        },
      ],
    }));

    // Search for videos by lesson title, course title, or instructor name
    // First try exact match, then try partial matches
    let results = await prisma.lesson.findMany({
      where: {
        OR: [
          // Exact match
          {
            title: {
              contains: searchTerm,
              mode: 'insensitive' as const,
            },
          },
          {
            section: {
              course: {
                title: {
                  contains: searchTerm,
                  mode: 'insensitive' as const,
                },
              },
            },
          },
          {
            section: {
              course: {
                instructorName: {
                  contains: searchTerm,
                  mode: 'insensitive' as const,
                },
              },
            },
          },
        ],
      },
      include: {
        section: {
          include: {
            course: {
              select: {
                id: true,
                title: true,
                instructorName: true,
                thumbnail: true,
                teacherImage: true,
              },
            },
          },
        },
      },
      orderBy: [
        {
          section: {
            course: {
              title: 'asc',
            },
          },
        },
        {
          section: {
            order: 'asc',
          },
        },
        {
          order: 'asc',
        },
      ],
      take: 20, // Limit results to 20
    });

    // If we don't have enough results, try searching with individual words
    if (results.length < 10 && searchWords.length > 1) {
      const additionalResults = await prisma.lesson.findMany({
        where: {
          OR: searchConditions.flatMap(condition => condition.OR),
        },
        include: {
          section: {
            include: {
              course: {
                select: {
                  id: true,
                  title: true,
                  instructorName: true,
                  thumbnail: true,
                  teacherImage: true,
                },
              },
            },
          },
        },
        orderBy: [
          {
            section: {
              course: {
                title: 'asc',
              },
            },
          },
          {
            section: {
              order: 'asc',
            },
          },
          {
            order: 'asc',
          },
        ],
        take: 20,
      });

      // Merge results and remove duplicates
      const allResults = [...results, ...additionalResults];
      const uniqueResults = allResults.filter((result, index, self) => 
        index === self.findIndex(r => r.id === result.id)
      );
      results = uniqueResults.slice(0, 20);
    }

    // If still not enough results, try fuzzy search with partial word matching
    if (results.length < 5) {
      const fuzzyResults = await prisma.lesson.findMany({
        where: {
          OR: [
            // Search for partial matches in title
            ...searchWords.map(word => ({
              title: {
                contains: word,
                mode: 'insensitive' as const,
              },
            })),
            // Search for partial matches in course title
            ...searchWords.map(word => ({
              section: {
                course: {
                  title: {
                    contains: word,
                    mode: 'insensitive' as const,
                  },
                },
              },
            })),
            // Search for partial matches in instructor name
            ...searchWords.map(word => ({
              section: {
                course: {
                  instructorName: {
                    contains: word,
                    mode: 'insensitive' as const,
                  },
                },
              },
            })),
          ],
        },
        include: {
          section: {
            include: {
              course: {
                select: {
                  id: true,
                  title: true,
                  instructorName: true,
                  thumbnail: true,
                  teacherImage: true,
                },
              },
            },
          },
        },
        orderBy: [
          {
            section: {
              course: {
                title: 'asc',
              },
            },
          },
          {
            section: {
              order: 'asc',
            },
          },
          {
            order: 'asc',
          },
        ],
        take: 20,
      });

      // Merge all results and remove duplicates
      const allResults = [...results, ...fuzzyResults];
      const uniqueResults = allResults.filter((result, index, self) => 
        index === self.findIndex(r => r.id === result.id)
      );
      results = uniqueResults.slice(0, 20);
    }

    // If still not enough results, try advanced fuzzy search using raw SQL
    if (results.length < 3) {
      try {
        const rawResults = await prisma.$queryRaw`
          SELECT DISTINCT l.*, s.title as section_title, s."order" as section_order, 
                 c.id as course_id, c.title as course_title, c."instructorName", 
                 c.thumbnail, c."teacherImage"
          FROM "Lesson" l
          JOIN "Section" s ON l."sectionId" = s.id
          JOIN "Course" c ON s."courseId" = c.id
          WHERE (
            LOWER(l.title) LIKE LOWER(${`%${searchTerm}%`}) OR
            LOWER(c.title) LIKE LOWER(${`%${searchTerm}%`}) OR
            LOWER(c."instructorName") LIKE LOWER(${`%${searchTerm}%`}) OR
            LOWER(l.title) SIMILAR TO LOWER(${`%(${searchWords.join('|')})%`}) OR
            LOWER(c.title) SIMILAR TO LOWER(${`%(${searchWords.join('|')})%`}) OR
            LOWER(c."instructorName") SIMILAR TO LOWER(${`%(${searchWords.join('|')})%`}) OR
            LOWER(l.title) ~ LOWER(${`.*${searchWords.join('.*')}.*`}) OR
            LOWER(c.title) ~ LOWER(${`.*${searchWords.join('.*')}.*`}) OR
            LOWER(c."instructorName") ~ LOWER(${`.*${searchWords.join('.*')}.*`})
          )
          ORDER BY c.title ASC, s."order" ASC, l."order" ASC
          LIMIT 20
        `;

        // Transform raw results to match our expected format
        const transformedRawResults = (rawResults as Array<{
          id: string;
          title: string;
          description: string;
          youtubeVideoId: string;
          duration: number;
          order: number;
          sectionId: string;
          createdAt: Date;
          updatedAt: Date;
          section_title: string;
          section_order: number;
          course_id: string;
          course_title: string;
          instructorName: string;
          thumbnail: string;
          teacherImage: string;
        }>).map((row) => ({
          id: row.id,
          title: row.title,
          description: row.description,
          youtubeVideoId: row.youtubeVideoId,
          duration: row.duration,
          order: row.order,
          sectionId: row.sectionId,
          createdAt: row.createdAt,
          updatedAt: row.updatedAt,
          section: {
            id: row.sectionId,
            title: row.section_title,
            order: row.section_order,
            course: {
              id: row.course_id,
              title: row.course_title,
              instructorName: row.instructorName,
              thumbnail: row.thumbnail,
              teacherImage: row.teacherImage,
            },
          },
        }));

        // Merge all results and remove duplicates
        const allResults = [...results, ...transformedRawResults];
        const uniqueResults = allResults.filter((result, index, self) => 
          index === self.findIndex(r => r.id === result.id)
        );
        results = uniqueResults.slice(0, 20) as typeof results;
      } catch (error) {
        console.error('Raw SQL search error:', error);
        // Continue with existing results if raw SQL fails
      }
    }

    // Transform results to include more useful information and calculate relevance score
    const transformedResults = results.map((lesson) => {
      // Calculate relevance score based on how well the search term matches
      let relevanceScore = 0;
      const searchLower = searchTerm.toLowerCase();
      const titleLower = lesson.title.toLowerCase();
      const courseTitleLower = lesson.section.course.title.toLowerCase();
      const instructorLower = lesson.section.course.instructorName.toLowerCase();

      // Exact match gets highest score
      if (titleLower.includes(searchLower)) relevanceScore += 100;
      if (courseTitleLower.includes(searchLower)) relevanceScore += 80;
      if (instructorLower.includes(searchLower)) relevanceScore += 60;

      // Partial word matches
      searchWords.forEach(word => {
        const wordLower = word.toLowerCase();
        if (titleLower.includes(wordLower)) relevanceScore += 50;
        if (courseTitleLower.includes(wordLower)) relevanceScore += 40;
        if (instructorLower.includes(wordLower)) relevanceScore += 30;
      });

      // Bonus for exact title match
      if (titleLower === searchLower) relevanceScore += 200;

      return {
        id: lesson.id,
        title: lesson.title,
        description: lesson.description,
        youtubeVideoId: lesson.youtubeVideoId,
        duration: lesson.duration,
        courseId: lesson.section.course.id,
        courseTitle: lesson.section.course.title,
        instructorName: lesson.section.course.instructorName,
        courseThumbnail: lesson.section.course.thumbnail,
        teacherImage: lesson.section.course.teacherImage,
        sectionTitle: lesson.section.title,
        sectionOrder: lesson.section.order,
        lessonOrder: lesson.order,
        relevanceScore,
      };
    });

    // Sort by relevance score (highest first)
    transformedResults.sort((a, b) => b.relevanceScore - a.relevanceScore);

    return NextResponse.json({ results: transformedResults });
  } catch (error) {
    console.error('Search error:', error);
    return NextResponse.json(
      { error: 'Có lỗi xảy ra khi tìm kiếm' },
      { status: 500 }
    );
  }
}
