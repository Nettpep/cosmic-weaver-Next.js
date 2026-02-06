-- Enable RLS on blog_posts table
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can read published posts
CREATE POLICY "Public can view published posts"
ON blog_posts
FOR SELECT
USING (is_published = true);

-- Policy: Authenticated users with admin role can do everything
CREATE POLICY "Admins can do everything"
ON blog_posts
FOR ALL
USING (
  auth.uid() IN (
    SELECT id FROM auth.users
    WHERE raw_user_meta_data->>'role' = 'admin'
  )
);

-- Enable RLS on categories table
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;

-- Policy: Everyone can read categories
CREATE POLICY "Public can view categories"
ON categories
FOR SELECT
USING (true);

-- Policy: Only admins can modify categories
CREATE POLICY "Admins can modify categories"
ON categories
FOR ALL
USING (
  auth.uid() IN (
    SELECT id FROM auth.users
    WHERE raw_user_meta_data->>'role' = 'admin'
  )
);

-- Enable RLS on tags table
ALTER TABLE tags ENABLE ROW LEVEL SECURITY;

-- Policy: Everyone can read tags
CREATE POLICY "Public can view tags"
ON tags
FOR SELECT
USING (true);

-- Policy: Only admins can modify tags
CREATE POLICY "Admins can modify tags"
ON tags
FOR ALL
USING (
  auth.uid() IN (
    SELECT id FROM auth.users
    WHERE raw_user_meta_data->>'role' = 'admin'
  )
);

-- Enable RLS on blog_post_tags junction table
ALTER TABLE blog_post_tags ENABLE ROW LEVEL SECURITY;

-- Policy: Everyone can read post-tag relationships
CREATE POLICY "Public can view post tags"
ON blog_post_tags
FOR SELECT
USING (true);

-- Policy: Only admins can modify post-tag relationships
CREATE POLICY "Admins can modify post tags"
ON blog_post_tags
FOR ALL
USING (
  auth.uid() IN (
    SELECT id FROM auth.users
    WHERE raw_user_meta_data->>'role' = 'admin'
  )
);
