// Test script to verify blog data in Supabase
require("dotenv").config({ path: ".env.local" });
const { createClient } = require("@supabase/supabase-js");

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

console.log("Testing Supabase connection...");
console.log("URL:", supabaseUrl);

const supabase = createClient(supabaseUrl, supabaseKey);

async function testBlogFetch() {
  try {
    // Test 1: Fetch all blogs
    console.log("\n--- Test 1: Fetching all blogs ---");
    const { data: allBlogs, error: allError } = await supabase
      .from("blogs")
      .select("*");

    if (allError) {
      console.error("Error fetching all blogs:", allError);
    } else {
      console.log(`Found ${allBlogs?.length || 0} total blogs`);
      if (allBlogs && allBlogs.length > 0) {
        console.log("Blog slugs:", allBlogs.map((b) => b.slug).join(", "));
      }
    }

    // Test 2: Fetch published blogs only
    console.log("\n--- Test 2: Fetching published blogs ---");
    const { data: publishedBlogs, error: pubError } = await supabase
      .from("blogs")
      .select("*")
      .eq("published", true);

    if (pubError) {
      console.error("Error fetching published blogs:", pubError);
    } else {
      console.log(`Found ${publishedBlogs?.length || 0} published blogs`);
    }

    // Test 3: Fetch specific blog by slug
    console.log(
      '\n--- Test 3: Fetching blog by slug "getting-started-with-nextjs-14" ---',
    );
    const { data: specificBlog, error: specificError } = await supabase
      .from("blogs")
      .select("*")
      .eq("slug", "getting-started-with-nextjs-14")
      .eq("published", true)
      .single();

    if (specificError) {
      console.error("Error fetching specific blog:", specificError);
    } else if (specificBlog) {
      console.log("✅ Blog found!");
      console.log("Title:", specificBlog.title);
      console.log("Author:", specificBlog.author);
      console.log("Published:", specificBlog.published);
    } else {
      console.log("❌ Blog not found");
    }
  } catch (error) {
    console.error("Test failed:", error);
  }
}

testBlogFetch();
