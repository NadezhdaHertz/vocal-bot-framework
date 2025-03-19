
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
        "fixed left-0 top-0 h-full bg-card border-r border-border/40 shadow-sm transition-all duration-300 z-10",
        collapsed ? "w-[70px]" : "w-[250px]"
      )}
    >
      <div className="flex flex-col h-full">
        <div className="p-4 border-b border-border/40 flex items-center justify-between">
          {!collapsed && (
            <div className="text-xl font-semibold text-era-blue">Эра</div>
          )}
          <button 
            onClick={toggleSidebar}
            className="p-1 rounded-md hover:bg-muted transition-colors ml-auto"
          >
            {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
          </button>
        </div>
        
        <nav className="flex-1 p-3 space-y-1">
          <NavItem to="/projects" icon={<Folder size={18} />} label="Проекты" collapsed={collapsed} />
          <NavItem to="/campaigns" icon={<PhoneCall size={18} />} label="Кампании" collapsed={collapsed} />
          <NavItem to="/voice" icon={<Mic size={18} />} label="Голос" collapsed={collapsed} />
          <NavItem to="/numbers" icon={<Phone size={18} />} label="Списки номеров" collapsed={collapsed} />
          <NavItem to="/statistics" icon={<BarChart2 size={18} />} label="Статистика" collapsed={collapsed} />
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
