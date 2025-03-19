
import React, { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Toaster } from 'sonner';
import Header from './Header';
import Sidebar from './Sidebar';
import { cn } from '@/lib/utils';

const Layout: React.FC = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const location = useLocation();
  
  // Get the page title based on the current route
  const getPageTitle = () => {
    const pathSegments = location.pathname.split('/').filter(Boolean);
    const page = pathSegments[0] || 'dashboard';
    
    const titles: Record<string, string> = {
      'projects': 'Проекты',
      'campaigns': 'Кампании',
      'voice': 'Голос',
      'numbers': 'Списки номеров',
      'statistics': 'Статистика',
      'dashboard': 'Платформа Эра'
    };
    
    return titles[page] || 'Платформа Эра';
  };

  return (
    <div className="min-h-screen bg-era-gray">
      <Sidebar
        collapsed={sidebarCollapsed}
        toggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)}
      />
      
      <main 
        className={cn(
          "transition-all duration-300",
          sidebarCollapsed ? "ml-[70px]" : "ml-[250px]"
        )}
      >
        <Header title={getPageTitle()} />
        
        <div className="p-6 animate-fade-in">
          <Outlet />
        </div>
      </main>
      
      <Toaster position="top-right" />
    </div>
  );
};

export default Layout;
