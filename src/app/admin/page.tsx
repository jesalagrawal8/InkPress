import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import AdminDashboard from "./AdminDashboard";

export const metadata = {
  title: "Admin Dashboard | InkPress",
  description: "Manage your blog posts",
};

export default async function AdminPage() {
  const session = await getServerSession(authOptions);

  if (!session || (session.user as any)?.role !== "admin") {
    redirect("/admin/login");
  }

  return <AdminDashboard />;
}
