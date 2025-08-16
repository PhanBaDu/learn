'use client';

import { BookOpen, Calendar, Clock, User, ArrowRight, Code } from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  readTime: string;
  tags: string[];
  image: string;
  featured?: boolean;
}

const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'Next.js 14: Hướng dẫn toàn diện cho React Framework hiện đại',
    excerpt: 'Khám phá Next.js 14 với App Router, Server Components, và các tính năng mới nhất để xây dựng ứng dụng web hiệu suất cao.',
    content: `
      <h2>Next.js là gì?</h2>
      <p>Next.js là một React framework cho phép bạn xây dựng ứng dụng web full-stack với các tính năng như server-side rendering (SSR), static site generation (SSG), API routes, và nhiều tính năng khác. Được phát triển bởi Vercel, Next.js đã trở thành một trong những framework phổ biến nhất cho React developers.</p>
      
      <h3>Những tính năng chính của Next.js 14</h3>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
        <div class="bg-blue-50 p-4 rounded-lg border border-blue-200">
          <h4 class="font-semibold text-blue-800 mb-2">🚀 App Router</h4>
          <p class="text-blue-700 text-sm">File-system based routing với Server Components mặc định</p>
        </div>
        <div class="bg-green-50 p-4 rounded-lg border border-green-200">
          <h4 class="font-semibold text-green-800 mb-2">⚡ Server Components</h4>
          <p class="text-green-700 text-sm">Giảm bundle size và cải thiện performance</p>
        </div>
        <div class="bg-purple-50 p-4 rounded-lg border border-purple-200">
          <h4 class="font-semibold text-purple-800 mb-2">🔧 Turbopack</h4>
          <p class="text-purple-700 text-sm">Bundler nhanh hơn Webpack 700x</p>
        </div>
        <div class="bg-orange-50 p-4 rounded-lg border border-orange-200">
          <h4 class="font-semibold text-orange-800 mb-2">📱 Responsive</h4>
          <p class="text-orange-700 text-sm">Tối ưu cho mọi thiết bị và màn hình</p>
        </div>
      </div>

      <h3>1. Cài đặt và Khởi tạo dự án</h3>
      <p>Bắt đầu với Next.js rất đơn giản:</p>
      <pre><code class="language-bash">npx create-next-app@latest my-next-app
cd my-next-app
npm run dev</code></pre>
      
      <p>Hoặc với TypeScript:</p>
      <pre><code class="language-bash">npx create-next-app@latest my-next-app --typescript --tailwind --eslint</code></pre>

      <h3>2. App Router - Cách tiếp cận mới</h3>
      <p>Next.js 14 sử dụng App Router với cấu trúc thư mục mới:</p>
      <pre><code class="language-plaintext">app/
├── layout.tsx          # Root layout
├── page.tsx           # Home page
├── about/
│   └── page.tsx       # About page
├── blog/
│   ├── layout.tsx     # Blog layout
│   ├── page.tsx       # Blog list
│   └── [slug]/
│       └── page.tsx   # Dynamic blog post
└── api/
    └── users/
        └── route.ts   # API route</code></pre>

      <h3>3. Server Components vs Client Components</h3>
      <p>Next.js 14 mặc định sử dụng Server Components:</p>
      
      <h4>Server Component (mặc định)</h4>
      <pre><code class="language-tsx">// app/page.tsx
async function getData() {
  const res = await fetch('https://api.example.com/data')
  return res.json()
}

export default async function Page() {
  const data = await getData()
  
  return (
    &lt;main&gt;
      &lt;h1&gt;{data.title}&lt;/h1&gt;
      &lt;p&gt;{data.description}&lt;/p&gt;
    &lt;/main&gt;
  )
}</code></pre>

      <h4>Client Component</h4>
      <pre><code class="language-tsx">'use client'

import { useState } from 'react'

export default function Counter() {
  const [count, setCount] = useState(0)
  
  return (
    &lt;div&gt;
      &lt;p&gt;Count: {count}&lt;/p&gt;
      &lt;button onClick={() =&gt; setCount(count + 1)}&gt;
        Increment
      &lt;/button&gt;
    &lt;/div&gt;
  )
}</code></pre>

      <h3>4. Data Fetching</h3>
      <p>Next.js cung cấp nhiều cách để fetch data:</p>
      
      <h4>Server Components</h4>
      <pre><code class="language-tsx">// Fetch data trực tiếp trong Server Component
async function getPosts() {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts')
  return res.json()
}

export default async function Posts() {
  const posts = await getPosts()
  
  return (
    &lt;ul&gt;
      {posts.map((post) =&gt; (
        &lt;li key={post.id}&gt;{post.title}&lt;/li&gt;
      ))}
    &lt;/ul&gt;
  )
}</code></pre>

      <h4>API Routes</h4>
      <pre><code class="language-tsx">// app/api/posts/route.ts
import { NextResponse } from 'next/server'

export async function GET() {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts')
  const posts = await res.json()
  
  return NextResponse.json(posts)
}

export async function POST(request: Request) {
  const body = await request.json()
  
  // Process the data...
  
  return NextResponse.json({ message: 'Post created' })
}</code></pre>

      <h3>5. Styling và CSS</h3>
      <p>Next.js hỗ trợ nhiều cách styling:</p>
      
      <h4>CSS Modules</h4>
      <pre><code class="language-css">/* app/components/Button.module.css */
.button {
  padding: 12px 24px;
  border-radius: 8px;
  background: #0070f3;
  color: white;
  border: none;
  cursor: pointer;
}

.button:hover {
  background: #0051b3;
}</code></pre>

      <pre><code class="language-tsx">// app/components/Button.tsx
import styles from './Button.module.css'

export default function Button({ children }) {
  return (
    &lt;button className={styles.button}&gt;
      {children}
    &lt;/button&gt;
  )
}</code></pre>

      <h4>Tailwind CSS</h4>
      <pre><code class="language-tsx">export default function Card() {
  return (
    &lt;div className="max-w-sm rounded-lg overflow-hidden shadow-lg bg-white"&gt;
      &lt;div className="px-6 py-4"&gt;
        &lt;div className="font-bold text-xl mb-2"&gt;Card Title&lt;/div&gt;
        &lt;p className="text-gray-700 text-base"&gt;
          Card description goes here...
        &lt;/p&gt;
      &lt;/div&gt;
    &lt;/div&gt;
  )
}</code></pre>

      <h3>6. Routing và Navigation</h3>
      <p>Next.js App Router sử dụng file-system based routing:</p>
      
      <h4>Static Routes</h4>
      <pre><code class="language-tsx">// app/about/page.tsx
export default function About() {
  return (
    &lt;div&gt;
      &lt;h1&gt;About Us&lt;/h1&gt;
      &lt;p&gt;This is the about page.&lt;/p&gt;
    &lt;/div&gt;
  )
}</code></pre>

      <h4>Dynamic Routes</h4>
      <pre><code class="language-tsx">// app/blog/[slug]/page.tsx
export default function BlogPost({ params }: { params: { slug: string } }) {
  return (
    &lt;article&gt;
      &lt;h1&gt;Blog Post: {params.slug}&lt;/h1&gt;
      &lt;p&gt;This is the content for {params.slug}&lt;/p&gt;
    &lt;/article&gt;
  )
}</code></pre>

      <h4>Navigation</h4>
      <pre><code class="language-tsx">import Link from 'next/link'

export default function Navigation() {
  return (
    &lt;nav&gt;
      &lt;Link href="/"&gt;Home&lt;/Link&gt;
      &lt;Link href="/about"&gt;About&lt;/Link&gt;
      &lt;Link href="/blog"&gt;Blog&lt;/Link&gt;
    &lt;/nav&gt;
  )
}</code></pre>

      <h3>7. Performance Optimization</h3>
      <p>Next.js có nhiều tính năng tối ưu performance:</p>
      
      <h4>Image Optimization</h4>
      <pre><code class="language-tsx">import Image from 'next/image'

export default function OptimizedImage() {
  return (
    &lt;Image
      src="/hero.jpg"
      alt="Hero image"
      width={1200}
      height={600}
      priority
      className="rounded-lg"
    /&gt;
  )
}</code></pre>

      <h4>Font Optimization</h4>
      <pre><code class="language-tsx">import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    &lt;html lang="en"&gt;
      &lt;body className={inter.className}&gt;{children}&lt;/body&gt;
    &lt;/html&gt;
  )
}</code></pre>

      <h3>8. Deployment</h3>
      <p>Deploy Next.js app rất dễ dàng:</p>
      
      <h4>Vercel (Recommended)</h4>
      <pre><code class="language-bash">npm install -g vercel
vercel</code></pre>

      <h4>Build cho production</h4>
      <pre><code class="language-bash">npm run build
npm start</code></pre>

      <h3>9. Best Practices</h3>
      <ul>
        <li><strong>Sử dụng Server Components khi có thể:</strong> Giảm bundle size</li>
        <li><strong>Optimize images:</strong> Sử dụng Next.js Image component</li>
        <li><strong>Code splitting:</strong> Tự động với App Router</li>
        <li><strong>SEO optimization:</strong> Sử dụng metadata API</li>
        <li><strong>Error handling:</strong> Tạo error.tsx và loading.tsx</li>
      </ul>

      <h3>10. Kết luận</h3>
      <p>Next.js 14 là một framework mạnh mẽ cho việc xây dựng ứng dụng web hiện đại. Với App Router, Server Components, và nhiều tính năng tối ưu, Next.js giúp developers tạo ra những ứng dụng web nhanh, SEO-friendly, và dễ maintain.</p>
      
      <p>Bắt đầu với Next.js ngay hôm nay để trải nghiệm sức mạnh của React framework hiện đại nhất!</p>
    `,
    author: 'Next.js Team',
    date: '2024-01-20',
    readTime: '12 phút',
    tags: ['Next.js', 'React', 'Full-Stack', 'Web Development'],
    image: '/api/placeholder/400/250',
    featured: true
  }
];

