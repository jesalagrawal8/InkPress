const { createClient } = require("@supabase/supabase-js");
require("dotenv").config({ path: ".env.local" });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

async function testAuth() {
  console.log("\n🔍 Testing Database Connection and Auth...\n");

  // Test 1: Check if users table exists and has data
  console.log("1️⃣ Checking users table...");
  const { data: users, error: usersError } = await supabase
    .from("users")
    .select("*");

  if (usersError) {
    console.log("❌ Error querying users:", usersError.message);
    console.log(
      "   Hint: Make sure you ran the complete-setup.sql in Supabase\n",
    );
    process.exit(1);
  }

  console.log(`✅ Found ${users.length} user(s)`);
  if (users.length > 0) {
    users.forEach((user) => {
      console.log(`   - ${user.email} (${user.role})`);
    });
  }
  console.log();

  // Test 2: Try to find admin user specifically
  console.log("2️⃣ Looking for admin user...");
  const { data: admin, error: adminError } = await supabase
    .from("users")
    .select("*")
    .eq("email", "admin@inkpress.com")
    .single();

  if (adminError) {
    console.log("❌ Admin user not found!");
    console.log("   Error:", adminError.message);
    console.log("   You need to run complete-setup.sql in Supabase\n");
    process.exit(1);
  }

  console.log("✅ Admin user found!");
  console.log("   Email:", admin.email);
  console.log("   Name:", admin.name);
  console.log("   Role:", admin.role);
  console.log("   Password Hash:", admin.password.substring(0, 20) + "...");
  console.log();

  // Test 3: Test password comparison
  console.log("3️⃣ Testing password hash...");
  const bcrypt = require("bcryptjs");
  const isPasswordValid = await bcrypt.compare("admin123", admin.password);

  if (isPasswordValid) {
    console.log("✅ Password hash is correct! Login should work.\n");
  } else {
    console.log("❌ Password hash is INCORRECT!");
    console.log('   The stored hash does not match "admin123"\n');
    process.exit(1);
  }

  // Test 4: Check blogs table
  console.log("4️⃣ Checking blogs table...");
  const { data: blogs, error: blogsError } = await supabase
    .from("blogs")
    .select("count");

  if (blogsError) {
    console.log("❌ Error querying blogs:", blogsError.message);
  } else {
    console.log("✅ Blogs table exists\n");
  }

  console.log("═══════════════════════════════════════");
  console.log("✨ ALL TESTS PASSED!");
  console.log("═══════════════════════════════════════");
  console.log("Your database is configured correctly.");
  console.log("\n📝 Login credentials:");
  console.log("   Email: admin@inkpress.com");
  console.log("   Password: admin123");
  console.log("\n🚀 Go to: http://localhost:3000/admin/login");
  console.log("═══════════════════════════════════════\n");
}

testAuth().catch((err) => {
  console.error("\n❌ Unexpected error:", err.message);
  process.exit(1);
});
