-- Fix Performance Warnings in RLS Policies
-- Run this to optimize RLS policies for better performance

-- ============================================
-- Fix Auth RLS Initialization Plan Warnings
-- Replace auth.uid() with (select auth.uid()) for better performance
-- ============================================

-- Drop and recreate policies with optimized auth.uid() calls

-- Profiles
DROP POLICY IF EXISTS "Users can update own profile" ON profiles;
CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING ((select auth.uid()) = id);

-- Blog Posts
DROP POLICY IF EXISTS "Published posts are viewable by everyone" ON blog_posts;
DROP POLICY IF EXISTS "Authors can manage own posts" ON blog_posts;

-- Combined policy for better performance (fixes multiple permissive policies warning)
CREATE POLICY "Blog posts access" ON blog_posts
  FOR SELECT USING (
    is_published = true OR (select auth.uid()) = author_id
  );

CREATE POLICY "Authors can manage own posts" ON blog_posts
  FOR INSERT WITH CHECK ((select auth.uid()) = author_id);

CREATE POLICY "Authors can update own posts" ON blog_posts
  FOR UPDATE USING ((select auth.uid()) = author_id);

CREATE POLICY "Authors can delete own posts" ON blog_posts
  FOR DELETE USING ((select auth.uid()) = author_id);

-- Tarot Readings
DROP POLICY IF EXISTS "Users can view own readings" ON tarot_readings;
DROP POLICY IF EXISTS "Users can create own readings" ON tarot_readings;
DROP POLICY IF EXISTS "Users can delete own readings" ON tarot_readings;

CREATE POLICY "Users can view own readings" ON tarot_readings
  FOR SELECT USING ((select auth.uid()) = user_id);

CREATE POLICY "Users can create own readings" ON tarot_readings
  FOR INSERT WITH CHECK ((select auth.uid()) = user_id);

CREATE POLICY "Users can delete own readings" ON tarot_readings
  FOR DELETE USING ((select auth.uid()) = user_id);

-- Comments
DROP POLICY IF EXISTS "Authenticated users can create comments" ON comments;
DROP POLICY IF EXISTS "Users can update own comments" ON comments;
DROP POLICY IF EXISTS "Users can delete own comments" ON comments;

CREATE POLICY "Authenticated users can create comments" ON comments
  FOR INSERT WITH CHECK ((select auth.uid()) = user_id);

CREATE POLICY "Users can update own comments" ON comments
  FOR UPDATE USING ((select auth.uid()) = user_id);

CREATE POLICY "Users can delete own comments" ON comments
  FOR DELETE USING ((select auth.uid()) = user_id);

-- Comment Likes
DROP POLICY IF EXISTS "Authenticated users can like comments" ON comment_likes;
DROP POLICY IF EXISTS "Users can unlike own likes" ON comment_likes;

CREATE POLICY "Authenticated users can like comments" ON comment_likes
  FOR INSERT WITH CHECK ((select auth.uid()) = user_id);

CREATE POLICY "Users can unlike own likes" ON comment_likes
  FOR DELETE USING ((select auth.uid()) = user_id);
