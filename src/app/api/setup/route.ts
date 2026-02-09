import { NextResponse } from "next/server";

// This endpoint has been disabled for production
// Use complete-setup.sql in Supabase SQL Editor to initialize database

export async function GET() {
  return NextResponse.json(
    {
      message: "Setup endpoint disabled",
      hint: "Run complete-setup.sql in your Supabase SQL Editor",
    },
    { status: 404 },
  );
}

export async function POST() {
  return NextResponse.json(
    {
      message: "Setup endpoint disabled",
      hint: "Run complete-setup.sql in your Supabase SQL Editor",
    },
    { status: 404 },
  );
}

// GET - Diagnostics endpoint
export async function GET() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
  return NextResponse.json({
    supabaseUrl: supabaseUrl ? "Set" : "NOT SET",
    supabaseKey: supabaseKey ? "Set" : "NOT SET",
    nextAuthSecret: process.env.NEXTAUTH_SECRET ? "Set" : "NOT SET",
    nextAuthUrl: process.env.NEXTAUTH_URL || "NOT SET",
  });
}

export async function POST() {
  try {
    // Check if Supabase credentials are set
    if (
      !process.env.NEXT_PUBLIC_SUPABASE_URL ||
      !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    ) {
      return NextResponse.json(
        {
          error: "Supabase environment variables are not set",
          hint: "Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY",
        },
        { status: 500 },
      );
    }

    let adminCreated = false;

    // Get admin credentials from environment variables
    const adminEmail = process.env.ADMIN_EMAIL || "admin@inkpress.com";
    const adminPassword = process.env.ADMIN_PASSWORD || "admin123";

    // Check if admin already exists
    const { data: existingUser } = await supabase
      .from("users")
      .select("id")
      .eq("email", adminEmail.toLowerCase())
      .single();

    if (!existingUser) {
      // Create admin user
      const hashedPassword = await bcrypt.hash(adminPassword, 10);
      const { error } = await supabase.from("users").insert([
        {
          email: adminEmail.toLowerCase(),
          password: hashedPassword,
          name: "Admin",
          role: "admin",
        },
      ]);

      if (error) {
        throw error;
      }

      adminCreated = true;
    }

    return NextResponse.json(
      {
        message: "Database initialized successfully!",
        adminCreated,
        credentials: adminCreated
          ? { email: adminEmail, password: adminPassword }
          : "Admin already existed",
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Setup error:", error);
    return NextResponse.json(
      {
        error: "Failed to initialize database",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}
