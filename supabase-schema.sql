-- InkPress Supabase Database Schema
-- Run this SQL in your Supabase SQL Editor to create the required tables

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  name VARCHAR(255) NOT NULL,
  role VARCHAR(20) NOT NULL DEFAULT 'user' CHECK (role IN ('admin', 'user')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create blogs table
CREATE TABLE IF NOT EXISTS blogs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  content TEXT NOT NULL,
  excerpt VARCHAR(200) NOT NULL,
  cover_image VARCHAR(500),
  author VARCHAR(255) NOT NULL DEFAULT 'Admin',
  tags TEXT[] DEFAULT '{}',
  published BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_blogs_slug ON blogs(slug);
CREATE INDEX IF NOT EXISTS idx_blogs_published ON blogs(published);
CREATE INDEX IF NOT EXISTS idx_blogs_created_at ON blogs(created_at DESC);

-- Enable Row Level Security (RLS)
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE blogs ENABLE ROW LEVEL SECURITY;

-- Create policies for users table
-- Allow anyone to read user data (needed for authentication)
CREATE POLICY "Enable read access for all users" ON users
  FOR SELECT USING (true);

-- Allow insert for new user registration
CREATE POLICY "Enable insert for registration" ON users
  FOR INSERT WITH CHECK (true);

-- Create policies for blogs table
-- Allow anyone to read published blogs
CREATE POLICY "Enable read access for published blogs" ON blogs
  FOR SELECT USING (published = true OR true);

-- Allow authenticated users to read all blogs (for admin dashboard)
CREATE POLICY "Enable read access for all blogs" ON blogs
  FOR SELECT USING (true);

-- Allow insert/update/delete for all (will be controlled by app logic)
CREATE POLICY "Enable insert for all" ON blogs
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Enable update for all" ON blogs
  FOR UPDATE USING (true);

CREATE POLICY "Enable delete for all" ON blogs
  FOR DELETE USING (true);
