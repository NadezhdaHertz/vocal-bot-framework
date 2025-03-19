
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Search, MoreVertical, Phone, PhoneOff } from 'lucide-react';
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
import { Badge } from '@/components/ui/badge';

// Mock data
const MOCK_CAMPAIGNS = [
  { 
    id: '1', 
    name: 'Опрос удовлетворенности', 
    status: 'active' as const, 
    calls: 356, 
    answers: 242, 
    lastActivity: '2023-12-10' 
  },
  { 
    id: '2', 
    name: 'Подтверждение визита', 
    status: 'inactive' as const, 
    calls: 1024, 
    answers: 875, 
    lastActivity: '2023-12-05' 
  },
  { 
    id: '3', 
    name: 'Напоминание о платеже', 
    status: 'active' as const, 
    calls: 542, 
    answers: 398, 
    lastActivity: '2023-12-08' 
  },
  { 
    id: '4', 
    name: 'Информирование о новых услугах', 
    status: 'active' as const, 
    calls: 89, 
    answers: 65, 
    lastActivity: '2023-12-12' 
  },
];

const Campaigns: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <div className="max-w-7xl mx-auto">
      <PageHeader 
        title="Кампании"
        description="Управление кампаниями обзвона"
        action={{
          label: "Создать кампанию",
          icon: <Plus size={18} />,
          onClick: () => navigate('/campaigns/create')
        }}
      />
      
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-era-dark-gray" size={18} />
          <Input
            placeholder="Поиск кампаний..."
            className="pl-10 bg-white"
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {MOCK_CAMPAIGNS.map((campaign) => (
          <CampaignCard key={campaign.id} campaign={campaign} />
        ))}
      </div>
    </div>
  );
};

interface CampaignCardProps {
  campaign: {
    id: string;
    name: string;
    status: 'active' | 'inactive';
    calls: number;
    answers: number;
    lastActivity: string;
  };
}

const CampaignCard: React.FC<CampaignCardProps> = ({ campaign }) => {
  const navigate = useNavigate();
  
  return (
    <Card className="h-full flex flex-col hover:border-era-blue/40 group">
      <CardHeader className="flex justify-between items-start">
        <div>
          <h3 
            className="font-medium text-era-black hover:text-era-blue cursor-pointer truncate"
            onClick={() => navigate(`/campaigns/${campaign.id}`)}
          >
            {campaign.name}
          </h3>
          <Badge 
            variant={campaign.status === 'active' ? 'default' : 'secondary'}
            className={campaign.status === 'active' ? 'bg-green-500' : 'bg-era-gray text-era-dark-gray'}
          >
            {campaign.status === 'active' ? 'Активна' : 'Не активна'}
          </Badge>
        </div>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <MoreVertical size={16} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48 bg-white">
            <DropdownMenuItem onClick={() => navigate(`/campaigns/${campaign.id}`)}>
              Редактировать
            </DropdownMenuItem>
            <DropdownMenuItem>Дублировать</DropdownMenuItem>
            <DropdownMenuItem>Тестовый звонок</DropdownMenuItem>
            <DropdownMenuItem className="text-destructive">Удалить</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
      
      <CardContent className="flex-grow">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-2">
            <div>
              <p className="text-sm text-muted-foreground">Звонков</p>
              <p className="text-era-dark-gray font-medium">{campaign.calls}</p>
            </div>
            
            <div>
              <p className="text-sm text-muted-foreground">Отвеченных</p>
              <p className="text-era-dark-gray font-medium">{campaign.answers}</p>
            </div>
          </div>
          
          <div>
            <p className="text-sm text-muted-foreground">Последняя активность</p>
            <p className="text-era-dark-gray">{campaign.lastActivity}</p>
          </div>
        </div>
      </CardContent>
      
      <div className="p-4 border-t border-era-gray/20 flex space-x-2">
        <Button
          variant="outline"
          className="flex-1 flex items-center justify-center gap-1"
          onClick={() => navigate(`/campaigns/${campaign.id}`)}
        >
          {campaign.status === 'active' ? <PhoneOff size={16} /> : <Phone size={16} />}
          {campaign.status === 'active' ? 'Остановить' : 'Запустить'}
        </Button>
        
        <Button
          className="flex-1 btn-primary"
          onClick={() => navigate(`/campaigns/${campaign.id}`)}
        >
          Детали
        </Button>
      </div>
    </Card>
  );
};

export default Campaigns;
