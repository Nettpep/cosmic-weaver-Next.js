'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { BlogPost } from '@/services/blogService';
import { supabase } from '@/lib/supabase';
import BlogEditor from '@/components/admin/BlogEditor';

export default function EditBlogPost() {
  const params = useParams();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPost = async () => {
      try {
        // Fetch by ID for admin edit
        const { data, error } = await supabase
          .from('blog_posts')
          .select(`
            *,
            category:categories(id, name, slug)
          `)
          .eq('id', params.id as string)
          .single();
        
        if (error) throw error;
        setPost(data);
      } catch (error) {
        console.error('Error loading post:', error);
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      loadPost();
    }
  }, [params.id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-white text-xl">กำลังโหลดบทความ...</div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="text-center py-12">
        <p className="text-red-400 text-lg">ไม่พบบทความ</p>
      </div>
    );
  }

  return <BlogEditor post={post} />;
}
