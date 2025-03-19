
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Search, MoreVertical, Download, Users } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/common/Card';
import PageHeader from '@/components/common/PageHeader';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

// Mock data
const MOCK_LISTS = [
  { id: '1', name: 'Клиенты Москва', count: 1254, lastUpdated: '2023-12-01' },
  { id: '2', name: 'Новые клиенты', count: 578, lastUpdated: '2023-12-08' },
  { id: '3', name: 'Должники', count: 342, lastUpdated: '2023-11-15' },
  { id: '4', name: 'VIP клиенты', count: 86, lastUpdated: '2023-12-10' },
];

const Numbers: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <div className="max-w-7xl mx-auto">
      <PageHeader 
        title="Списки номеров"
        description="Управление базами номеров для обзвона"
        action={{
          label: "Создать список",
          icon: <Plus size={16} />,
          onClick: () => navigate('/numbers/create')
        }}
      />
      
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={16} />
          <Input
            placeholder="Поиск списков..."
            className="pl-10 bg-card rounded-full h-10"
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {MOCK_LISTS.map((list) => (
          <NumberListCard key={list.id} list={list} />
        ))}
      </div>
    </div>
  );
};

interface NumberListCardProps {
  list: {
    id: string;
    name: string;
    count: number;
    lastUpdated: string;
  };
}

const NumberListCard: React.FC<NumberListCardProps> = ({ list }) => {
  const navigate = useNavigate();
  
  return (
    <Card className="h-full flex flex-col hover:border-era-blue/40 transition-all duration-300">
      <CardHeader className="flex justify-between items-start">
        <h3 
          className="font-medium text-foreground hover:text-era-blue cursor-pointer truncate transition-colors"
          onClick={() => navigate(`/numbers/${list.id}`)}
        >
          {list.name}
        </h3>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
              <MoreVertical size={16} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48 shadow-apple">
            <DropdownMenuItem onClick={() => navigate(`/numbers/${list.id}`)}>
              Редактировать
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Download size={16} className="mr-2" />
              Скачать список
            </DropdownMenuItem>
            <DropdownMenuItem className="text-destructive">Удалить</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
      
      <CardContent className="flex-grow">
        <div className="space-y-4">
          <div>
            <p className="text-sm text-muted-foreground">Количество номеров</p>
            <p className="text-foreground font-medium flex items-center gap-1 mt-1">
              <Users size={14} />
              {list.count}
            </p>
          </div>
          
          <div>
            <p className="text-sm text-muted-foreground">Последнее обновление</p>
            <p className="text-foreground mt-1">{list.lastUpdated}</p>
          </div>
        </div>
      </CardContent>
      
      <div className="p-4 border-t border-border/40">
        <Button 
          className="w-full rounded-full"
          onClick={() => navigate(`/numbers/${list.id}`)}
        >
          Просмотр списка
        </Button>
      </div>
    </Card>
  );
};

export default Numbers;
