export interface Blog {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  cover_image?: string;
  author: string;
  tags: string[];
  published: boolean;
  created_at: string;
  updated_at: string;
}
