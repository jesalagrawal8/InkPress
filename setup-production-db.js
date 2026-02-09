require("dotenv").config({ path: ".env.local" });
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const MONGODB_URI = process.env.MONGODB_URI;

// User Schema
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["admin", "user"], default: "user" },
  createdAt: { type: Date, default: Date.now },
});

// Blog Schema
const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  excerpt: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: String, required: true },
  imageUrl: { type: String, required: true },
  category: { type: String, required: true },
  tags: [String],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const User = mongoose.models.User || mongoose.model("User", userSchema);
const Blog = mongoose.models.Blog || mongoose.model("Blog", blogSchema);

const blogs = [
  {
    title: "Getting Started with Next.js 14",
    slug: "getting-started-nextjs-14",
    excerpt:
      "Learn the fundamentals of Next.js 14 and build modern web applications with the latest features.",
    content: `<h2>Introduction to Next.js 14</h2><p>Next.js 14 brings powerful new features...</p>`,
    author: "Admin User",
    imageUrl:
      "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800",
    category: "Web Development",
    tags: ["Next.js", "React", "JavaScript"],
  },
  {
    title: "TypeScript Best Practices in 2026",
    slug: "typescript-best-practices-2026",
    excerpt:
      "Discover the best practices for writing clean and maintainable TypeScript code.",
    content: `<h2>Why TypeScript?</h2><p>TypeScript has become the standard...</p>`,
    author: "Admin User",
    imageUrl:
      "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800",
    category: "Programming",
    tags: ["TypeScript", "JavaScript", "Best Practices"],
  },
  {
    title: "MongoDB Atlas: A Complete Guide",
    slug: "mongodb-atlas-complete-guide",
    excerpt:
      "Everything you need to know about using MongoDB Atlas for your applications.",
    content: `<h2>What is MongoDB Atlas?</h2><p>MongoDB Atlas is a cloud-based database service...</p>`,
    author: "Admin User",
    imageUrl: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=800",
    category: "Database",
    tags: ["MongoDB", "Database", "Cloud"],
  },
];

async function setupDatabase() {
  try {
    console.log("🔌 Connecting to MongoDB...");
    await mongoose.connect(MONGODB_URI);
    console.log("✅ Connected to MongoDB");

    // Check if admin user exists
    const existingAdmin = await User.findOne({ email: "admin@inkpress.com" });
    if (existingAdmin) {
      console.log("⚠️  Admin user already exists");
    } else {
      // Create admin user
      const hashedPassword = await bcrypt.hash("admin123", 10);
      const adminUser = new User({
        name: "Admin User",
        email: "admin@inkpress.com",
        password: hashedPassword,
        role: "admin",
      });
      await adminUser.save();
      console.log("✅ Admin user created: admin@inkpress.com / admin123");
    }

    // Check if blogs exist
    const existingBlogs = await Blog.countDocuments();
    if (existingBlogs > 0) {
      console.log(`⚠️  ${existingBlogs} blogs already exist`);
    } else {
      // Insert blogs
      await Blog.insertMany(blogs);
      console.log(`✅ ${blogs.length} sample blogs created`);
    }

    console.log("\n🎉 Database setup complete!");
    console.log("\n📋 Admin Credentials:");
    console.log("   Email: admin@inkpress.com");
    console.log("   Password: admin123");
  } catch (error) {
    console.error("❌ Error setting up database:", error);
  } finally {
    await mongoose.connection.close();
    console.log("\n🔌 Database connection closed");
  }
}

setupDatabase();
