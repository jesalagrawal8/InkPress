import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import Blog from "@/models/Blog";
import { generateSlug } from "@/lib/utils";

// GET all blogs or single blog by ID
export async function GET(req: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    const slug = searchParams.get("slug");
    const published = searchParams.get("published");

    if (id) {
      const blog = await Blog.findById(id);
      if (!blog) {
        return NextResponse.json({ error: "Blog not found" }, { status: 404 });
      }
      return NextResponse.json(blog);
    }

    if (slug) {
      const blog = await Blog.findOne({ slug });
      if (!blog) {
        return NextResponse.json({ error: "Blog not found" }, { status: 404 });
      }
      return NextResponse.json(blog);
    }

    // Get all blogs
    let query = {};
    if (published === "true") {
      query = { published: true };
    }

    const blogs = await Blog.find(query).sort({ createdAt: -1 });
    return NextResponse.json(blogs);
  } catch (error) {
    console.error("GET blogs error:", error);
    return NextResponse.json(
      { 
        error: "Failed to fetch blogs",
        details: error instanceof Error ? error.message : "Unknown error",
        mongoUri: process.env.MONGODB_URI ? "Set" : "Missing"
      },
      { status: 500 },
    );
  }
}

// POST new blog
export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || (session.user as any)?.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();

    const body = await req.json();
    const { title, content, excerpt, coverImage, tags } = body;

    if (!title || !content || !excerpt) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    // Generate unique slug
    let slug = generateSlug(title);
    let existingBlog = await Blog.findOne({ slug });
    let counter = 1;
    while (existingBlog) {
      slug = `${generateSlug(title)}-${counter}`;
      existingBlog = await Blog.findOne({ slug });
      counter++;
    }

    const blog = await Blog.create({
      title,
      slug,
      content,
      excerpt,
      coverImage,
      tags: tags || [],
      author: session.user?.name || "Admin",
      published: true,
    });

    return NextResponse.json(blog, { status: 201 });
  } catch (error) {
    console.error("POST blog error:", error);
    return NextResponse.json(
      { error: "Failed to create blog" },
      { status: 500 },
    );
  }
}

// PUT update blog
export async function PUT(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || (session.user as any)?.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();

    const body = await req.json();
    const { id, title, content, excerpt, coverImage, tags, published } = body;

    if (!id) {
      return NextResponse.json(
        { error: "Blog ID is required" },
        { status: 400 },
      );
    }

    const updateData: any = {
      title,
      content,
      excerpt,
      coverImage,
      tags,
      published,
    };

    // Update slug if title changed
    if (title) {
      const existingBlog = await Blog.findById(id);
      if (existingBlog && existingBlog.title !== title) {
        updateData.slug = generateSlug(title);
      }
    }

    const blog = await Blog.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!blog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    return NextResponse.json(blog);
  } catch (error) {
    console.error("PUT blog error:", error);
    return NextResponse.json(
      { error: "Failed to update blog" },
      { status: 500 },
    );
  }
}

// DELETE blog
export async function DELETE(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || (session.user as any)?.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Blog ID is required" },
        { status: 400 },
      );
    }

    const blog = await Blog.findByIdAndDelete(id);

    if (!blog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Blog deleted successfully" });
  } catch (error) {
    console.error("DELETE blog error:", error);
    return NextResponse.json(
      { error: "Failed to delete blog" },
      { status: 500 },
    );
  }
}
