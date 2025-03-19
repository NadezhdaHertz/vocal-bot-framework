
import React from 'react';
import { Bell, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface HeaderProps {
  title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  return (
    <header className="h-16 border-b border-border/40 flex items-center justify-between px-6 bg-background/80 backdrop-blur-sm sticky top-0 z-10">
      <h1 className="text-xl font-medium text-foreground">{title}</h1>

      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="icon" className="relative rounded-full w-9 h-9">
          <Bell size={18} />
          <span className="absolute top-1 right-1 w-2 h-2 bg-era-blue rounded-full" />
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full w-9 h-9">
              <User size={18} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 shadow-apple">
            <DropdownMenuLabel>Мой профиль</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Настройки</DropdownMenuItem>
            <DropdownMenuItem>Мой баланс</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Выйти</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default Header;
