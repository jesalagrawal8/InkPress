import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import CreateBlogForm from "./CreateBlogForm";

export const metadata = {
  title: "Create Blog | InkPress",
  description: "Create a new blog post",
};

export default async function CreateBlogPage() {
  const session = await getServerSession(authOptions);

  if (!session || (session.user as any)?.role !== "admin") {
    redirect("/admin/login");
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
          Create New Blog Post
        </h1>
        <CreateBlogForm />
      </div>
    </div>
  );
}
