import { Metadata } from "next";
import BlogList from "./BlogList";
import { Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: "All Blogs | InkPress",
  description:
    "Explore all blog posts on InkPress. Discover insightful articles, tutorials, and stories.",
  openGraph: {
    title: "All Blogs | InkPress",
    description: "Explore all blog posts on InkPress.",
    type: "website",
  },
};

export const dynamic = "force-dynamic";

export default function BlogsPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-full mb-4">
            <Sparkles className="w-4 h-4 text-green-600 dark:text-green-400" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Latest Articles
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 dark:text-white px-4">
            Explore Our Stories
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto px-4">
            articles crafted by passionate writers.
          </p>
        </div>

        {/* Blog Grid */}
        <BlogList />
      </div>
    </div>
  );
}
