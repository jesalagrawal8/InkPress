-- Add Sample Blogs to InkPress Database
-- Run this in Supabase SQL Editor AFTER running complete-setup.sql

INSERT INTO blogs (title, slug, content, excerpt, cover_image, author, tags, published)
VALUES 
  (
    'Getting Started with Next.js 14',
    'getting-started-with-nextjs-14',
    '<h2>Introduction to Next.js 14</h2><p>Next.js 14 introduces powerful new features that make building modern web applications easier than ever. In this comprehensive guide, we''ll explore the key features and improvements that make Next.js 14 a game-changer for developers.</p><h3>App Router Revolution</h3><p>The App Router is a fundamental shift in how we build React applications. It provides better performance, improved developer experience, and built-in support for server components that reduce JavaScript bundle sizes significantly.</p><h3>Server Components</h3><p>Server Components allow you to render components on the server, reducing the JavaScript bundle size sent to the client and improving initial page load times. This is especially beneficial for content-heavy websites and applications.</p><h3>Getting Started</h3><p>To create a new Next.js 14 project, simply run:</p><pre><code>npx create-next-app@latest</code></pre><p>Follow the prompts to set up your project with TypeScript, ESLint, and Tailwind CSS. Next.js 14 is production-ready and used by thousands of companies worldwide including Netflix, Twitch, and Nike.</p>',
    'Learn about the exciting new features in Next.js 14 and how they can improve your web development workflow.',
    'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800',
    'Admin',
    ARRAY['nextjs', 'react', 'webdev', 'tutorial'],
    true
  ),
  (
    'Mastering TypeScript for Modern Applications',
    'mastering-typescript-for-modern-applications',
    '<h2>Why TypeScript?</h2><p>TypeScript has become the de facto standard for building large-scale JavaScript applications. It provides type safety, better tooling, and an improved developer experience that makes your code more maintainable and less prone to bugs.</p><h3>Key Benefits</h3><ul><li><strong>Static type checking</strong> catches errors before runtime, saving hours of debugging</li><li><strong>Enhanced IDE support</strong> with intelligent autocomplete and refactoring tools</li><li><strong>Better code documentation</strong> through explicit type definitions</li><li><strong>Seamless integration</strong> with modern frameworks like React, Vue, and Angular</li></ul><h3>Best Practices</h3><p>Always define proper types for your functions and components. Avoid using the ''any'' type unless absolutely necessary. Leverage TypeScript''s powerful utility types like Partial, Pick, Omit, and Record to write more expressive code.</p><h3>Advanced Features</h3><p>Explore advanced TypeScript features like generics, conditional types, and mapped types to create flexible and reusable code patterns. Use discriminated unions for better type narrowing and exhaustive checking.</p>',
    'Discover the power of TypeScript and learn best practices for building type-safe applications.',
    'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800',
    'Admin',
    ARRAY['typescript', 'javascript', 'programming', 'best-practices'],
    true
  ),
  (
    'Building Scalable APIs with Supabase',
    'building-scalable-apis-with-supabase',
    '<h2>Introduction to Supabase</h2><p>Supabase is an open-source Firebase alternative that provides all the backend services you need to build a product. Built on top of PostgreSQL, it offers real-time subscriptions, authentication, file storage, and edge functions.</p><h3>Why Choose Supabase?</h3><ul><li><strong>Open Source</strong> - Full visibility into the codebase and no vendor lock-in</li><li><strong>PostgreSQL Power</strong> - Leverage the full power of a relational database</li><li><strong>Real-time Subscriptions</strong> - Listen to database changes in real-time</li><li><strong>Row Level Security</strong> - Built-in security at the database level</li></ul><h3>Getting Started</h3><p>Setting up Supabase is incredibly simple. Create a project, get your API keys, and start building. The JavaScript client library makes it easy to interact with your database, handle authentication, and manage file uploads.</p><h3>Best Practices</h3><p>Always use Row Level Security (RLS) policies to protect your data. Design your database schema carefully with proper indexes and constraints. Use Supabase Edge Functions for server-side logic that requires secrets or complex processing.</p>',
    'Learn how to design efficient database schemas and build scalable APIs with Supabase.',
    'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=800',
    'Admin',
    ARRAY['supabase', 'database', 'api', 'backend'],
    true
  ),
  (
    'The Future of Web Development in 2026',
    'future-of-web-development-2026',
    '<h2>Trends Shaping Web Development</h2><p>As we navigate through 2026, several key trends are fundamentally changing how we build web applications. From AI-powered development tools to edge computing, the landscape is evolving rapidly.</p><h3>AI-Assisted Development</h3><p>AI coding assistants like GitHub Copilot have become an integral part of the development workflow, helping developers write better code faster. These tools understand context and can generate entire functions, write tests, and even debug complex issues.</p><h3>Edge Computing</h3><p>Edge computing is bringing computation closer to users, resulting in faster load times and better user experiences. Platforms like Cloudflare Workers and Vercel Edge Functions allow developers to run code at the edge, near their users.</p><h3>Web Assembly</h3><p>WebAssembly (WASM) is enabling high-performance applications in the browser. Languages like Rust and Go can now be compiled to WASM, allowing developers to build computationally intensive applications that run at near-native speeds.</p>',
    'Explore the latest trends and technologies shaping the future of web development.',
    'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800',
    'Admin',
    ARRAY['webdev', 'future', 'trends', 'technology'],
    true
  ),
  (
    'React Server Components Deep Dive',
    'react-server-components-deep-dive',
    '<h2>Understanding Server Components</h2><p>React Server Components represent a paradigm shift in how we think about React applications. They allow us to render components on the server, reducing the JavaScript bundle size and improving performance.</p><h3>How They Work</h3><p>Server Components run exclusively on the server and don''t send JavaScript to the client. They can directly access backend resources like databases and file systems, making data fetching simpler and more secure.</p><h3>Benefits</h3><ul><li>Smaller client bundle sizes</li><li>Direct backend access</li><li>Automatic code splitting</li><li>Improved initial page load</li><li>Better SEO performance</li></ul><h3>Best Practices</h3><p>Keep Server Components pure and avoid side effects. Use Client Components for interactive features that require state, effects, or browser APIs. Compose them together to build efficient applications.</p>',
    'A comprehensive guide to React Server Components and how to use them effectively.',
    'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800',
    'Admin',
    ARRAY['react', 'server-components', 'nextjs', 'advanced'],
    true
  );

-- Verify blogs were inserted
SELECT COUNT(*) as total_blogs FROM blogs;
SELECT title, slug, published FROM blogs;
