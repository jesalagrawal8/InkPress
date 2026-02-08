export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-900 dark:text-white mb-4">
          404
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
          Blog post not found
        </p>
        <a
          href="/blogs"
          className="inline-block px-6 py-3 text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
        >
          Return to Blogs
        </a>
      </div>
    </div>
  );
}
