import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Zap,
  Shield,
  Sparkles,
  TrendingUp,
  Users,
  Globe,
} from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-24">
          <div className="text-center space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-full">
              <Sparkles className="w-4 h-4 text-orange-500" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Modern Blog Platform
              </span>
            </div>

            {/* Main Heading */}
            <div className="space-y-6">
              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight">
                <span className="text-gray-900 dark:text-white">Write.</span>
                <br />
                <span className="text-gray-900 dark:text-white">Share.</span>
                <br />
                <span className="text-orange-500">Inspire.</span>
              </h1>
              <p className="text-lg sm:text-xl md:text-2xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed px-4">
                InkPress is where powerful ideas meet beautiful design. Create
                compelling content that resonates with your audience.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Link
                href="/blogs"
                className="group inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-gray-900 dark:bg-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-100 rounded-xl transition-all shadow-lg hover:shadow-xl hover:scale-105"
              >
                Explore Blogs
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto pt-16">
              <div>
                <div className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
                  5K+
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  Readers
                </div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
                  250+
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  Articles
                </div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
                  99%
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  Satisfaction
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Everything you need
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Powerful features to create, manage, and share your content with
              the world.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="group relative bg-white dark:bg-gray-950 p-8 rounded-2xl border border-gray-200 dark:border-gray-800 hover:border-orange-500 dark:hover:border-orange-500 transition-all hover:shadow-xl">
              <div className="w-14 h-14 bg-orange-100 dark:bg-orange-950 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <BookOpen className="w-7 h-7 text-orange-600 dark:text-orange-400" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                Rich Content Editor
              </h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Create stunning blog posts with an intuitive editor. Support for
                images, code blocks, and beautiful formatting.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="group relative bg-white dark:bg-gray-950 p-8 rounded-2xl border border-gray-200 dark:border-gray-800 hover:border-green-500 dark:hover:border-green-500 transition-all hover:shadow-xl">
              <div className="w-14 h-14 bg-green-100 dark:bg-green-950 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Zap className="w-7 h-7 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                Lightning Fast
              </h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Built on Next.js 14 for blazing-fast page loads and seamless
                navigation. Your readers will love it.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="group relative bg-white dark:bg-gray-950 p-8 rounded-2xl border border-gray-200 dark:border-gray-800 hover:border-gray-900 dark:hover:border-gray-400 transition-all hover:shadow-xl">
              <div className="w-14 h-14 bg-gray-100 dark:bg-gray-900 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Shield className="w-7 h-7 text-gray-700 dark:text-gray-300" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                Secure by Default
              </h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Enterprise-grade security with authentication and role-based
                access control. Your content is safe.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="group relative bg-white dark:bg-gray-950 p-8 rounded-2xl border border-gray-200 dark:border-gray-800 hover:border-orange-500 dark:hover:border-orange-500 transition-all hover:shadow-xl">
              <div className="w-14 h-14 bg-orange-100 dark:bg-orange-950 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <TrendingUp className="w-7 h-7 text-orange-600 dark:text-orange-400" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                SEO Optimized
              </h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Built-in SEO best practices ensure your content ranks well and
                reaches the right audience.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="group relative bg-white dark:bg-gray-950 p-8 rounded-2xl border border-gray-200 dark:border-gray-800 hover:border-green-500 dark:hover:border-green-500 transition-all hover:shadow-xl">
              <div className="w-14 h-14 bg-green-100 dark:bg-green-950 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Globe className="w-7 h-7 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                Fully Responsive
              </h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Perfect experience on any device. Mobile, tablet, or desktop -
                your blog looks amazing everywhere.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="group relative bg-white dark:bg-gray-950 p-8 rounded-2xl border border-gray-200 dark:border-gray-800 hover:border-gray-900 dark:hover:border-gray-400 transition-all hover:shadow-xl">
              <div className="w-14 h-14 bg-gray-100 dark:bg-gray-900 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Users className="w-7 h-7 text-gray-700 dark:text-gray-300" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                Easy Management
              </h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Intuitive admin dashboard makes content management effortless.
                Focus on writing, not technicalities.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden bg-gray-900 dark:bg-gray-950 rounded-3xl p-12 md:p-16 border border-gray-800">
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:24px_24px]"></div>

            <div className="relative text-center space-y-8">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white">
                Ready to start writing?
              </h2>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                Join thousands of creators who trust InkPress to share their
                stories and connect with readers worldwide.
              </p>
              <div className="flex justify-center pt-4">
                <Link
                  href="/blogs"
                  className="group inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-gray-900 bg-white hover:bg-gray-100 rounded-xl transition-all shadow-lg hover:shadow-xl hover:scale-105"
                >
                  Browse Blogs
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
