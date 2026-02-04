import { supabase } from '@/lib/supabase';

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  category_id: string | null;
  category?: {
    id: string;
    name: string;
    slug: string;
  };
  image_url: string | null;
  watcher_insight: string | null;
  is_published: boolean;
  is_featured: boolean;
  author_id: string | null;
  published_at: string | null;
  created_at: string;
  updated_at: string;
  tags?: Array<{
    id: string;
    name: string;
    slug: string;
  }>;
}

export interface CreatePostData {
  title: string;
  slug: string;
  excerpt?: string;
  content: string;
  category_id?: string;
  image_url?: string;
  watcher_insight?: string;
  is_published?: boolean;
  is_featured?: boolean;
  tag_ids?: string[];
}

// Fetch all published posts
export async function getPosts(limit = 10, offset = 0) {
  const { data, error } = await supabase
    .from('blog_posts')
    .select(`
      *,
      category:categories(*),
      tags:blog_post_tags(
        tag:tags(*)
      )
    `)
    .eq('is_published', true)
    .order('published_at', { ascending: false })
    .range(offset, offset + limit - 1);

  if (error) throw error;
  return data;
}

// Get single post by slug
export async function getPostBySlug(slug: string) {
  const { data, error } = await supabase
    .from('blog_posts')
    .select(`
      *,
      category:categories(*),
      tags:blog_post_tags(
        tag:tags(*)
      )
    `)
    .eq('slug', slug)
    .eq('is_published', true)
    .single();

  if (error) throw error;
  return data;
}

// Create new post (admin only)
export async function createPost(postData: CreatePostData) {
  const { tag_ids, ...post } = postData;
  
  // Insert post
  const { data: postResult, error: postError } = await supabase
    .from('blog_posts')
    .insert(post)
    .select()
    .single();

  if (postError) throw postError;

  // Insert tags if provided
  if (tag_ids && tag_ids.length > 0) {
    const tagLinks = tag_ids.map(tag_id => ({
      post_id: postResult.id,
      tag_id,
    }));

    const { error: tagError } = await supabase
      .from('blog_post_tags')
      .insert(tagLinks);

    if (tagError) throw tagError;
  }

  return postResult;
}

// Update post (admin only)
export async function updatePost(id: string, postData: Partial<CreatePostData>) {
  const { tag_ids, ...post } = postData;

  // Update post
  const { data, error } = await supabase
    .from('blog_posts')
    .update(post)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;

  // Update tags if provided
  if (tag_ids !== undefined) {
    // Delete existing tags
    await supabase
      .from('blog_post_tags')
      .delete()
      .eq('post_id', id);

    // Insert new tags
    if (tag_ids.length > 0) {
      const tagLinks = tag_ids.map(tag_id => ({
        post_id: id,
        tag_id,
      }));

      const { error: tagError } = await supabase
        .from('blog_post_tags')
        .insert(tagLinks);

      if (tagError) throw tagError;
    }
  }

  return data;
}

// Delete post (admin only)
export async function deletePost(id: string) {
  const { error } = await supabase
    .from('blog_posts')
    .delete()
    .eq('id', id);

  if (error) throw error;
}

// Full-text search
export async function searchPosts(query: string, limit = 10) {
  const { data, error } = await supabase
    .from('blog_posts')
    .select(`
      *,
      category:categories(*),
      tags:blog_post_tags(
        tag:tags(*)
      )
    `)
    .eq('is_published', true)
    .textSearch('title,excerpt,content', query, {
      type: 'websearch',
      config: 'english',
    })
    .limit(limit);

  if (error) throw error;
  return data;
}

// Get posts by category
export async function getPostsByCategory(categorySlug: string, limit = 10) {
  const { data, error } = await supabase
    .from('blog_posts')
    .select(`
      *,
      category:categories(*),
      tags:blog_post_tags(
        tag:tags(*)
      )
    `)
    .eq('is_published', true)
    .eq('categories.slug', categorySlug)
    .order('published_at', { ascending: false })
    .limit(limit);

  if (error) throw error;
  return data;
}

// Get featured posts
export async function getFeaturedPosts(limit = 3) {
  const { data, error } = await supabase
    .from('blog_posts')
    .select(`
      *,
      category:categories(*),
      tags:blog_post_tags(
        tag:tags(*)
      )
    `)
    .eq('is_published', true)
    .eq('is_featured', true)
    .order('published_at', { ascending: false })
    .limit(limit);

  if (error) throw error;
  return data;
}
