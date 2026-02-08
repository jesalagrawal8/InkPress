import { Metadata } from "next";
import BlogList from "./BlogList";

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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            All Blog Posts
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Discover insightful articles and stories
          </p>
        </div>

        <BlogList />
      </div>
    </div>
  );
}
