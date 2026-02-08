import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import EditBlogForm from "./EditBlogForm";

export const metadata = {
  title: "Edit Blog | InkPress",
  description: "Edit blog post",
};

interface EditBlogPageProps {
  params: {
    id: string;
  };
}

export default async function EditBlogPage({ params }: EditBlogPageProps) {
  const session = await getServerSession(authOptions);

  if (!session || (session.user as any)?.role !== "admin") {
    redirect("/admin/login");
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
          Edit Blog Post
        </h1>
        <EditBlogForm blogId={params.id} />
      </div>
    </div>
  );
}
