-- Fix RLS (Row Level Security) for missing tables
-- Run this if you see RLS errors in Supabase Security Audit

-- Enable RLS on missing tables
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_post_tags ENABLE ROW LEVEL SECURITY;

-- Categories: Everyone can read (reference data)
CREATE POLICY "Categories are viewable by everyone" ON categories
  FOR SELECT USING (true);

-- Tags: Everyone can read (reference data)
CREATE POLICY "Tags are viewable by everyone" ON tags
  FOR SELECT USING (true);

-- Blog Post Tags: Everyone can read (reference data)
CREATE POLICY "Blog post tags are viewable by everyone" ON blog_post_tags
  FOR SELECT USING (true);
