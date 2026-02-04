-- The Cosmic Weaver - Seed Data
-- Run this after schema.sql to populate initial data

-- ============================================
-- INSERT DEFAULT CATEGORIES
-- ============================================
INSERT INTO categories (name, slug, description) VALUES
  ('Universe Secrets', 'universe-secrets', 'Mysteries of the cosmos and hidden knowledge'),
  ('Unsolved Mysteries', 'unsolved-mysteries', 'Enigmas that challenge our understanding'),
  ('Energy Manifestation', 'energy-manifestation', 'Harnessing cosmic energy for transformation');

-- ============================================
-- INSERT SAMPLE TAGS
-- ============================================
INSERT INTO tags (name, slug) VALUES
  ('cosmic', 'cosmic'),
  ('mystery', 'mystery'),
  ('energy', 'energy'),
  ('spirituality', 'spirituality'),
  ('science', 'science'),
  ('metaphysics', 'metaphysics'),
  ('manifestation', 'manifestation'),
  ('consciousness', 'consciousness');

-- ============================================
-- INSERT SAMPLE BLOG POSTS
-- (These will be migrated from constants.ts)
-- ============================================
-- Note: These require a category_id, so run after categories are inserted
-- You'll need to get the category IDs from the categories table first

-- Example (adjust category_id based on actual IDs):
/*
INSERT INTO blog_posts (
  title, 
  slug, 
  excerpt, 
  content, 
  category_id, 
  image_url, 
  watcher_insight, 
  is_published, 
  published_at
) VALUES
  (
    'The Hum of the Void: What Listening Tells Us',
    'hum-of-the-void',
    'Scientists have detected a low-frequency hum permeating the cosmos. Is it the background radiation, or the breathing of a living universe?',
    'Full markdown content here...',
    (SELECT id FROM categories WHERE slug = 'universe-secrets'),
    'https://picsum.photos/800/400?grayscale',
    'The silence is not empty; it is full of answers waiting for the right question.',
    true,
    NOW() - INTERVAL '2 days'
  ),
  (
    'Synchronicity or Simulation?',
    'synchronicity-or-simulation',
    'When numbers align and déjà vu strikes, are we seeing the code of the Matrix or the threads of Fate being pulled?',
    'Full markdown content here...',
    (SELECT id FROM categories WHERE slug = 'unsolved-mysteries'),
    'https://picsum.photos/800/401?grayscale',
    'Coincidence is merely a pattern you haven''t zoomed out far enough to see.',
    true,
    NOW() - INTERVAL '4 days'
  ),
  (
    'Manifesting with Starlight',
    'manifesting-with-starlight',
    'Harnessing the ancient energy of distant suns to align your personal frequency with abundance.',
    'Full markdown content here...',
    (SELECT id FROM categories WHERE slug = 'energy-manifestation'),
    'https://picsum.photos/800/402?grayscale',
    'You are made of starstuff; calling upon the stars is simply calling home.',
    true,
    NOW() - INTERVAL '9 days'
  );

-- Link tags to posts
INSERT INTO blog_post_tags (post_id, tag_id)
SELECT 
  bp.id,
  t.id
FROM blog_posts bp
CROSS JOIN tags t
WHERE 
  (bp.slug = 'hum-of-the-void' AND t.slug IN ('cosmic', 'science', 'mystery'))
  OR (bp.slug = 'synchronicity-or-simulation' AND t.slug IN ('mystery', 'consciousness', 'metaphysics'))
  OR (bp.slug = 'manifesting-with-starlight' AND t.slug IN ('energy', 'manifestation', 'spirituality'));
*/
