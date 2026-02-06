'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { deletePost } from '@/services/blogService';
import { BlogPost } from '@/services/blogService';
import { supabase } from '@/lib/supabase';
import { Plus, Edit, Trash2, Eye } from 'lucide-react';

export default function AdminBlogList() {
  const router = useRouter();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    try {
      setErrorMessage(null);
      // Fetch all posts including unpublished (admin view)
      const { data, error } = await supabase
        .from('blog_posts')
        .select(`
          *,
          category:categories(id, name, slug)
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setPosts(data || []);
    } catch (error) {
      const message =
        error && typeof error === 'object' && 'message' in error
          ? // @ts-ignore
            String(error.message)
          : String(error);
      console.error('Error loading posts:', message);
      setErrorMessage(message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`ต้องการลบบทความ "${title}" ใช่หรือไม่?`)) {
      return;
    }

    setDeleting(id);
    try {
      await deletePost(id);
      setPosts(posts.filter(p => p.id !== id));
    } catch (error) {
      console.error('Error deleting post:', error);
      alert('เกิดข้อผิดพลาดในการลบบทความ');
    } finally {
      setDeleting(null);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-white text-xl">กำลังโหลดบทความ...</div>
      </div>
    );
  }

  return (
    <div className="px-4 py-6">
      {errorMessage && (
        <div className="mb-4 p-3 bg-red-900/50 border border-red-700 rounded text-red-200 text-sm">
          เกิดข้อผิดพลาดในการโหลดบทความ: {errorMessage}
        </div>
      )}
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-serif text-white">จัดการบทความ</h1>
        <button
          onClick={() => router.push('/admin/blog/new')}
          className="flex items-center gap-2 bg-cosmic-gold text-black font-bold px-4 py-2 rounded-md hover:bg-yellow-500 transition"
        >
          <Plus className="w-5 h-5" />
          เขียนบทความใหม่
        </button>
      </div>

      {/* Posts List */}
      {posts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-400 text-lg mb-4">ยังไม่มีบทความ</p>
          <button
            onClick={() => router.push('/admin/blog/new')}
            className="text-cosmic-gold hover:underline"
          >
            สร้างบทความแรกของคุณ
          </button>
        </div>
      ) : (
        <div className="bg-slate-900 rounded-lg border border-slate-800 overflow-hidden">
          <table className="min-w-full divide-y divide-slate-800">
            <thead className="bg-slate-800">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  ชื่อบทความ
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  หมวดหมู่
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  สถานะ
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  วันที่
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">
                  การจัดการ
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {posts.map((post) => (
                <tr key={post.id} className="hover:bg-slate-800/50 transition">
                  <td className="px-6 py-4">
                    <div className="text-white font-medium">{post.title}</div>
                    <div className="text-gray-400 text-sm truncate max-w-md">
                      {post.excerpt}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-900/50 text-purple-200">
                      {post.category?.name || '-'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      post.is_published 
                        ? 'bg-green-900/50 text-green-200' 
                        : 'bg-gray-700 text-gray-300'
                    }`}>
                      {post.is_published ? 'เผยแพร่แล้ว' : 'แบบร่าง'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-400 text-sm">
                    {post.published_at 
                      ? new Date(post.published_at).toLocaleDateString('th-TH')
                      : '-'
                    }
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => router.push(`/admin/blog/${post.id}`)}
                        className="p-2 text-blue-400 hover:bg-blue-900/20 rounded transition"
                        title="แก้ไข"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(post.id, post.title)}
                        disabled={deleting === post.id}
                        className="p-2 text-red-400 hover:bg-red-900/20 rounded transition disabled:opacity-50"
                        title="ลบ"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
