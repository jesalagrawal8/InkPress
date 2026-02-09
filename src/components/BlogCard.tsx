import Link from "next/link";
import { formatDate } from "@/lib/utils";
import { BlogPost } from "@/types";
import { Calendar, User, Tag } from "lucide-react";

interface BlogCardProps {
  blog: BlogPost;
}

export default function BlogCard({ blog }: BlogCardProps) {
  return (
    <article className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-xl transition-shadow overflow-hidden group">
      {/* Cover Image */}
      {blog.cover_image && (
        <Link href={`/blogs/${blog.slug}`}>
          <div className="relative h-48 overflow-hidden">
            <img
              src={blog.cover_image}
              alt={blog.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        </Link>
      )}

      <div className="p-6">
        {/* Tags */}
        {blog.tags && blog.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-3">
            {blog.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center px-2 py-1 text-xs font-medium text-blue-700 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/30 rounded"
              >
                <Tag className="w-3 h-3 mr-1" />
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Title */}
        <Link href={`/blogs/${blog.slug}`}>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors line-clamp-2">
            {blog.title}
          </h2>
        </Link>

        {/* Excerpt */}
        <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
          {blog.excerpt}
        </p>

        {/* Meta */}
        <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-500">
          <div className="flex items-center space-x-4">
            <span className="flex items-center">
              <User className="w-4 h-4 mr-1" />
              {blog.author}
            </span>
            <span className="flex items-center">
              <Calendar className="w-4 h-4 mr-1" />
              {formatDate(blog.created_at)}
            </span>
          </div>
        </div>

        {/* Read More */}
        <Link
          href={`/blogs/${blog.slug}`}
          className="inline-block mt-4 text-blue-600 dark:text-blue-400 hover:underline font-medium"
        >
          Read More →
        </Link>
      </div>
    </article>
  );
}
