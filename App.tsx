import React, { useState } from 'react';
import StarBackground from './components/StarBackground';
import { ViewState, TarotReading } from './types';
import TarotReader from './components/TarotReader';
import SecretChamber from './components/SecretChamber';
import BlogList from './components/BlogList';
import Dashboard from './components/Dashboard';
import { Ghost, Book, Disc, User, Menu, X } from 'lucide-react';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>('HOME');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [readings, setReadings] = useState<TarotReading[]>([]);

  const handleSaveReading = (reading: TarotReading) => {
      setReadings(prev => [reading, ...prev]);
  };

  const NavItem: React.FC<{ view?: ViewState; icon: React.ReactNode; label: string; href?: string }> = ({ view, icon, label, href }) => (
    <button
      onClick={() => {
        if (href) {
          if (typeof window !== 'undefined') {
            window.location.href = href;
          }
        } else if (view) {
          setCurrentView(view);
        }
        setMobileMenuOpen(false);
      }}
      className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 ${
        view && currentView === view
          ? 'bg-cosmic-gold text-black shadow-glow font-bold'
          : 'text-gray-400 hover:text-white hover:bg-white/10'
      }`}
    >
      {icon}
      <span>{label}</span>
    </button>
  );

  return (
    <div className="relative min-h-screen text-slate-200 font-sans selection:bg-cosmic-purple selection:text-white">
      <StarBackground />
      
      {/* Navigation Bar */}
      <nav className="fixed top-0 w-full z-50 border-b border-white/10 bg-black/50 backdrop-blur-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div 
                className="flex items-center gap-3 cursor-pointer group"
                onClick={() => setCurrentView('HOME')}
            >
              <div className="relative">
                <Disc className="w-8 h-8 text-cosmic-gold animate-spin-slow group-hover:shadow-glow rounded-full transition" />
                <div className="absolute inset-0 bg-cosmic-purple blur opacity-40 group-hover:opacity-70 transition"></div>
              </div>
              <span className="font-serif text-xl tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-purple-200 to-cosmic-gold">
                THE COSMIC WEAVER
              </span>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-2">
              <NavItem view="HOME" icon={<Disc className="w-4 h-4"/>} label="หน้าหลัก" />
              <NavItem view="BLOG" icon={<Book className="w-4 h-4"/>} label="บทความ" />
              <NavItem view="TAROT" icon={<Ghost className="w-4 h-4"/>} label="ดูดวงไพ่" href="/tarot" />
              <NavItem view="SECRET_CHAMBER" icon={<Disc className="w-4 h-4"/>} label="ห้องลับ" />
              <NavItem view="DASHBOARD" icon={<User className="w-4 h-4"/>} label="บันทึกการดูดวง" />
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-gray-300 hover:text-white"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {mobileMenuOpen && (
           <div className="md:hidden bg-black/95 backdrop-blur-xl border-b border-white/10 absolute w-full pb-4 px-4 flex flex-col gap-2 shadow-2xl">
              <NavItem view="HOME" icon={<Disc className="w-4 h-4"/>} label="หน้าหลัก" />
              <NavItem view="BLOG" icon={<Book className="w-4 h-4"/>} label="บทความ" />
              <NavItem view="TAROT" icon={<Ghost className="w-4 h-4"/>} label="ดูดวงไพ่" href="/tarot" />
              <NavItem view="SECRET_CHAMBER" icon={<Disc className="w-4 h-4"/>} label="ห้องลับ" />
              <NavItem view="DASHBOARD" icon={<User className="w-4 h-4"/>} label="บันทึกการดูดวง" />
           </div>
        )}
      </nav>

      {/* Main Content Area */}
      <main className="relative z-10 pt-20 pb-12 px-4">
        
        {/* Render Views */}
        {currentView === 'HOME' && (
          <div className="flex flex-col items-center justify-center min-h-[80vh] text-center max-w-4xl mx-auto animate-fade-in">
             <div className="w-32 h-32 md:w-48 md:h-48 rounded-full bg-gradient-to-tr from-cosmic-900 via-purple-900 to-black p-1 mb-8 shadow-[0_0_50px_rgba(176,38,255,0.4)]">
                <div className="w-full h-full rounded-full bg-black flex items-center justify-center overflow-hidden relative">
                    <img src="https://picsum.photos/400/400?grayscale" className="opacity-60 object-cover w-full h-full mix-blend-overlay" />
                    <Disc className="w-20 h-20 text-cosmic-gold absolute animate-pulse-slow" />
                </div>
             </div>
             
             <h1 className="text-5xl md:text-7xl font-serif text-white mb-6 tracking-tighter">
               เปิดม่าน<span className="text-cosmic-purple italic">สิ่งที่มองไม่เห็น</span>
             </h1>
             <p className="text-lg md:text-xl text-gray-400 mb-12 max-w-2xl font-light leading-relaxed thai-body">
               ยินดีต้อนรับ นักเดินทางแห่งดวงดาว ที่นี่คือจุดบรรจบระหว่างวิทยาศาสตร์และจิตวิญญาณ 
               ถักทอเส้นด้ายแห่งชะตาชีวิตของคุณผ่านไพ่ทาโรต์ สำรวจความลับของจักรวาล 
               และสนทนากับพลังที่ไม่อาจมองเห็นได้ด้วยตาเปล่า
             </p>

             <div className="flex flex-col sm:flex-row gap-4">
               <button 
               onClick={() => {
                 if (typeof window !== 'undefined') {
                   window.location.href = '/tarot';
                 }
               }}
                className="px-8 py-4 bg-cosmic-gold text-black font-serif font-bold rounded-lg hover:scale-105 transition shadow-[0_0_20px_rgba(255,215,0,0.3)]"
               >
                 ปรึกษาไพ่ทาโรต์
               </button>
               <button 
                onClick={() => setCurrentView('BLOG')}
                className="px-8 py-4 bg-transparent border border-purple-500/50 text-purple-200 font-serif rounded-lg hover:bg-purple-900/20 transition hover:border-purple-400"
               >
                 อ่านบทความย้อนหลัง
               </button>
             </div>
          </div>
        )}

        {currentView === 'BLOG' && <BlogList />}
        {currentView === 'TAROT' && <TarotReader onSaveReading={handleSaveReading} />}
        {currentView === 'SECRET_CHAMBER' && (
          <div className="min-h-[70vh] flex flex-col items-center justify-center">
             <div className="text-center mb-8">
               <h2 className="text-3xl font-serif text-purple-300">เสียงกระซิบจากความว่างเปล่า</h2>
               <p className="text-gray-500 text-sm">คำเตือน: ความจริงไม่ได้เหมาะสำหรับทุกคน</p>
             </div>
             <div className="w-full">
               <SecretChamber />
             </div>
          </div>
        )}
        {currentView === 'DASHBOARD' && <Dashboard readings={readings} />}

      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/5 py-8 text-center text-gray-600 text-sm font-serif">
        <p>&copy; {new Date().getFullYear()} The Cosmic Weaver. ทุกเส้นด้ายล้วนเชื่อมถึงกัน</p>
      </footer>
    </div>
  );
};

export default App;