import React, { useState } from 'react';
import { MOCK_POSTS } from '../constants';
import { BlogPost } from '../types';
import { BookOpen, X, Share2, Star } from 'lucide-react';

const BlogList: React.FC = () => {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('ทั้งหมด');

  const categories = ['ทั้งหมด', ...Array.from(new Set(MOCK_POSTS.map(p => p.category)))];
  const filteredPosts = activeCategory === 'ทั้งหมด' 
    ? MOCK_POSTS 
    : MOCK_POSTS.filter(p => p.category === activeCategory);

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8 min-h-screen">
      {!selectedPost ? (
        <>
          <h2 className="text-4xl font-serif text-white mb-8 text-center border-b border-cosmic-gold/20 pb-4">
            คลังบทความลึกลับ
          </h2>
          
          {/* Filter */}
          <div className="flex flex-wrap gap-4 justify-center mb-12">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm uppercase tracking-wider transition-all duration-300 ${
                  activeCategory === cat 
                    ? 'bg-cosmic-gold text-black font-bold shadow-glow' 
                    : 'bg-slate-900/50 text-gray-400 border border-gray-700 hover:border-cosmic-gold hover:text-cosmic-gold'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <div 
                key={post.id}
                onClick={() => setSelectedPost(post)}
                className="group cursor-pointer bg-slate-900/40 border border-slate-800 hover:border-cosmic-purple/50 rounded-xl overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-glow"
              >
                <div className="h-48 overflow-hidden relative">
                   <img src={post.imageUrl} alt={post.title} className="w-full h-full object-cover transition duration-700 group-hover:scale-110 opacity-70 group-hover:opacity-100" />
                   <div className="absolute top-2 right-2 bg-black/60 px-2 py-1 rounded text-xs text-cosmic-gold border border-cosmic-gold/30">
                     {post.category}
                   </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-serif text-purple-100 mb-2 group-hover:text-cosmic-gold transition">{post.title}</h3>
                  <p className="text-gray-400 text-sm line-clamp-3 font-sans">{post.excerpt}</p>
                  <div className="mt-4 flex items-center justify-between text-xs text-slate-500">
                    <span>{post.date}</span>
                    <span className="flex items-center gap-1 group-hover:text-purple-300 transition">อ่านเพิ่มเติม <BookOpen className="w-3 h-3" /></span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="animate-fade-in-up">
          <button 
            onClick={() => setSelectedPost(null)}
            className="mb-6 flex items-center gap-2 text-gray-400 hover:text-white transition"
          >
            <X className="w-5 h-5" /> กลับไปหน้าบทความ
          </button>

          <article className="bg-slate-900/80 border border-slate-700 rounded-2xl p-8 md:p-12 shadow-2xl relative overflow-hidden">
            {/* Background Texture */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-purple-600/10 blur-[80px] rounded-full pointer-events-none"></div>

            <div className="flex flex-col md:flex-row gap-6 items-start mb-8 border-b border-white/10 pb-8">
               <div className="flex-1">
                 <span className="text-cosmic-gold text-sm tracking-widest uppercase mb-2 block">{selectedPost.category}</span>
                 <h1 className="text-3xl md:text-5xl font-serif text-white mb-6 leading-tight">{selectedPost.title}</h1>
                 <p className="text-xl text-purple-200 font-light italic border-l-4 border-cosmic-purple pl-4">{selectedPost.excerpt}</p>
               </div>
            </div>

            <div className="prose prose-invert prose-lg max-w-none font-sans text-gray-300">
              {selectedPost.content}
            </div>

            <div className="mt-12 bg-black/40 border border-cosmic-gold/30 p-6 rounded-lg">
              <h4 className="text-cosmic-gold font-serif flex items-center gap-2 mb-2">
                <Star className="w-4 h-4" /> สารจากผู้พิทักษ์
              </h4>
              <p className="text-sm md:text-base text-gray-300 italic">"{selectedPost.watcherInsight}"</p>
            </div>
            
            <div className="mt-8 flex gap-4">
                <button className="flex items-center gap-2 text-sm text-gray-400 hover:text-cosmic-gold transition">
                    <Share2 className="w-4 h-4"/> แชร์บทความ
                </button>
            </div>
          </article>
        </div>
      )}
    </div>
  );
};

export default BlogList;