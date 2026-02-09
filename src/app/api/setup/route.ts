import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import User from "@/models/User";
import Blog from "@/models/Blog";
import bcrypt from "bcryptjs";

// GET - Diagnostics endpoint
export async function GET() {
  const mongoUri = process.env.MONGODB_URI || "";
  return NextResponse.json({
    mongoUri: mongoUri ? `Set (${mongoUri.substring(0, 20)}...${mongoUri.includes("/inkpress") ? " [has db name]" : " [MISSING db name!]"})` : "NOT SET",
    nextAuthSecret: process.env.NEXTAUTH_SECRET ? "Set" : "NOT SET",
    nextAuthUrl: process.env.NEXTAUTH_URL || "NOT SET",
  });
}

export async function POST() {
  try {
    // Check if MONGODB_URI is set
    if (!process.env.MONGODB_URI) {
      return NextResponse.json(
        {
          error: "MONGODB_URI environment variable is not set",
          hint: "Please set MONGODB_URI in Vercel environment variables",
        },
        { status: 500 },
      );
    }

    await connectDB();

    let adminCreated = false;
    let blogsCreated = 0;

    // Check if admin already exists
    const existingUser = await User.findOne({ email: "admin@inkpress.com" });
    if (!existingUser) {
      // Create admin user
      const hashedPassword = await bcrypt.hash("admin123", 10);
      await User.create({
        email: "admin@inkpress.com",
        password: hashedPassword,
        name: "Admin",
        role: "admin",
      });
      adminCreated = true;
    }

    // Check if blogs already exist
    const existingBlogs = await Blog.countDocuments();
    if (existingBlogs === 0) {
      // Create sample blogs
      const sampleBlogs = [
        {
          title: "Getting Started with Next.js 14",
          slug: "getting-started-with-nextjs-14",
          content: `<h2>Introduction to Next.js 14</h2><p>Next.js 14 introduces powerful new features that make building modern web applications easier than ever.</p>`,
          excerpt:
            "Learn about the exciting new features in Next.js 14 and how they can improve your web development workflow.",
          coverImage:
            "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800",
          author: "Admin",
          tags: ["nextjs", "react", "webdev", "tutorial"],
          published: true,
        },
        {
          title: "Mastering TypeScript for Modern Applications",
          slug: "mastering-typescript-for-modern-applications",
          content: `<h2>Why TypeScript?</h2><p>TypeScript has become the de facto standard for building large-scale JavaScript applications.</p>`,
          excerpt:
            "Discover the power of TypeScript and learn best practices for building type-safe applications.",
          coverImage:
            "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800",
          author: "Admin",
          tags: ["typescript", "javascript", "programming", "best-practices"],
          published: true,
        },
        {
          title: "Building Scalable APIs with MongoDB",
          slug: "building-scalable-apis-with-mongodb",
          content: `<h2>MongoDB for Modern Applications</h2><p>MongoDB is a powerful NoSQL database that excels at handling unstructured data.</p>`,
          excerpt:
            "Learn how to design efficient MongoDB schemas and build scalable APIs for your applications.",
          coverImage:
            "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=800",
          author: "Admin",
          tags: ["mongodb", "database", "api", "backend"],
          published: true,
        },
      ];

      await Blog.insertMany(sampleBlogs);
      blogsCreated = sampleBlogs.length;
    }

    return NextResponse.json(
      {
        message: "Database initialized successfully!",
        adminCreated,
        blogsCreated,
        credentials: adminCreated
          ? { email: "admin@inkpress.com", password: "admin123" }
          : "Admin already existed",
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Setup error:", error);
    return NextResponse.json(
      {
        error: "Failed to initialize database",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}
