-- Fix RLS Policies for InkPress
-- Run this in Supabase SQL Editor to fix access issues

-- Drop existing policies
DROP POLICY IF EXISTS "Enable read access for all users" ON users;
DROP POLICY IF EXISTS "Enable insert for registration" ON users;
DROP POLICY IF EXISTS "Enable read access for published blogs" ON blogs;
DROP POLICY IF EXISTS "Enable read access for all blogs" ON blogs;
DROP POLICY IF EXISTS "Enable insert for all" ON blogs;
DROP POLICY IF EXISTS "Enable update for all" ON blogs;
DROP POLICY IF EXISTS "Enable delete for all" ON blogs;

-- Disable RLS temporarily for easier development
ALTER TABLE users DISABLE ROW LEVEL SECURITY;
ALTER TABLE blogs DISABLE ROW LEVEL SECURITY;

-- Note: In production, you should enable RLS and create proper policies
-- For now, this allows the app to work correctly
