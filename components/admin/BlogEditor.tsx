'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createPost, updatePost } from '@/services/blogService';
import { BlogPost, CreatePostData } from '@/services/blogService';
import AIAssistant from './AIAssistant';
import { Save, Eye, Sparkles } from 'lucide-react';

interface BlogEditorProps {
  post?: BlogPost;
}

export default function BlogEditor({ post }: BlogEditorProps) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  
  // Form fields
  const [title, setTitle] = useState(post?.title || '');
  const [slug, setSlug] = useState(post?.slug || '');
  const [excerpt, setExcerpt] = useState(post?.excerpt || '');
  const [content, setContent] = useState(post?.content || '');
  const [imageUrl, setImageUrl] = useState(post?.image_url || '');
  const [watcherInsight, setWatcherInsight] = useState(post?.watcher_insight || '');
  const [isPublished, setIsPublished] = useState(post?.is_published || false);
  
  // AI features
  const [showAIForContent, setShowAIForContent] = useState(false);
  const [showAIForMetadata, setShowAIForMetadata] = useState(false);
  const [showAIForWatcher, setShowAIForWatcher] = useState(false);

  // Auto-generate slug from title
  useEffect(() => {
    if (!post && title) {
      const autoSlug = title
        .toLowerCase()
        .replace(/[^\u0E00-\u0E7Fa-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .substring(0, 50);
      setSlug(autoSlug);
    }
  }, [title, post]);

  const handleSave = async () => {
    if (!title || !content) {
      alert('กรุณากรอกชื่อบทความและเนื้อหา');
      return;
    }

    setSaving(true);
    try {
      const postData: CreatePostData = {
        title,
        slug: slug || title.toLowerCase().replace(/\s+/g, '-'),
        excerpt,
        content,
        image_url: imageUrl,
        watcher_insight: watcherInsight,
        is_published: isPublished,
      };

      if (post) {
        await updatePost(post.id, postData);
      } else {
        await createPost(postData);
      }

      router.push('/admin/blog');
    } catch (error) {
      console.error('Error saving post:', error);
      alert('เกิดข้อผิดพลาดในการบันทึก');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="px-4 py-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-serif text-white">
          {post ? 'แก้ไขบทความ' : 'เขียนบทความใหม่'}
        </h1>
        <div className="flex gap-3">
          <button
            onClick={() => setShowPreview(!showPreview)}
            className="flex items-center gap-2 px-4 py-2 bg-slate-700 text-white rounded-md hover:bg-slate-600 transition"
          >
            <Eye className="w-4 h-4" />
            {showPreview ? 'ซ่อนตัวอย่าง' : 'แสดงตัวอย่าง'}
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 px-4 py-2 bg-cosmic-gold text-black font-bold rounded-md hover:bg-yellow-500 transition disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            {saving ? 'กำลังบันทึก...' : 'บันทึก'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Editor Panel */}
        <div className="space-y-4">
          {/* Title */}
          <div>
            <label className="block text-gray-300 text-sm font-medium mb-2">
              ชื่อบทความ *
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-cosmic-gold"
              placeholder="เช่น: เสียงกระซิบจากความว่างเปล่า..."
            />
          </div>

          {/* Slug */}
          <div>
            <label className="block text-gray-300 text-sm font-medium mb-2">
              URL Slug
            </label>
            <input
              type="text"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-cosmic-gold text-sm"
              placeholder="auto-generated-from-title"
            />
            <p className="text-gray-500 text-xs mt-1">
              URL: /blog/{slug || 'your-slug'}
            </p>
          </div>

          {/* Excerpt + AI */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-gray-300 text-sm font-medium">
                คำโปรยสั้น (Excerpt)
              </label>
              <button
                onClick={() => setShowAIForMetadata(true)}
                className="text-xs text-purple-400 hover:text-purple-300 flex items-center gap-1"
              >
                <Sparkles className="w-3 h-3" />
                AI สร้างให้
              </button>
            </div>
            <textarea
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              rows={3}
              className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-cosmic-gold"
              placeholder="สรุปย่อของบทความ..."
            />
          </div>

          {/* Content + AI */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-gray-300 text-sm font-medium">
                เนื้อหาบทความ *
              </label>
              <button
                onClick={() => setShowAIForContent(true)}
                className="text-xs text-purple-400 hover:text-purple-300 flex items-center gap-1"
              >
                <Sparkles className="w-3 h-3" />
                AI Assist
              </button>
            </div>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={20}
              className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-cosmic-gold font-mono text-sm"
              placeholder="เขียนเนื้อหาบทความของคุณที่นี่..."
            />
          </div>

          {/* Image URL */}
          <div>
            <label className="block text-gray-300 text-sm font-medium mb-2">
              URL รูปปก
            </label>
            <input
              type="url"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-cosmic-gold"
              placeholder="https://example.com/image.jpg"
            />
          </div>

          {/* Watcher's Insight + AI */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-gray-300 text-sm font-medium">
                สารจากผู้พิทักษ์ (Watcher's Insight)
              </label>
              <button
                onClick={() => setShowAIForWatcher(true)}
                className="text-xs text-purple-400 hover:text-purple-300 flex items-center gap-1"
              >
                <Sparkles className="w-3 h-3" />
                AI สร้างให้
              </button>
            </div>
            <textarea
              value={watcherInsight}
              onChange={(e) => setWatcherInsight(e.target.value)}
              rows={2}
              className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-cosmic-gold italic"
              placeholder="ข้อความลึกลับจากผู้พิทักษ์..."
            />
          </div>

          {/* Publish Status */}
          <div className="flex items-center">
            <input
              type="checkbox"
              id="isPublished"
              checked={isPublished}
              onChange={(e) => setIsPublished(e.target.checked)}
              className="w-4 h-4 text-cosmic-gold bg-slate-800 border-slate-700 rounded focus:ring-cosmic-gold"
            />
            <label htmlFor="isPublished" className="ml-2 text-gray-300">
              เผยแพร่ทันที
            </label>
          </div>
        </div>

        {/* Preview Panel */}
        {showPreview && (
          <div className="bg-slate-900 rounded-lg p-6 border border-slate-800">
            <h3 className="text-sm font-medium text-gray-400 mb-4">ตัวอย่าง</h3>
            <article className="prose prose-invert max-w-none">
              {imageUrl && (
                <img 
                  src={imageUrl} 
                  alt={title}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
              )}
              <h1 className="text-3xl font-serif text-white mb-2">{title || 'ชื่อบทความ'}</h1>
              {excerpt && (
                <p className="text-lg text-purple-200 italic border-l-4 border-cosmic-purple pl-4 mb-6">
                  {excerpt}
                </p>
              )}
              <div className="text-gray-300 whitespace-pre-wrap">
                {content || 'เนื้อหาบทความจะแสดงที่นี่...'}
              </div>
              {watcherInsight && (
                <div className="mt-6 bg-black/40 border border-cosmic-gold/30 p-4 rounded-lg">
                  <p className="text-cosmic-gold text-sm font-serif mb-1">
                    สารจากผู้พิทักษ์
                  </p>
                  <p className="text-gray-300 italic">"{watcherInsight}"</p>
                </div>
              )}
            </article>
          </div>
        )}
      </div>

      {/* AI Assistants */}
      {showAIForContent && (
        <AIAssistant
          mode="content"
          currentContent={content}
          title={title}
          onApply={(newContent) => {
            setContent(newContent);
            setShowAIForContent(false);
          }}
          onClose={() => setShowAIForContent(false)}
        />
      )}

      {showAIForMetadata && (
        <AIAssistant
          mode="metadata"
          currentContent={content}
          title={title}
          onApply={(result) => {
            if (result.excerpt) setExcerpt(result.excerpt);
            if (result.slug) setSlug(result.slug);
            setShowAIForMetadata(false);
          }}
          onClose={() => setShowAIForMetadata(false)}
        />
      )}

      {showAIForWatcher && (
        <AIAssistant
          mode="watcher"
          currentContent={content}
          title={title}
          onApply={(insight) => {
            setWatcherInsight(insight);
            setShowAIForWatcher(false);
          }}
          onClose={() => setShowAIForWatcher(false)}
        />
      )}
    </div>
  );
}
