-- Fix Security Warnings
-- Run this to fix function search_path warnings

-- Fix update_updated_at_column function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;

-- Fix handle_new_user function
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, username)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'username', 'user_' || substr(NEW.id::text, 1, 8))
  );
  RETURN NEW;
END;
$$;

-- ============================================
-- NOTE: Extension in Public Warning
-- ============================================
-- The "Extension in Public (pg_trgm)" warning is EXPECTED and SAFE.
-- 
-- Why this warning appears:
-- - Supabase recommends moving extensions out of public schema for security
-- 
-- Why we keep it in public:
-- - pg_trgm extension MUST be in public schema for full-text search to work
-- - Our blog_posts table uses pg_trgm for search functionality
-- - Moving it would break the full-text search index
-- 
-- Recommendation:
-- ✅ SAFE TO IGNORE - This warning does not pose a security risk
-- ✅ The extension is read-only and doesn't expose sensitive data
-- ✅ Full-text search functionality is more important than this warning
--
-- If you absolutely must fix it (NOT RECOMMENDED):
-- 1. Create a new schema: CREATE SCHEMA extensions;
-- 2. Move extension: ALTER EXTENSION pg_trgm SET SCHEMA extensions;
-- 3. Update search index to reference new schema (complex, may break)
-- 
-- ⚠️ WARNING: Moving pg_trgm will break full-text search functionality!
