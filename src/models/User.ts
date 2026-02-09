export interface User {
  id: string;
  email: string;
  password: string;
  name: string;
  role: "admin" | "user";
  created_at: string;
}
