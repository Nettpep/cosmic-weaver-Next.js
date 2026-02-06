'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { User } from '@supabase/supabase-js';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const isLoginPage = pathname === '/admin/login';

  useEffect(() => {
    // หน้า /admin/login ไม่ต้องเช็กสิทธิ์ ปล่อยให้เห็นฟอร์มได้เลย
    if (isLoginPage) {
      setLoading(false);
      return;
    }

    const checkAuth = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session?.user) {
        router.push('/admin/login');
        return;
      }

      setUser(session.user);
      setLoading(false);
    };

    checkAuth();

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session?.user) {
        router.push('/admin/login');
      } else {
        setUser(session.user);
      }
    });

    return () => subscription.unsubscribe();
  }, [router, isLoginPage]);

  // สำหรับหน้า login แสดง children ตรง ๆ ไม่ต้องมี navbar / loading screen
  if (isLoginPage) {
    return <>{children}</>;
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-white text-xl">กำลังตรวจสอบสิทธิ์...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Admin Navbar */}
      <nav className="bg-slate-900 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <span className="text-cosmic-gold font-serif text-xl">
                Admin Panel
              </span>
              <div className="ml-10 flex items-baseline space-x-4">
                <a
                  href="/admin/blog"
                  className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  บทความ
                </a>
                <a
                  href="/"
                  className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  ดูเว็บหลัก
                </a>
              </div>
            </div>
            <div className="flex items-center">
              <span className="text-gray-400 text-sm mr-4">{user?.email}</span>
              <button
                onClick={async () => {
                  await supabase.auth.signOut();
                  router.push('/admin/login');
                }}
                className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
              >
                ออกจากระบบ
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {children}
      </main>
    </div>
  );
}
