-- Fix Unindexed Foreign Keys
-- Add indexes for foreign keys to improve query performance

-- ============================================
-- Add indexes for foreign keys
-- ============================================

-- Blog post tags - tag_id foreign key
CREATE INDEX IF NOT EXISTS idx_blog_post_tags_tag_id 
  ON blog_post_tags(tag_id);

-- Comments - user_id foreign key
CREATE INDEX IF NOT EXISTS idx_comments_user_id 
  ON comments(user_id);

-- Comment likes - user_id foreign key
CREATE INDEX IF NOT EXISTS idx_comment_likes_user_id 
  ON comment_likes(user_id);

-- ============================================
-- Note about Unused Index warnings
-- ============================================
-- The "Unused Index" warnings are INFO level and can be safely ignored.
-- 
-- Why they appear:
-- - Indexes haven't been used yet because there's no data in the tables
-- - Once you start using the application, these indexes will be utilized
-- 
-- These indexes are important for:
-- - Fast queries by category (idx_blog_posts_category)
-- - Fast queries by author (idx_blog_posts_author)
-- - Fast published posts queries (idx_blog_posts_published)
-- - Full-text search (idx_blog_posts_search)
-- - User readings queries (idx_tarot_readings_user)
-- - Comments by post (idx_comments_post)
-- - Nested comments (idx_comments_parent)
--
-- Recommendation:
-- ✅ Keep all indexes - they will be used as your application grows
-- ✅ The warnings will disappear once queries start using them
-- ✅ These are performance optimizations for future queries