export default function BlogPage() {
  const [selectedTag, setSelectedTag] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const allTags = ['all', ...Array.from(new Set(blogPosts.flatMap(post => post.tags)))];

  const filteredPosts = blogPosts.filter(post => {
    const matchesTag = selectedTag === 'all' || post.tags.includes(selectedTag);
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTag && matchesSearch;
  });

  const featuredPost = blogPosts.find(post => post.featured);
  const regularPosts = filteredPosts.filter(post => !post.featured);

  return (
    <div className="min-h-screen bg-background">
      {/* Header Section */}
      <div className="text-center py-16 px-4">
        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-xl">N</span>
          </div>
          <h1 className="text-xl md:text-6xl font-bold text-foreground">
            Next.js Blog
          </h1>
        </div>
        <p className="text-muted-foreground text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
          Khám phá Next.js 14 với App Router, Server Components và các tính năng mới nhất để xây dựng ứng dụng web hiện đại.
        </p>
      </div>

      {/* Search and Filter */}
      <div className="max-w-7xl mx-auto px-4 mb-8">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          {/* Search */}
          <div className="relative w-full md:w-96">
            <input
              type="text"
              placeholder="Tìm kiếm bài viết..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 pl-10 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <BookOpen className="absolute left-3 top-2.5 w-5 h-5 text-muted-foreground" />
          </div>

          {/* Tags Filter */}
          <div className="flex flex-wrap gap-2">
            {allTags.map(tag => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                  selectedTag === tag
                    ? 'bg-blue-500 text-white'
                    : 'bg-muted text-muted-foreground hover:bg-muted/80'
                }`}
              >
                {tag === 'all' ? 'Tất cả' : tag}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Featured Post */}
      {featuredPost && selectedTag === 'all' && searchQuery === '' && (
        <div className="max-w-7xl mx-auto px-4 mb-12">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <span className="bg-blue-500 text-white px-2 py-1 rounded text-sm">FEATURED</span>
            Bài viết nổi bật
          </h2>
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-8 hover:shadow-lg transition-all duration-300 cursor-pointer border border-blue-200">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="space-y-4">
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <User className="w-4 h-4" />
                    {featuredPost.author}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {new Date(featuredPost.date).toLocaleDateString('vi-VN')}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {featuredPost.readTime}
                  </span>
                </div>
                <h3 className="text-3xl font-bold text-gray-900">{featuredPost.title}</h3>
                <p className="text-gray-600 text-lg leading-relaxed">{featuredPost.excerpt}</p>
                <div className="flex items-center gap-2 mb-6">
                  {featuredPost.tags.map(tag => (
                    <span key={tag} className="px-3 py-1 bg-white rounded-full text-xs font-medium text-blue-600 border border-blue-200">
                      {tag}
                    </span>
                  ))}
                </div>
                <Link 
                  href={`/blog/${featuredPost.id}`}
                  className="inline-flex items-center gap-2 bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors font-medium"
                >
                  Đọc bài viết <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
              <div className="relative">
                <div className="aspect-video bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                  <div className="text-center text-white">
                    <Code className="w-16 h-16 mx-auto mb-4" />
                    <p className="text-lg font-semibold">Next.js 14</p>
                    <p className="text-sm opacity-90">React Framework</p>
                  </div>
                </div>
                <div className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                  NEW
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Regular Posts Grid */}
      <div className="max-w-7xl mx-auto px-4 pb-16">
        <h2 className="text-2xl font-bold mb-6">
          {selectedTag === 'all' ? 'Tất cả bài viết' : `Bài viết về ${selectedTag}`}
          {searchQuery && ` - Kết quả tìm kiếm: "${searchQuery}"`}
        </h2>
        
        {regularPosts.length === 0 ? (
          <div className="text-center py-12">
            <BookOpen className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Không tìm thấy bài viết</h3>
            <p className="text-muted-foreground">Thử thay đổi từ khóa tìm kiếm hoặc chọn tag khác</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {regularPosts.map((post) => (
              <article key={post.id} className="bg-white rounded-xl p-6 hover:shadow-lg transition-all duration-300 cursor-pointer border border-gray-200">
                <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center mb-4">
                  <BookOpen className="w-8 h-8 text-gray-400" />
                </div>
                
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                  <span className="flex items-center gap-1">
                    <User className="w-4 h-4" />
                    {post.author}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {new Date(post.date).toLocaleDateString('vi-VN')}
                  </span>
                </div>
                
                <h3 className="text-xl font-bold mb-3 line-clamp-2 text-gray-900">{post.title}</h3>
                <p className="text-muted-foreground mb-4 line-clamp-3">{post.excerpt}</p>
                
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    {post.tags.slice(0, 2).map(tag => (
                      <span key={tag} className="px-2 py-1 bg-gray-100 rounded text-xs text-gray-600">
                        {tag}
                      </span>
                    ))}
                    {post.tags.length > 2 && (
                      <span className="px-2 py-1 bg-gray-100 rounded text-xs text-gray-600">
                        +{post.tags.length - 2}
                      </span>
                    )}
                  </div>
                  <span className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    {post.readTime}
                  </span>
                </div>
                
                <Link 
                  href={`/blog/${post.id}`}
                  className="flex items-center gap-2 text-blue-500 hover:text-blue-600 transition-colors font-medium"
                >
                  Đọc thêm <ArrowRight className="w-4 h-4" />
                </Link>
              </article>
            ))}
          </div>
        )}
      </div>

      {/* Footer Section */}
      <div className="text-center py-8 px-4 border-t bg-gray-50">
        <div className="flex items-center justify-center gap-2 text-gray-500 mb-4">
          <div className="w-6 h-6 bg-black rounded flex items-center justify-center">
            <span className="text-white font-bold text-sm">N</span>
          </div>
          <span className="text-sm">Powered by Next.js</span>
        </div>
        <p className="text-gray-400 text-sm">
          Xây dựng ứng dụng web hiện đại với Next.js
        </p>
      </div>
    </div>
  );
}
