import React, { useEffect, useState } from 'react';
import {
  Menu,
  Search,
  Bell,
  User,
  Home,
  Compass,
  PlaySquare,
  Clock,
  ThumbsUp,
  Settings,
} from 'lucide-react';
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { useAppearance } from '../context/appearance';

interface LayoutProps {
  children: React.ReactNode;
}

const mainNav = [
  { to: '/', label: 'Главная', icon: Home },
  { to: '/explore', label: 'Навигатор', icon: Compass },
  { to: '/subscriptions', label: 'Подписки', icon: PlaySquare },
  { to: '/history', label: 'История', icon: Clock },
  { to: '/liked', label: 'Понравившиеся', icon: ThumbsUp },
  { to: '/settings', label: 'Настройки', icon: Settings },
];

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [search, setSearch] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const { theme } = useAppearance();

  const isDark = theme === 'dark';
  const bgClass = isDark ? 'bg-[#0f0f0f] text-white' : 'bg-white text-[#0f0f0f]';
  const borderClass = isDark ? 'border-white/10' : 'border-black/10';

  useEffect(() => {
    setSearch(params.get('q') ?? '');
  }, [params]);

  const handleSearch = () => {
    const query = search.trim();
    navigate(query ? `/?q=${encodeURIComponent(query)}` : '/');
  };

  return (
    <div className={`min-h-screen ${bgClass}`}>
      <header
        className={`fixed top-0 left-0 right-0 h-14 ${isDark ? 'bg-[#0f0f0f]' : 'bg-white'} flex items-center justify-between px-4 z-50 border-b ${borderClass}`}
      >
        <div className="flex items-center gap-2 sm:gap-4">
          <button
            onClick={() => setSidebarOpen(!isSidebarOpen)}
            className="p-2 hover:bg-black/10 dark:hover:bg-white/10 rounded-full transition-colors"
          >
            <Menu size={24} />
          </button>
          <Link to="/" className="flex items-center gap-1 group">
            <div className="bg-red-600 p-1 px-1.5 rounded-lg group-hover:bg-red-500 transition-colors">
              <PlaySquare size={20} fill="white" />
            </div>
            <span className="text-lg sm:text-xl font-bold tracking-tighter">Платформа</span>
            <span className="hidden sm:inline text-[10px] text-gray-400 self-start mt-1 ml-1">by StreamLiveTV</span>
          </Link>
        </div>

        <div className="hidden md:flex flex-1 max-w-[720px] items-center gap-4 px-4">
          <div className="flex flex-1 items-center">
            <div
              className={`flex flex-1 items-center ${isDark ? 'bg-[#121212] border-[#303030]' : 'bg-[#f6f6f6] border-black/20'} border rounded-l-full px-4 py-1.5`}
            >
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                type="text"
                placeholder="Введите запрос"
                className="bg-transparent w-full outline-none text-base placeholder:text-gray-500"
              />
            </div>
            <button
              onClick={handleSearch}
              className={`${isDark ? 'bg-[#222222] border-[#303030]' : 'bg-[#f0f0f0] border-black/20'} border border-l-0 rounded-r-full px-5 py-1.5 hover:opacity-80 transition-colors`}
            >
              <Search size={20} />
            </button>
          </div>
        </div>

        <div className="flex items-center gap-1 sm:gap-3">
          <Link to="/settings" className="p-2 hover:bg-black/10 dark:hover:bg-white/10 rounded-full">
            <Settings size={22} />
          </Link>
          <button className="p-2 hover:bg-black/10 dark:hover:bg-white/10 rounded-full hidden sm:block">
            <Bell size={22} />
          </button>
          <button className="p-2 hover:bg-black/10 dark:hover:bg-white/10 rounded-full">
            <User size={22} />
          </button>
        </div>
      </header>

      <aside
        className={`hidden md:block fixed left-0 top-14 bottom-0 ${isDark ? 'bg-[#0f0f0f]' : 'bg-white'} transition-all duration-200 z-40 overflow-y-auto border-r ${borderClass} ${isSidebarOpen ? 'w-60' : 'w-20'}`}
      >
        <nav className="p-3 space-y-1">
          {mainNav.map((item) => (
            <SidebarItem
              key={item.to}
              icon={<item.icon size={22} />}
              label={item.label}
              active={location.pathname === item.to}
              isOpen={isSidebarOpen}
              to={item.to}
            />
          ))}
        </nav>
      </aside>

      <main className={`pt-14 transition-all duration-200 pb-20 md:pb-0 ${isSidebarOpen ? 'md:ml-60' : 'md:ml-20'}`}>
        <div className="p-4 lg:p-6">{children}</div>
      </main>

      <nav
        className={`md:hidden fixed bottom-0 left-0 right-0 h-16 ${isDark ? 'bg-[#0f0f0f]' : 'bg-white'} border-t ${borderClass} grid grid-cols-4 z-50`}
      >
        {[
          { to: '/', icon: Home, label: 'Главная' },
          { to: '/explore', icon: Compass, label: 'Обзор' },
          { to: '/subscriptions', icon: PlaySquare, label: 'Подписки' },
          { to: '/settings', icon: Settings, label: 'Настройки' },
        ].map((item) => {
          const ActiveIcon = item.icon;
          const active = location.pathname === item.to;
          return (
            <Link
              key={item.to}
              to={item.to}
              className={`flex flex-col items-center justify-center text-[11px] ${active ? 'text-red-500' : 'text-gray-500'}`}
            >
              <ActiveIcon size={20} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
};

const SidebarItem = ({
  icon,
  label,
  active = false,
  isOpen = true,
  to = '/',
}: {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  isOpen?: boolean;
  to?: string;
}) => (
  <Link
    to={to}
    className={`flex items-center gap-5 p-3 rounded-xl transition-colors ${active ? 'bg-black/10 dark:bg-white/10 font-medium' : 'hover:bg-black/5 dark:hover:bg-white/5'} ${!isOpen ? 'flex-col gap-1 px-1 justify-center' : ''}`}
  >
    <div>{icon}</div>
    {isOpen ? <span className="text-sm truncate">{label}</span> : <span className="text-[10px]">{label}</span>}
  </Link>
);
