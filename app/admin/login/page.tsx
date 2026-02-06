'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

export default function AdminLogin() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError('อีเมลหรือรหัสผ่านไม่ถูกต้อง');
      setLoading(false);
    } else {
      router.push('/admin/blog');
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="bg-slate-900 rounded-lg shadow-xl p-8 border border-slate-800">
          <h2 className="text-3xl font-serif text-cosmic-gold mb-6 text-center">
            Admin Login
          </h2>
          
          {error && (
            <div className="mb-4 p-3 bg-red-900/50 border border-red-700 rounded text-red-200 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label className="block text-gray-300 text-sm font-medium mb-2">
                อีเมล
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-cosmic-gold"
                required
              />
            </div>

            <div className="mb-6">
              <label className="block text-gray-300 text-sm font-medium mb-2">
                รหัสผ่าน
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-cosmic-gold"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-cosmic-gold text-black font-bold py-2 px-4 rounded-md hover:bg-yellow-500 transition disabled:opacity-50"
            >
              {loading ? 'กำลังเข้าสู่ระบบ...' : 'เข้าสู่ระบบ'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
