-- Complete InkPress Setup - Run this ONCE in Supabase SQL Editor
-- This will create tables AND admin user in one go

-- Drop existing tables if they exist (clean start)
DROP TABLE IF EXISTS blogs CASCADE;
DROP TABLE IF EXISTS users CASCADE;

-- Create users table
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  name VARCHAR(255) NOT NULL,
  role VARCHAR(20) NOT NULL DEFAULT 'user',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create blogs table
CREATE TABLE blogs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
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

-- Create indexes
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_blogs_slug ON blogs(slug);
CREATE INDEX idx_blogs_published ON blogs(published);
CREATE INDEX idx_blogs_created_at ON blogs(created_at DESC);

-- Disable RLS (for easier development)
ALTER TABLE users DISABLE ROW LEVEL SECURITY;
ALTER TABLE blogs DISABLE ROW LEVEL SECURITY;

-- Insert admin user directly
-- Email: admin@inkpress.com
-- Password: admin123
-- (password is bcrypt hashed)
INSERT INTO users (email, password, name, role)
VALUES (
  'admin@inkpress.com',
  '$2a$10$yq3Ip5rkTm.GwsrTMwI3Bu77s6IDR2NJhWgYq8iSMO/Q9ZcBvscQ6',
  'Admin',
  'admin'
);

-- Verify admin user created
SELECT 'Admin user created successfully!' as message;
SELECT email, name, role FROM users;
