import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { formatDate } from "@/lib/utils";
import { Calendar, User, ArrowLeft } from "lucide-react";
import { supabase } from "@/lib/db";

interface BlogPageProps {
  params: Promise<{
    slug: string;
  }>;
}

async function getBlog(slug: string) {
  try {
    console.log("Fetching blog with slug:", slug);

    const { data: blog, error } = await supabase
      .from("blogs")
      .select("*")
      .eq("slug", slug)
      .eq("published", true)
      .single();

    if (error) {
      console.error("Supabase error fetching blog:", error);
      return null;
    }

    if (!blog) {
      console.log("No blog found with slug:", slug);
      return null;
    }

    console.log("Blog found:", blog.title);
    return blog;
  } catch (error) {
    console.error("Exception fetching blog:", error);
    return null;
  }
}

export async function generateMetadata({
  params,
}: BlogPageProps): Promise<Metadata> {
  const { slug } = await params;
  const blog = await getBlog(slug);

  if (!blog) {
    return {
      title: "Blog Not Found | InkPress",
    };
  }

  return {
    title: `${blog.title} | InkPress`,
    description: blog.excerpt,
    keywords: blog.tags,
    authors: [{ name: blog.author }],
    openGraph: {
      title: blog.title,
      description: blog.excerpt,
      type: "article",
      publishedTime: blog.created_at,
      authors: [blog.author],
      images: blog.cover_image ? [blog.cover_image] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: blog.title,
      description: blog.excerpt,
      images: blog.cover_image ? [blog.cover_image] : [],
    },
  };
}

export default async function BlogPage({ params }: BlogPageProps) {
  const { slug } = await params;
  const blog = await getBlog(slug);

  if (!blog) {
    notFound();
  }

  return (
    <article className="min-h-screen bg-white dark:bg-gray-950">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Back Button */}
        <Link
          href="/blogs"
          className="inline-flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors mb-8 group"
        >
          <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
          Back to Articles
        </Link>

        {/* Blog Header */}
        <header className="mb-8 space-y-6">
          {/* Tags */}
          {blog.tags && blog.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {blog.tags.map((tag: string) => (
                <span
                  key={tag}
                  className="inline-flex items-center px-3 py-1 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-900 rounded-full border border-gray-200 dark:border-gray-800"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white leading-tight">
            {blog.title}
          </h1>

          {/* Meta Information */}
          <div className="flex flex-wrap items-center gap-6 text-gray-600 dark:text-gray-400 pt-4 border-t border-gray-200 dark:border-gray-800">
            <span className="flex items-center gap-2">
              <User className="w-5 h-5" />
              <span className="font-medium">{blog.author}</span>
            </span>
            <span className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              {formatDate(blog.created_at)}
            </span>
          </div>
        </header>

        {/* Cover Image */}
        {blog.cover_image && (
          <div className="relative h-[400px] md:h-[500px] w-full rounded-2xl overflow-hidden mb-12 border border-gray-200 dark:border-gray-800">
            <img
              src={blog.cover_image}
              alt={blog.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Blog Content */}
        <div className="prose prose-lg max-w-none">
          <div dangerouslySetInnerHTML={{ __html: blog.content }} />
        </div>

        {/* Back to Blogs */}
        <div className="mt-16 pt-12 border-t border-gray-200 dark:border-gray-800">
          <Link
            href="/blogs"
            className="inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-white bg-gray-900 dark:bg-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-100 rounded-xl transition-all group"
          >
            <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
            View All Articles
          </Link>
        </div>
      </div>
    </article>
  );
}
