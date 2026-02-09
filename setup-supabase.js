const { createClient } = require("@supabase/supabase-js");
require("dotenv").config({ path: ".env.local" });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

console.log("\n🚀 InkPress Supabase Setup\n");
console.log("Supabase URL:", supabaseUrl ? "✅ Set" : "❌ Missing");
console.log("Supabase Key:", supabaseKey ? "✅ Set" : "❌ Missing");

if (!supabaseUrl || !supabaseKey) {
  console.error("\n❌ Error: Supabase credentials not found in .env.local\n");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function setupDatabase() {
  try {
    console.log("\n📊 Checking database tables...\n");

    // Check if tables exist by trying to query them
    const { data: users, error: usersError } = await supabase
      .from("users")
      .select("count")
      .limit(1);

    const { data: blogs, error: blogsError } = await supabase
      .from("blogs")
      .select("count")
      .limit(1);

    if (usersError || blogsError) {
      console.log("❌ Tables not found! You need to create them.\n");
      console.log("📋 Follow these steps:\n");
      console.log(
        "1. Go to: https://rxvczdkmbsqmgxrontoc.supabase.co/project/rxvczdkmbsqmgxrontoc/sql/new",
      );
      console.log('2. Copy the contents of "supabase-schema.sql" file');
      console.log("3. Paste it in the SQL Editor");
      console.log('4. Click "Run" button');
      console.log("5. Come back and run this script again\n");
      process.exit(1);
    }

    console.log("✅ Tables exist!\n");

    // Check if admin exists
    const adminEmail = process.env.ADMIN_EMAIL || "admin@inkpress.com";
    const { data: existingAdmin } = await supabase
      .from("users")
      .select("email")
      .eq("email", adminEmail)
      .single();

    if (existingAdmin) {
      console.log("✅ Admin user already exists");
      console.log(`   Email: ${adminEmail}\n`);
    } else {
      console.log("⚠️  Admin user not found");
      console.log("   Run the app and visit: http://localhost:3000/api/setup");
      console.log("   Or use the Next.js app to create the admin user\n");
    }

    // Check blogs count
    const { count: blogsCount } = await supabase
      .from("blogs")
      .select("*", { count: "exact", head: true });

    console.log(`📝 Total blogs: ${blogsCount || 0}\n`);

    console.log("✨ Setup check complete!\n");
    console.log("🎯 Next steps:");
    console.log("   1. Run: npm run dev");
    console.log(
      "   2. Visit: http://localhost:3000/api/setup (to create admin)",
    );
    console.log("   3. Login at: http://localhost:3000/admin/login");
    console.log(
      `   4. Use credentials: ${adminEmail} / ${process.env.ADMIN_PASSWORD}\n`,
    );
  } catch (error) {
    console.error("❌ Error:", error.message);
    process.exit(1);
  }
}

setupDatabase();
