# InkPress - Modern Blog Platform

A modern, lightweight blog platform built with Next.js 14, TypeScript, and Supabase.

## 🚀 Features

- ✨ Modern, responsive design with dark mode support
- 📝 Admin dashboard for creating and managing blog posts
- 🔒 Secure authentication with NextAuth.js
- 🎨 Rich text content support with HTML rendering
- 🏷️ Tag-based blog organization
- 🌐 SEO optimized with clean URLs
- ⚡ Fast and lightweight
- 📱 Mobile responsive design

## 🛠️ Tech Stack

- **Framework:** Next.js 14 with App Router
- **Language:** TypeScript
- **Database:** Supabase (PostgreSQL)
- **Authentication:** NextAuth.js
- **Styling:** Tailwind CSS
- **Icons:** Lucide React
- **Notifications:** React Hot Toast

## 📦 Installation & Setup

### 1. Clone and Install Dependencies

```bash
git clone https://github.com/jesalagrawal8/InkPress.git
cd InkPress
npm install
```

### 2. Configure Environment Variables

Create a `.env.local` file in the root directory:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# NextAuth Configuration
NEXTAUTH_SECRET=generate_random_secret_here
NEXTAUTH_URL=http://localhost:3000

# Admin Credentials
ADMIN_EMAIL=admin@inkpress.com
ADMIN_PASSWORD=your_secure_password
```

**Generate NEXTAUTH_SECRET:**
```bash
openssl rand -base64 32
```

### 3. Setup Supabase Database

1. Create a new project at [supabase.com](https://supabase.com)
2. Go to SQL Editor in your Supabase dashboard
3. Run the SQL from `complete-setup.sql` file to create tables and admin user
4. Optionally, run `add-sample-blogs.sql` to add 5 sample blog posts

### 4. Get Supabase Credentials

In your Supabase project:
1. Go to **Settings** → **API**
2. Copy the **Project URL** → Add to `NEXT_PUBLIC_SUPABASE_URL`
3. Copy the **anon public** key → Add to `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### 5. Start Development Server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

### 6. Login to Admin Panel

