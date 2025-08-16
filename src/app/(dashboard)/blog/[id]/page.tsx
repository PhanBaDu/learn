'use client';

import { Calendar, Clock, User, ArrowLeft, Heart, Share2, MessageCircle, Code, Zap, Shield, Globe } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';

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

interface BlogPostPageProps {
  params: {
    id: string;
  };
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const post = blogPosts.find(p => p.id === params.id);

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Link 
          href="/blog"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Quay lại Blog
        </Link>

        <header className="mb-8">
          <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
            <span className="flex items-center gap-1">
              <User className="w-4 h-4" />
              {post.author}
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              {new Date(post.date).toLocaleDateString('vi-VN')}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {post.readTime}
            </span>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">{post.title}</h1>
          <p className="text-xl text-gray-600 mb-6">{post.excerpt}</p>

          <div className="flex items-center gap-2 mb-6">
            {post.tags.map(tag => (
              <span key={tag} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                {tag}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
              <Heart className="w-4 h-4" />
              Thích
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
              <Share2 className="w-4 h-4" />
              Chia sẻ
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
              <MessageCircle className="w-4 h-4" />
              Bình luận
            </button>
          </div>
        </header>

        <article className="prose prose-lg max-w-none">
          <div 
            className="bg-white rounded-xl p-8 mb-8 shadow-sm border border-gray-200"
            dangerouslySetInnerHTML={{ __html: `
              <style>
                .blog-content h2 {
                  font-size: 2rem;
                  font-weight: 800;
                  color: #1f2937;
                  margin-top: 2.5rem;
                  margin-bottom: 1.5rem;
                  padding-bottom: 0.5rem;
                  border-bottom: 3px solid #3b82f6;
                  display: inline-block;
                }
                
                .blog-content h3 {
                  font-size: 1.5rem;
                  font-weight: 700;
                  color: #374151;
                  margin-top: 2rem;
                  margin-bottom: 1rem;
                  padding-left: 1rem;
                  border-left: 4px solid #3b82f6;
                }
                
                .blog-content h4 {
                  font-size: 1.25rem;
                  font-weight: 600;
                  color: #4b5563;
                  margin-top: 1.5rem;
                  margin-bottom: 0.75rem;
                  background: linear-gradient(90deg, #3b82f6, #1d4ed8);
                  -webkit-background-clip: text;
                  -webkit-text-fill-color: transparent;
                  background-clip: text;
                }
                
                .blog-content p {
                  font-size: 1.1rem;
                  line-height: 1.8;
                  color: #4b5563;
                  margin-bottom: 1.25rem;
                }
                
                .blog-content ul {
                  margin: 1.5rem 0;
                  padding-left: 1.5rem;
                }
                
                .blog-content li {
                  font-size: 1.1rem;
                  line-height: 1.8;
                  color: #4b5563;
                  margin-bottom: 0.5rem;
                }
                
                .blog-content li strong {
                  color: #1f2937;
                  font-weight: 700;
                }
                
                .blog-content pre {
                  background: #1f2937;
                  color: #f3f4f6;
                  padding: 1.5rem;
                  border-radius: 0.75rem;
                  overflow-x: auto;
                  margin: 1.5rem 0;
                  border: 1px solid #374151;
                  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
                }
                
                .blog-content code {
                  background: #f3f4f6;
                  color: #dc2626;
                  padding: 0.25rem 0.5rem;
                  border-radius: 0.375rem;
                  font-family: 'Fira Code', 'Monaco', 'Consolas', monospace;
                  font-size: 0.9rem;
                  border: 1px solid #e5e7eb;
                }
                
                .blog-content pre code {
                  background: transparent;
                  color: inherit;
                  padding: 0;
                  border: none;
                  border-radius: 0;
                }
                
                .blog-content .feature-grid {
                  display: grid;
                  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
                  gap: 1.5rem;
                  margin: 2rem 0;
                }
                
                .blog-content .feature-card {
                  background: linear-gradient(135deg, #f8fafc, #e2e8f0);
                  border: 2px solid #cbd5e1;
                  border-radius: 1rem;
                  padding: 1.5rem;
                  transition: all 0.3s ease;
                }
                
                .blog-content .feature-card:hover {
                  transform: translateY(-2px);
                  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
                  border-color: #3b82f6;
                }
                
                .blog-content .feature-card h4 {
                  margin-top: 0;
                  margin-bottom: 0.75rem;
                  font-size: 1.1rem;
                  font-weight: 700;
                  color: #1e40af;
                }
                
                .blog-content .feature-card p {
                  margin: 0;
                  font-size: 0.95rem;
                  color: #475569;
                }
                
                .blog-content .code-example {
                  background: #f8fafc;
                  border: 1px solid #e2e8f0;
                  border-radius: 0.75rem;
                  padding: 1.5rem;
                  margin: 1.5rem 0;
                  border-left: 4px solid #3b82f6;
                }
                
                .blog-content .code-example h4 {
                  margin-top: 0;
                  margin-bottom: 1rem;
                  color: #1e40af;
                  font-size: 1.1rem;
                  font-weight: 600;
                }
                
                .blog-content .file-structure {
                  background: #1f2937;
                  color: #f3f4f6;
                  padding: 1.5rem;
                  border-radius: 0.75rem;
                  font-family: 'Fira Code', 'Monaco', 'Consolas', monospace;
                  font-size: 0.9rem;
                  line-height: 1.6;
                  margin: 1.5rem 0;
                  border: 1px solid #374151;
                }
                
                .blog-content .file-structure .folder {
                  color: #60a5fa;
                }
                
                .blog-content .file-structure .file {
                  color: #34d399;
                }
                
                .blog-content .file-structure .comment {
                  color: #9ca3af;
                }
                
                .blog-content .highlight-box {
                  background: linear-gradient(135deg, #dbeafe, #bfdbfe);
                  border: 2px solid #3b82f6;
                  border-radius: 1rem;
                  padding: 1.5rem;
                  margin: 1.5rem 0;
                }
                
                .blog-content .highlight-box h4 {
                  margin-top: 0;
                  color: #1e40af;
                }
                
                .blog-content .highlight-box ul {
                  margin: 1rem 0 0 0;
                }
                
                .blog-content .highlight-box li {
                  margin-bottom: 0.5rem;
                }
              </style>
              
              <div class="blog-content">
                <h2>Next.js là gì?</h2>
                <p>Next.js là một React framework cho phép bạn xây dựng ứng dụng web full-stack với các tính năng như server-side rendering (SSR), static site generation (SSG), API routes, và nhiều tính năng khác. Được phát triển bởi Vercel, Next.js đã trở thành một trong những framework phổ biến nhất cho React developers.</p>
                
                <h3>Những tính năng chính của Next.js 14</h3>
                <div class="feature-grid">
                  <div class="feature-card">
                    <h4>🚀 App Router</h4>
                    <p>File-system based routing với Server Components mặc định</p>
                  </div>
                  <div class="feature-card">
                    <h4>⚡ Server Components</h4>
                    <p>Giảm bundle size và cải thiện performance</p>
                  </div>
                  <div class="feature-card">
                    <h4>🔧 Turbopack</h4>
                    <p>Bundler nhanh hơn Webpack 700x</p>
                  </div>
                  <div class="feature-card">
                    <h4>📱 Responsive</h4>
                    <p>Tối ưu cho mọi thiết bị và màn hình</p>
                  </div>
                </div>

                <h3>1. Cài đặt và Khởi tạo dự án</h3>
                <p>Bắt đầu với Next.js rất đơn giản:</p>
                <pre><code>npx create-next-app@latest my-next-app
cd my-next-app
npm run dev</code></pre>
                
                <p>Hoặc với TypeScript:</p>
                <pre><code>npx create-next-app@latest my-next-app --typescript --tailwind --eslint</code></pre>

                <h3>2. App Router - Cách tiếp cận mới</h3>
                <p>Next.js 14 sử dụng App Router với cấu trúc thư mục mới:</p>
                <div class="file-structure">
<span class="folder">app/</span>
├── <span class="file">layout.tsx</span>          <span class="comment"># Root layout</span>
├── <span class="file">page.tsx</span>           <span class="comment"># Home page</span>
├── <span class="folder">about/</span>
│   └── <span class="file">page.tsx</span>       <span class="comment"># About page</span>
├── <span class="folder">blog/</span>
│   ├── <span class="file">layout.tsx</span>     <span class="comment"># Blog layout</span>
│   ├── <span class="file">page.tsx</span>       <span class="comment"># Blog list</span>
│   └── <span class="folder">[slug]/</span>
│       └── <span class="file">page.tsx</span>   <span class="comment"># Dynamic blog post</span>
└── <span class="folder">api/</span>
    └── <span class="folder">users/</span>
        └── <span class="file">route.ts</span>   <span class="comment"># API route</span></div>

                <h3>3. Server Components vs Client Components</h3>
                <p>Next.js 14 mặc định sử dụng Server Components:</p>
                
                <div class="code-example">
                  <h4>Server Component (mặc định)</h4>
                  <pre><code>// app/page.tsx
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
                </div>

                <div class="code-example">
                  <h4>Client Component</h4>
                  <pre><code>'use client'

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
                </div>

                <h3>4. Data Fetching</h3>
                <p>Next.js cung cấp nhiều cách để fetch data:</p>
                
                <div class="code-example">
                  <h4>Server Components</h4>
                  <pre><code>// Fetch data trực tiếp trong Server Component
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
                </div>

                <div class="code-example">
                  <h4>API Routes</h4>
                  <pre><code>// app/api/posts/route.ts
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
                </div>

                <h3>5. Styling và CSS</h3>
                <p>Next.js hỗ trợ nhiều cách styling:</p>
                
                <div class="code-example">
                  <h4>CSS Modules</h4>
                  <pre><code>/* app/components/Button.module.css */
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
                </div>

                <pre><code>// app/components/Button.tsx
import styles from './Button.module.css'

export default function Button({ children }) {
  return (
    &lt;button className={styles.button}&gt;
      {children}
    &lt;/button&gt;
  )
}</code></pre>

                <div class="code-example">
                  <h4>Tailwind CSS</h4>
                  <pre><code>export default function Card() {
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
                </div>

                <h3>6. Routing và Navigation</h3>
                <p>Next.js App Router sử dụng file-system based routing:</p>
                
                <div class="code-example">
                  <h4>Static Routes</h4>
                  <pre><code>// app/about/page.tsx
export default function About() {
  return (
    &lt;div&gt;
      &lt;h1&gt;About Us&lt;/h1&gt;
      &lt;p&gt;This is the about page.&lt;/p&gt;
    &lt;/div&gt;
  )
}</code></pre>
                </div>

                <div class="code-example">
                  <h4>Dynamic Routes</h4>
                  <pre><code>// app/blog/[slug]/page.tsx
export default function BlogPost({ params }: { params: { slug: string } }) {
  return (
    &lt;article&gt;
      &lt;h1&gt;Blog Post: {params.slug}&lt;/h1&gt;
      &lt;p&gt;This is the content for {params.slug}&lt;/p&gt;
    &lt;/article&gt;
  )
}</code></pre>
                </div>

                <div class="code-example">
                  <h4>Navigation</h4>
                  <pre><code>import Link from 'next/link'

export default function Navigation() {
  return (
    &lt;nav&gt;
      &lt;Link href="/"&gt;Home&lt;/Link&gt;
      &lt;Link href="/about"&gt;About&lt;/Link&gt;
      &lt;Link href="/blog"&gt;Blog&lt;/Link&gt;
    &lt;/nav&gt;
  )
}</code></pre>
                </div>

                <h3>7. Performance Optimization</h3>
                <p>Next.js có nhiều tính năng tối ưu performance:</p>
                
                <div class="code-example">
                  <h4>Image Optimization</h4>
                  <pre><code>import Image from 'next/image'

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
                </div>

                <div class="code-example">
                  <h4>Font Optimization</h4>
                  <pre><code>import { Inter } from 'next/font/google'

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
                </div>

                <h3>8. Deployment</h3>
                <p>Deploy Next.js app rất dễ dàng:</p>
                
                <div class="code-example">
                  <h4>Vercel (Recommended)</h4>
                  <pre><code>npm install -g vercel
vercel</code></pre>
                </div>

                <div class="code-example">
                  <h4>Build cho production</h4>
                  <pre><code>npm run build
npm start</code></pre>
                </div>

                <h3>9. Best Practices</h3>
                <div class="highlight-box">
                  <h4>Những nguyên tắc quan trọng:</h4>
                  <ul>
                    <li><strong>Sử dụng Server Components khi có thể:</strong> Giảm bundle size</li>
                    <li><strong>Optimize images:</strong> Sử dụng Next.js Image component</li>
                    <li><strong>Code splitting:</strong> Tự động với App Router</li>
                    <li><strong>SEO optimization:</strong> Sử dụng metadata API</li>
                    <li><strong>Error handling:</strong> Tạo error.tsx và loading.tsx</li>
                  </ul>
                </div>

                <h3>10. Kết luận</h3>
                <p>Next.js 14 là một framework mạnh mẽ cho việc xây dựng ứng dụng web hiện đại. Với App Router, Server Components, và nhiều tính năng tối ưu, Next.js giúp developers tạo ra những ứng dụng web nhanh, SEO-friendly, và dễ maintain.</p>
                
                <p>Bắt đầu với Next.js ngay hôm nay để trải nghiệm sức mạnh của React framework hiện đại nhất!</p>
              </div>
            ` }}
          />
        </article>

        <div className="bg-white rounded-xl p-6 mb-8 shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold mb-2 text-gray-900">Về tác giả</h3>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-lg">N</span>
            </div>
            <div>
              <p className="font-medium text-gray-900">{post.author}</p>
              <p className="text-gray-600 text-sm">Official Next.js Documentation Team</p>
            </div>
          </div>
        </div>

        {/* Next.js Features Highlight */}
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 mb-8 border border-blue-200">
          <h3 className="text-lg font-semibold mb-4 text-gray-900">Tính năng nổi bật của Next.js 14</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center gap-3">
              <Zap className="w-5 h-5 text-blue-500" />
              <span className="text-sm text-gray-700">Server Components mặc định</span>
            </div>
            <div className="flex items-center gap-3">
              <Code className="w-5 h-5 text-green-500" />
              <span className="text-sm text-gray-700">App Router mới</span>
            </div>
            <div className="flex items-center gap-3">
              <Shield className="w-5 h-5 text-purple-500" />
              <span className="text-sm text-gray-700">Turbopack bundler</span>
            </div>
            <div className="flex items-center gap-3">
              <Globe className="w-5 h-5 text-orange-500" />
              <span className="text-sm text-gray-700">SEO optimization</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
