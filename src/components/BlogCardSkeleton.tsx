export default function BlogCardSkeleton() {
  return (
    <article className="bg-white dark:bg-gray-950 rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden animate-pulse">
      {/* Cover Image Skeleton */}
      <div className="h-56 bg-gray-200 dark:bg-gray-800"></div>

      <div className="p-6">
        {/* Tags Skeleton */}
        <div className="flex gap-2 mb-4">
          <div className="h-6 w-16 bg-gray-200 dark:bg-gray-800 rounded-full"></div>
          <div className="h-6 w-20 bg-gray-200 dark:bg-gray-800 rounded-full"></div>
        </div>

        {/* Title Skeleton */}
        <div className="space-y-2 mb-3">
          <div className="h-6 bg-gray-200 dark:bg-gray-800 rounded w-full"></div>
          <div className="h-6 bg-gray-200 dark:bg-gray-800 rounded w-3/4"></div>
        </div>

        {/* Excerpt Skeleton */}
        <div className="space-y-2 mb-6">
          <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-full"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-full"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-2/3"></div>
        </div>

        {/* Meta Skeleton */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-800">
          <div className="flex items-center gap-4">
            <div className="h-4 w-24 bg-gray-200 dark:bg-gray-800 rounded"></div>
            <div className="h-4 w-20 bg-gray-200 dark:bg-gray-800 rounded"></div>
          </div>
          <div className="h-4 w-16 bg-gray-200 dark:bg-gray-800 rounded"></div>
        </div>
      </div>
    </article>
  );
}