Go to [http://localhost:3000/admin/login](http://localhost:3000/admin/login)

- **Email:** admin@inkpress.com
- **Password:** (whatever you set in .env.local)

## 📁 Project Structure

```
InkPress/
├── src/
│   ├── app/
│   │   ├── admin/          # Admin dashboard pages
│   │   │   ├── page.tsx    # Dashboard
│   │   │   ├── login/      # Login page
│   │   │   ├── create/     # Create blog
│   │   │   └── edit/[id]/  # Edit blog
│   │   ├── api/            # API routes
│   │   │   ├── auth/       # Authentication
│   │   │   ├── blogs/      # Blog CRUD operations
│   │   │   └── setup/      # Setup endpoint (disabled)
│   │   ├── blogs/          # Public blog pages
│   │   │   ├── page.tsx    # Blog listing
│   │   │   └── [slug]/     # Blog detail
│   │   ├── layout.tsx      # Root layout
│   │   └── page.tsx        # Homepage
│   ├── components/         # Reusable components
│   │   ├── BlogCard.tsx
│   │   ├── Footer.tsx
│   │   ├── Navbar.tsx
│   │   ├── ThemeProvider.tsx
│   │   └── ThemeToggle.tsx
│   ├── lib/                # Utilities and configurations
│   │   ├── auth.ts         # NextAuth config
│   │   ├── db.ts           # Supabase client
│   │   └── utils.ts        # Helper functions
│   ├── models/             # TypeScript interfaces
│   │   ├── Blog.ts
│   │   └── User.ts
│   └── types/              # Type definitions
├── complete-setup.sql      # Database initialization script
├── add-sample-blogs.sql    # Sample blog data (5 posts)
└── .env.local              # Environment variables (create this)
```

## 🚢 Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Import project to [Vercel](https://vercel.com)
3. Add environment variables in Vercel dashboard:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `NEXTAUTH_SECRET`
   - `NEXTAUTH_URL` (set to your production domain)
   - `ADMIN_EMAIL`
   - `ADMIN_PASSWORD`
4. Deploy!

**Important:** Update `NEXTAUTH_URL` to your production domain:
```env
NEXTAUTH_URL=https://yourdomain.vercel.app
```

### Deploy to Other Platforms

InkPress can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- Render
- Self-hosted with PM2

## 📝 Creating Blog Posts

1. Login to admin panel at `/admin/login`
2. Click "Create New Blog"
3. Fill in:
   - **Title:** Your blog title
   - **Content:** HTML content (supports all HTML tags)
   - **Excerpt:** Short description (max 200 chars)
   - **Cover Image:** Image URL (optional)
   - **Tags:** Comma-separated tags
4. Click "Create Blog"
5. Your blog post is now live!

## 🔄 Database Schema

### Users Table
```sql
- id (UUID, primary key)
- email (unique)
- password (bcrypt hashed)
- name
- role (admin/user)
- created_at
```

### Blogs Table
```sql
- id (UUID, primary key)
- title
- slug (unique, URL-friendly)
- content (HTML)
- excerpt (max 200 chars)
- cover_image (URL)
- author
- tags (array)
- published (boolean)
- created_at
- updated_at
```

## 🔐 Security Features

- ✅ Passwords hashed with bcrypt
- ✅ Protected API routes with authentication
- ✅ Environment variables for sensitive data
- ✅ SQL injection prevention with Supabase
- ✅ XSS protection with React
- ✅ CSRF tokens with NextAuth.js

## 🎯 Quick Commands

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm start        # Start production server
npm run lint     # Run ESLint
```

## 📚 Sample Data

The project includes `add-sample-blogs.sql` with 5 sample blog posts:
1. Getting Started with Next.js 14
2. Mastering TypeScript for Modern Applications
3. Building Scalable APIs with Supabase
4. The Future of Web Development in 2026
5. React Server Components Deep Dive

Run this SQL in Supabase SQL Editor to add sample data.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

MIT License - feel free to use this project for personal or commercial purposes.

## 🆘 Troubleshooting

### Login Issues
- Verify Supabase credentials are correct
- Check that `complete-setup.sql` was run successfully
- Ensure admin user exists in users table

### Build Errors
- Clear `.next` folder: `rm -rf .next`
- Reinstall dependencies: `npm install`
- Check all environment variables are set

### Database Connection
- Verify `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- Check Supabase project is active
- Ensure tables were created from `complete-setup.sql`

## 🙏 Acknowledgments

Built with ❤️ using:
- [Next.js](https://nextjs.org/)
- [Supabase](https://supabase.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [NextAuth.js](https://next-auth.js.org/)

---

**Live Demo:** https://ink-press-iota.vercel.app

**Admin Login:** Email: `admin@inkpress.com` | Password: `admin123`
│   │       │   └── register/
│   │       │       └── route.ts  # User registration
│   │       └── blogs/
│   │           └── route.ts      # Blog CRUD operations
│   ├── components/              # Reusable components
│   │   ├── BlogCard.tsx         # Blog card component
│   │   ├── Footer.tsx           # Footer component
│   │   ├── LoadingSpinner.tsx   # Loading indicator
│   │   ├── Navbar.tsx           # Navigation bar
│   │   ├── SessionProvider.tsx  # NextAuth session provider
│   │   ├── ThemeProvider.tsx    # Theme context provider
│   │   └── ThemeToggle.tsx      # Dark/Light mode toggle
│   ├── lib/                     # Utility functions
│   │   ├── db.ts                # MongoDB connection
│   │   └── utils.ts             # Helper functions
│   ├── models/                  # Mongoose models
│   │   ├── Blog.ts              # Blog schema
│   │   └── User.ts              # User schema
│   └── types/                   # TypeScript types
│       └── index.ts             # Type definitions
├── scripts/
│   └── seed.js                 # Database seeding script
├── public/                      # Static assets
├── .env.example                # Environment variables template
├── .gitignore                  # Git ignore file
├── vercel.json                 # Vercel deployment configuration
├── next.config.js              # Next.js configuration
├── package.json                # Dependencies
├── postcss.config.js           # PostCSS configuration
├── tailwind.config.ts          # Tailwind CSS configuration
├── tsconfig.json               # TypeScript configuration
├── DEPLOYMENT.md               # Detailed deployment guide
└── README.md                   # This file
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed
- MongoDB installed locally or MongoDB Atlas account
- Git installed

### Installation

1. **Clone the repository**

   ```bash
   git clone <your-repo-url>
   cd InkPress
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   Create a `.env.local` file in the root directory:

   ```env
   # MongoDB Connection
   MONGODB_URI=mongodb://localhost:27017/inkpress
   # OR for MongoDB Atlas:
   # MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/inkpress

   # NextAuth Configuration
   NEXTAUTH_SECRET=your-super-secret-key-change-this-in-production
   NEXTAUTH_URL=http://localhost:3000

   # Admin Credentials (Initial Setup)
   ADMIN_EMAIL=admin@inkpress.com
   ADMIN_PASSWORD=admin123
   ```

   **Generate NEXTAUTH_SECRET:**

   ```bash
   openssl rand -base64 32
   ```

4. **Set up MongoDB**

   **Option A: Local MongoDB**

   ```bash
   # Install MongoDB from https://www.mongodb.com/try/download/community
   # Start MongoDB service
   mongod
   ```

   **Option B: MongoDB Atlas (Cloud)**
   - Create account at https://www.mongodb.com/cloud/atlas
   - Create a free cluster
   - Get connection string and update MONGODB_URI

5. **Create admin user**

   ```bash
   npm run seed
   ```

6. **Run the development server**

   ```bash
   npm run dev
   ```

7. **Open your browser**

   Navigate to `http://localhost:3000`

## 📝 Usage Guide

### For Visitors

1. Visit the homepage to see the landing page
2. Click "Explore Blogs" to view all blog posts
3. Click on any blog card to read the full article
4. Use the theme toggle (sun/moon icon) to switch between light and dark modes

### For Admins

1. Navigate to `/admin/login` or click "Admin Panel" on homepage
2. Log in with admin credentials
3. **Dashboard**: View all blog posts in a table
4. **Create Blog**: Click "New Blog" button
   - Fill in title, excerpt, content (HTML supported)
   - Add cover image URL (optional)
   - Add tags separated by commas
5. **Edit Blog**: Click edit icon on any blog
   - Modify any field
   - Toggle published status
6. **Delete Blog**: Click delete icon and confirm
7. **Logout**: Click logout icon in navbar

## 🎨 Design Decisions

### Why Next.js 14?

- **App Router**: Better SEO with server components
- **API Routes**: Built-in backend without separate server
- **Image Optimization**: Automatic image optimization
- **Performance**: Excellent out-of-the-box performance

### Why MongoDB?

- **Flexible Schema**: Easy to modify blog structure
- **Fast Development**: Quick setup and iteration
- **Scalable**: Handles growth efficiently
- **JSON-like**: Natural fit with JavaScript/TypeScript

### Why NextAuth.js?

- **Industry Standard**: Battle-tested authentication
- **Secure**: Built-in CSRF protection and session management
- **Flexible**: Easy to add OAuth providers later

### Why Dark Mode?

- **User Experience**: Reduces eye strain in low light
- **Modern Standard**: Expected feature in 2024+
- **Accessibility**: Better for users with light sensitivity

## 🚢 Deployment

For detailed deployment instructions, see [DEPLOYMENT.md](DEPLOYMENT.md).

### Quick Deploy to Vercel

1. **Push to GitHub**

   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin <your-repo-url>
   git push -u origin main
   ```

2. **Deploy on Vercel**
   - Go to https://vercel.com
   - Click "Add New" → "Project"
   - Import your GitHub repository
   - Add environment variables (see `.env.example`):
     - `MONGODB_URI` - Your MongoDB Atlas connection string
     - `NEXTAUTH_SECRET` - Generate with `openssl rand -base64 32`
     - `NEXTAUTH_URL` - Your production URL (e.g., `https://your-app.vercel.app`)
   - Click "Deploy"

3. **Post-Deployment**
   - Set up MongoDB Atlas (change network access to 0.0.0.0/0)
   - Create admin user manually in MongoDB or via setup endpoint
   - Test your live site!

📚 **For complete deployment guide including MongoDB setup, admin user creation, and troubleshooting, see [DEPLOYMENT.md](DEPLOYMENT.md)**

## 🧪 Testing

### Manual Testing Checklist

- [ ] Landing page loads correctly
- [ ] Blog listing displays all blogs
- [ ] Blog detail page shows full content
- [ ] SEO meta tags present in page source
- [ ] Dark/Light mode toggle works
- [ ] Theme persists on page reload
- [ ] Admin login with correct credentials
- [ ] Admin login fails with wrong credentials
- [ ] Create new blog post
- [ ] Edit existing blog post
- [ ] Delete blog post with confirmation
- [ ] Protected routes redirect to login
- [ ] Responsive design on mobile
- [ ] All links work correctly

## 📊 Performance Optimizations

- Server-side rendering for better SEO
- Image optimization with Next.js Image
- Code splitting with dynamic imports
- Efficient MongoDB queries with indexes
- Tailwind CSS purging for smaller bundles
- Font optimization with next/font

## ♿ Accessibility Features

- Semantic HTML elements
- ARIA labels on interactive elements
- Keyboard navigation support
- Alt text for images
- Sufficient color contrast
- Focus visible states

## 🔒 Security Features

- Password hashing with bcryptjs
- CSRF protection via NextAuth
- HTTP-only cookies for sessions
- Protected API routes with authentication
- Input validation on forms
- XSS prevention with React's escaping

## 🐛 Known Issues & Limitations

- Rich text editor not included (HTML input required)
- No image upload (URL-based only)
- No search functionality (bonus feature not implemented)
- No pagination (bonus feature not implemented)
- Single admin role (no multi-user support)

## 🔮 Future Enhancements

- [ ] Rich text WYSIWYG editor (TinyMCE/Quill)
- [ ] Image upload to cloud storage
- [ ] Search functionality
- [ ] Pagination for blog listing
- [ ] Comments system
- [ ] Social sharing buttons
- [ ] Analytics dashboard
- [ ] Email notifications
- [ ] Multi-author support
- [ ] Blog categories

## 📄 License

This project is open source and available under the MIT License.

## 👨‍💻 Author

Built with ❤️ for the InkPress Blog Platform project.

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Vercel for hosting platform
- MongoDB for database solution
- Tailwind CSS for styling utilities

---

**Note**: Remember to replace placeholder values (repo URL, live demo URL, etc.) with actual values after deployment.
