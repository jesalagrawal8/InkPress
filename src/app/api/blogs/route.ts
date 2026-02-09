import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { supabase } from "@/lib/db";
import { generateSlug } from "@/lib/utils";

// GET all blogs or single blog by ID/slug
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    const slug = searchParams.get("slug");
    const published = searchParams.get("published");

    if (id) {
      const { data: blog, error } = await supabase
        .from("blogs")
        .select("*")
        .eq("id", id)
        .single();

      if (error || !blog) {
        return NextResponse.json({ error: "Blog not found" }, { status: 404 });
      }
      return NextResponse.json(blog);
    }

    if (slug) {
      const { data: blog, error } = await supabase
        .from("blogs")
        .select("*")
        .eq("slug", slug)
        .single();

      if (error || !blog) {
        return NextResponse.json({ error: "Blog not found" }, { status: 404 });
      }
      return NextResponse.json(blog);
    }

    // Get all blogs
    let query = supabase
      .from("blogs")
      .select("*")
      .order("created_at", { ascending: false });

    if (published === "true") {
      query = query.eq("published", true);
    }

    const { data: blogs, error } = await query;

    if (error) {
      throw error;
    }

    return NextResponse.json(blogs || []);
  } catch (error) {
    console.error("GET blogs error:", error);
    return NextResponse.json(
      {
        error: "Failed to fetch blogs",
        details: error instanceof Error ? error.message : "Unknown error",
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
    let { data: existingBlog } = await supabase
      .from("blogs")
      .select("id")
      .eq("slug", slug)
      .single();

    let counter = 1;
    while (existingBlog) {
      slug = `${generateSlug(title)}-${counter}`;
      const result = await supabase
        .from("blogs")
        .select("id")
        .eq("slug", slug)
        .single();
      existingBlog = result.data;
      counter++;
    }

    const { data: blog, error } = await supabase
      .from("blogs")
      .insert([
        {
          title,
          slug,
          content,
          excerpt,
          cover_image: coverImage,
          tags: tags || [],
          author: session.user?.name || "Admin",
          published: true,
        },
      ])
      .select()
      .single();

    if (error) {
      throw error;
    }

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
      cover_image: coverImage,
      tags,
      published,
      updated_at: new Date().toISOString(),
    };

    // Update slug if title changed
    if (title) {
      const { data: existingBlog } = await supabase
        .from("blogs")
        .select("title")
        .eq("id", id)
        .single();

      if (existingBlog && existingBlog.title !== title) {
        updateData.slug = generateSlug(title);
      }
    }

    const { data: blog, error } = await supabase
      .from("blogs")
      .update(updateData)
      .eq("id", id)
      .select()
      .single();

    if (error || !blog) {
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

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Blog ID is required" },
        { status: 400 },
      );
    }

    const { error } = await supabase.from("blogs").delete().eq("id", id);

    if (error) {
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
