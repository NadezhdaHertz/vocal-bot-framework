
import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Mic, 
  Phone, 
  Folder, 
  BarChart2, 
  PhoneCall, 
  ChevronRight, 
  ChevronLeft 
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface SidebarProps {
  collapsed: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ collapsed, toggleSidebar }) => {
  return (
    <div 
      className={cn(
        "fixed left-0 top-0 h-full bg-white border-r border-era-gray shadow-sm transition-all duration-300 z-10",
        collapsed ? "w-[70px]" : "w-[250px]"
      )}
    >
      <div className="flex flex-col h-full">
        <div className="p-4 border-b border-era-gray flex items-center justify-between">
          {!collapsed && (
            <div className="text-xl font-semibold text-era-blue">Эра</div>
          )}
          <button 
            onClick={toggleSidebar}
            className="p-1 rounded-md hover:bg-era-gray transition-colors ml-auto"
          >
            {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
          </button>
        </div>
        
        <nav className="flex-1 p-2 space-y-1">
          <NavItem to="/projects" icon={<Folder />} label="Проекты" collapsed={collapsed} />
          <NavItem to="/campaigns" icon={<PhoneCall />} label="Кампании" collapsed={collapsed} />
          <NavItem to="/voice" icon={<Mic />} label="Голос" collapsed={collapsed} />
          <NavItem to="/numbers" icon={<Phone />} label="Списки номеров" collapsed={collapsed} />
          <NavItem to="/statistics" icon={<BarChart2 />} label="Статистика" collapsed={collapsed} />
        </nav>
      </div>
    </div>
  );
};

interface NavItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  collapsed: boolean;
}

const NavItem: React.FC<NavItemProps> = ({ to, icon, label, collapsed }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        cn(
          "nav-link",
          isActive ? "active" : "",
          collapsed ? "justify-center" : ""
        )
      }
    >
      <span className="flex-shrink-0">{icon}</span>
      {!collapsed && <span className="truncate">{label}</span>}
    </NavLink>
  );
};

export default Sidebar;
