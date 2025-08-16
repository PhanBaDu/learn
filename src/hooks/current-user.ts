'use server';

import prisma from '@/utils/db';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { User } from '@prisma/client';

export async function getCurrentUser(): Promise<User | null> {
  try {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user || user === null || !user.id) {
      return null;
    }

    // Thêm timeout cho database query
    const currentUser = await Promise.race([
      prisma.user.findUnique({
        where: {
          id: user.id,
        },
      }),
      new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Database query timeout')), 5000)
      )
    ]) as User | null;

    return currentUser;
  } catch (error) {
    console.error('Error in getCurrentUser:', error);
    
    // Nếu là lỗi connection, thử tạo user mới
    if (error instanceof Error && error.message.includes('connection')) {
      try {
        const { getUser } = getKindeServerSession();
        const user = await getUser();
        
        if (user && user.id) {
          // Tạo user mới nếu chưa tồn tại
          const newUser = await prisma.user.upsert({
            where: { id: user.id },
            update: {},
            create: {
              id: user.id,
              email: user.email || '',
              firstName: user.given_name || '',
              lastName: user.family_name || '',
              profileImage: user.picture || '',
            },
          });
          return newUser;
        }
      } catch (upsertError) {
        console.error('Error creating user:', upsertError);
      }
    }
    
    return null;
  }
}
