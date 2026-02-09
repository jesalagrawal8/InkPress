import { NextResponse } from "next/server";

// This endpoint has been disabled for production security
// Use complete-setup.sql in Supabase SQL Editor to initialize database

export async function GET() {
  return NextResponse.json(
    {
      message: "Setup endpoint disabled for production",
      hint: "Run complete-setup.sql in your Supabase SQL Editor to initialize database",
    },
    { status: 403 }
  );
}

export async function POST() {
  return NextResponse.json(
    {
      message: "Setup endpoint disabled for production",
      hint: "Run complete-setup.sql in your Supabase SQL Editor to initialize database",
    },
    { status: 403 }
  );
}

