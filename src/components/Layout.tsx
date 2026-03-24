import React, { useState } from 'react';
import { Menu, Search, Video, Bell, User, Home, Compass, PlaySquare, Clock, ThumbsUp, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white">
      {/* Header - No Upload/Login buttons as requested */}
      <header className="fixed top-0 left-0 right-0 h-14 bg-[#0f0f0f] flex items-center justify-between px-4 z-50">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setSidebarOpen(!isSidebarOpen)}
            className="p-2 hover:bg-white/10 rounded-full transition-colors"
          >
            <Menu size={24} />
          </button>
          <Link to="/" className="flex items-center gap-1 group">
            <div className="bg-red-600 p-1 px-1.5 rounded-lg group-hover:bg-red-500 transition-colors">
              <PlaySquare size={20} fill="white" />
            </div>
            <span className="text-xl font-bold tracking-tighter">Платформа</span>
            <span className="text-[10px] text-gray-400 self-start mt-1 ml-1">BY STREAMLIVETV</span>
          </Link>
        </div>

        <div className="flex-1 max-w-[720px] flex items-center gap-4 px-4">
          <div className="flex flex-1 items-center">
            <div className="flex flex-1 items-center bg-[#121212] border border-[#303030] rounded-l-full px-4 py-1.5 focus-within:border-blue-500 transition-colors">
              <input 
                type="text" 
                placeholder="Введите запрос" 
                className="bg-transparent w-full outline-none text-base placeholder:text-gray-500"
              />
            </div>
            <button className="bg-[#222222] border border-l-0 border-[#303030] rounded-r-full px-5 py-1.5 hover:bg-[#2a2a2a] transition-colors">
              <Search size={20} />
            </button>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Only utility icons, no "Login" or "Upload" */}
          <button className="p-2 hover:bg-white/10 rounded-full hidden sm:block">
            <Bell size={24} />
          </button>
          <button className="p-2 hover:bg-white/10 rounded-full">
            <User size={24} />
          </button>
        </div>
      </header>

      {/* Sidebar */}
      <aside className={`fixed left-0 top-14 bottom-0 bg-[#0f0f0f] transition-all duration-200 z-40 overflow-y-auto ${isSidebarOpen ? 'w-60' : 'w-20'}`}>
        <nav className="p-3 space-y-1">
          <SidebarItem icon={<Home size={22} />} label="Главная" active isOpen={isSidebarOpen} to="/" />
          <SidebarItem icon={<Compass size={22} />} label="Навигатор" isOpen={isSidebarOpen} to="/explore" />
          <SidebarItem icon={<PlaySquare size={22} />} label="Подписки" isOpen={isSidebarOpen} to="/subscriptions" />
          <hr className="border-white/10 my-3" />
          <SidebarItem icon={<Clock size={22} />} label="История" isOpen={isSidebarOpen} to="/history" />
          <SidebarItem icon={<ThumbsUp size={22} />} label="Понравившиеся" isOpen={isSidebarOpen} to="/liked" />
        </nav>
      </aside>

      {/* Main Content */}
      <main className={`pt-14 transition-all duration-200 ${isSidebarOpen ? 'ml-60' : 'ml-20'}`}>
        <div className="p-4 lg:p-6">
          {children}
        </div>
      </main>
    </div>
  );
};

const SidebarItem = ({ icon, label, active = false, isOpen = true, to = "/" }: { icon: any, label: string, active?: boolean, isOpen?: boolean, to?: string }) => (
  <Link 
    to={to}
    className={`flex items-center gap-5 p-3 rounded-xl transition-colors ${active ? 'bg-white/10 font-medium' : 'hover:bg-white/5'} ${!isOpen ? 'flex-col gap-1 px-1 justify-center' : ''}`}
  >
    <div className={active ? 'text-white' : 'text-gray-300'}>{icon}</div>
    {isOpen ? (
      <span className="text-sm truncate">{label}</span>
    ) : (
      <span className="text-[10px] text-gray-400">{label}</span>
    )}
  </Link>
);
