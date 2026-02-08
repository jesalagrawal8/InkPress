# InkPress - Modern Blog Platform

A full-stack blog platform built with Next.js 14, TypeScript, MongoDB, and NextAuth.js. Features a modern, responsive UI with dark mode support, SEO optimization, and a protected admin panel for content management.

![InkPress](https://via.placeholder.com/800x400/3B82F6/FFFFFF?text=InkPress+Blog+Platform)

## 🚀 Live Demo

**Live URL:** [Your Vercel URL here after deployment]

**Demo Credentials:**

- Email: `admin@inkpress.com`
- Password: `admin123`

## ✨ Features

### Core Features

- ✅ **Modern Landing Page** - Polished UI with hero section and feature highlights
- ✅ **Blog Listing Page** - Clean card-based grid layout displaying all blogs
- ✅ **Blog Detail Page** - Full blog content with SEO-friendly URLs
- ✅ **Admin Authentication** - Secure login/logout with NextAuth.js
- ✅ **Protected Admin Panel** - Create, Edit, Delete blogs with authorization
- ✅ **SEO Optimized** - Meta tags, Open Graph, clean slugs
- ✅ **MongoDB Database** - Efficient data storage and retrieval
- ✅ **Fully Responsive** - Works seamlessly on mobile and desktop

### Extra Feature (Dark/Light Mode)

- 🌓 **Theme Toggle** - Switch between dark and light modes
- 💾 **Persistent Theme** - Theme preference saved across sessions
- 🎨 **Smooth Transitions** - Beautiful theme switching animations

### Additional Features

- 🔐 Password hashing with bcryptjs
- 🎯 TypeScript for type safety
- 🎨 Tailwind CSS for styling
- 📱 Mobile-first responsive design
- ♿ Accessibility features (ARIA labels, semantic HTML)
- ⚡ Optimized performance with Next.js App Router
- 🔄 Loading states and error handling
- 📝 Rich text support (HTML in blog content)
- 🏷️ Tag system for blog categorization

## 🛠️ Tech Stack

### Frontend

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe code
- **Tailwind CSS** - Utility-first CSS framework
- **next-themes** - Dark mode implementation
- **lucide-react** - Beautiful icons
- **react-hot-toast** - Toast notifications

### Backend & Database

- **Next.js API Routes** - Server-side API endpoints
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB ODM
- **NextAuth.js** - Authentication solution

### Development Tools

- **ESLint** - Code linting
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixing

## 📁 Folder Structure

```
InkPress/
├── src/
│   ├── app/                      # Next.js App Router
│   │   ├── layout.tsx           # Root layout with providers
│   │   ├── page.tsx             # Landing page
│   │   ├── globals.css          # Global styles
│   │   ├── blogs/               # Blog pages
│   │   │   ├── page.tsx         # Blog listing page
│   │   │   ├── BlogList.tsx     # Client component for blogs
│   │   │   └── [slug]/          # Dynamic blog detail
│   │   │       ├── page.tsx     # Blog detail page
│   │   │       └── not-found.tsx
│   │   ├── admin/               # Admin panel
│   │   │   ├── page.tsx         # Admin dashboard
│   │   │   ├── AdminDashboard.tsx
│   │   │   ├── login/           # Admin login
│   │   │   │   └── page.tsx
│   │   │   ├── create/          # Create blog
│   │   │   │   ├── page.tsx
│   │   │   │   └── CreateBlogForm.tsx
│   │   │   └── edit/[id]/       # Edit blog
│   │   │       ├── page.tsx
│   │   │       └── EditBlogForm.tsx
│   │   └── api/                 # API routes
│   │       ├── auth/
│   │       │   ├── [...nextauth]/
│   │       │   │   └── route.ts  # NextAuth configuration
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
