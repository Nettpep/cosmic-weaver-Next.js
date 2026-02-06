'use client';

import { useState } from 'react';
import { X, Sparkles, Wand2, RefreshCw } from 'lucide-react';

interface AIAssistantProps {
  mode: 'content' | 'metadata' | 'watcher';
  currentContent: string;
  title: string;
  onApply: (result: any) => void;
  onClose: () => void;
}

export default function AIAssistant({
  mode,
  currentContent,
  title,
  onApply,
  onClose,
}: AIAssistantProps) {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState('');
  const [aiMode, setAiMode] = useState<string>('expand'); // expand, plot_twist, tone_adjust

  const handleGenerate = async () => {
    setLoading(true);
    setError('');
    setResult(null);

    try {
      const response = await fetch('/api/ai-blog-tools', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: mode === 'content' ? 'co_author' : mode,
          mode: aiMode,
          content: currentContent,
          title: title,
          tone: 'mysterious',
        }),
      });

      if (!response.ok) {
        throw new Error('AI request failed');
      }

      const data = await response.json();
      setResult(data);
    } catch (err) {
      console.error('AI Error:', err);
      setError('เกิดข้อผิดพลาดในการเชื่อมต่อ AI กรุณาลองใหม่อีกครั้ง');
    } finally {
      setLoading(false);
    }
  };

  const renderContentModeUI = () => (
    <>
      <div className="mb-4">
        <label className="block text-gray-300 text-sm font-medium mb-2">
          เลือกโหมด AI Assist
        </label>
        <div className="grid grid-cols-3 gap-2">
          <button
            onClick={() => setAiMode('expand')}
            className={`px-3 py-2 rounded-md text-sm ${
              aiMode === 'expand'
                ? 'bg-purple-600 text-white'
                : 'bg-slate-700 text-gray-300 hover:bg-slate-600'
            }`}
          >
            ขยายเนื้อหา
          </button>
          <button
            onClick={() => setAiMode('plot_twist')}
            className={`px-3 py-2 rounded-md text-sm ${
              aiMode === 'plot_twist'
                ? 'bg-purple-600 text-white'
                : 'bg-slate-700 text-gray-300 hover:bg-slate-600'
            }`}
          >
            คิดจุดหักมุม
          </button>
          <button
            onClick={() => setAiMode('tone_adjust')}
            className={`px-3 py-2 rounded-md text-sm ${
              aiMode === 'tone_adjust'
                ? 'bg-purple-600 text-white'
                : 'bg-slate-700 text-gray-300 hover:bg-slate-600'
            }`}
          >
            ปรับโทนลึกลับ
          </button>
        </div>
      </div>

      {result && (
        <div className="mb-4 p-4 bg-slate-800 rounded-lg border border-slate-700">
          <p className="text-xs text-gray-400 mb-2">{result.note || 'คำแนะนำจาก AI'}</p>
          <div className="text-white whitespace-pre-wrap">{result.suggestion}</div>
        </div>
      )}
    </>
  );

  const renderMetadataModeUI = () => (
    <>
      <p className="text-gray-300 mb-4">
        AI จะช่วยสร้าง URL Slug และคำโปรยสั้นจากเนื้อหาบทความของคุณ
      </p>

      {result && (
        <div className="space-y-4 mb-4">
          <div className="p-4 bg-slate-800 rounded-lg border border-slate-700">
            <p className="text-xs text-gray-400 mb-1">Slug</p>
            <p className="text-white font-mono">{result.slug}</p>
          </div>
          <div className="p-4 bg-slate-800 rounded-lg border border-slate-700">
            <p className="text-xs text-gray-400 mb-1">Excerpt</p>
            <p className="text-white">{result.excerpt}</p>
          </div>
          {result.tags && (
            <div className="p-4 bg-slate-800 rounded-lg border border-slate-700">
              <p className="text-xs text-gray-400 mb-1">แท็กที่แนะนำ</p>
              <div className="flex flex-wrap gap-2 mt-2">
                {result.tags.map((tag: string, i: number) => (
                  <span key={i} className="px-2 py-1 bg-purple-900/50 text-purple-200 rounded text-sm">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );

  const renderWatcherModeUI = () => (
    <>
      <p className="text-gray-300 mb-4">
        AI จะช่วยสร้าง "สารจากผู้พิทักษ์" แบบลึกลับและน่าสนใจ
      </p>

      {result && (
        <div className="mb-4 p-4 bg-slate-800 rounded-lg border border-cosmic-gold/30">
          <p className="text-xs text-gray-400 mb-2">คำแนะนำจาก AI</p>
          <p className="text-white italic">"{result.insight || result.suggestion}"</p>
        </div>
      )}
    </>
  );

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-slate-900 rounded-lg border border-slate-700 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-purple-400" />
            <h2 className="text-xl font-serif text-white">
              {mode === 'content' && 'AI Co-Author'}
              {mode === 'metadata' && 'AI Metadata Generator'}
              {mode === 'watcher' && "The Watcher's Insight"}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {mode === 'content' && renderContentModeUI()}
          {mode === 'metadata' && renderMetadataModeUI()}
          {mode === 'watcher' && renderWatcherModeUI()}

          {error && (
            <div className="mb-4 p-3 bg-red-900/50 border border-red-700 rounded text-red-200 text-sm">
              {error}
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-3">
            <button
              onClick={handleGenerate}
              disabled={loading || !currentContent}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  กำลังสร้าง...
                </>
              ) : (
                <>
                  <Wand2 className="w-4 h-4" />
                  สร้างด้วย AI
                </>
              )}
            </button>

            {result && (
              <button
                onClick={() => onApply(result)}
                className="flex-1 px-4 py-2 bg-cosmic-gold text-black font-bold rounded-md hover:bg-yellow-500 transition"
              >
                ใช้ผลลัพธ์นี้
              </button>
            )}
          </div>

          {!currentContent && (
            <p className="text-gray-500 text-sm mt-3 text-center">
              กรุณาเขียนเนื้อหาบางส่วนก่อนใช้ AI Assist
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
