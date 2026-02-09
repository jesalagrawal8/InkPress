import { NextResponse } from "next/server";

export async function GET() {
  const mongoUri = process.env.MONGODB_URI || "";
  
  return NextResponse.json({
    environment: process.env.NODE_ENV,
    nextAuthUrl: process.env.NEXTAUTH_URL || "NOT SET",
    nextAuthUrlCorrect: process.env.NEXTAUTH_URL === "https://ink-press-olive.vercel.app",
    mongoHasDbName: mongoUri.includes("/inkpress"),
    mongoUri: mongoUri ? `${mongoUri.substring(0, 30)}...` : "NOT SET",
  });
}
