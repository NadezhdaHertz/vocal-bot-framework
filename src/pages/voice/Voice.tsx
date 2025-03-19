
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Search, MoreVertical, Play, Volume2 } from 'lucide-react';
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
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';

// Mock data
const MY_VOICES = [
  { id: '1', name: 'Анна', gender: 'женский', createdAt: '2023-11-05', sample: '/sample1.mp3' },
  { id: '2', name: 'Михаил', gender: 'мужской', createdAt: '2023-11-10', sample: '/sample2.mp3' },
  { id: '3', name: 'Елена', gender: 'женский', createdAt: '2023-12-01', sample: '/sample3.mp3' },
];

const SYSTEM_VOICES = [
  { id: 's1', name: 'Алексей', gender: 'мужской', sample: '/sample4.mp3' },
  { id: 's2', name: 'Мария', gender: 'женский', sample: '/sample5.mp3' },
  { id: 's3', name: 'Дмитрий', gender: 'мужской', sample: '/sample6.mp3' },
  { id: 's4', name: 'Ольга', gender: 'женский', sample: '/sample7.mp3' },
  { id: 's5', name: 'Иван', gender: 'мужской', sample: '/sample8.mp3' },
];

const Voice: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('my');
  const [searchQuery, setSearchQuery] = useState('');
  
  const filteredMyVoices = MY_VOICES.filter(voice => 
    voice.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const filteredSystemVoices = SYSTEM_VOICES.filter(voice => 
    voice.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  return (
    <div className="max-w-7xl mx-auto">
      <PageHeader 
        title="Голоса"
        description="Управление голосами для ботов"
        action={{
          label: "Создать голос",
          icon: <Plus size={18} />,
          onClick: () => navigate('/voice/create')
        }}
      />
      
      <div className="mb-6">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <div className="flex justify-between items-center">
            <TabsList>
              <TabsTrigger value="my">Мои голоса</TabsTrigger>
              <TabsTrigger value="system">Системные голоса</TabsTrigger>
            </TabsList>
            
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-era-dark-gray" size={18} />
              <Input
                placeholder="Поиск голосов..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-white"
              />
            </div>
          </div>
          
          <TabsContent value="my" className="mt-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredMyVoices.map((voice) => (
                <VoiceCard 
                  key={voice.id} 
                  voice={voice} 
                  canEdit={true} 
                />
              ))}
            </div>
            
            {filteredMyVoices.length === 0 && (
              <div className="text-center p-12 bg-white rounded-lg border border-era-gray/20 shadow-sm">
                <h3 className="text-lg font-medium text-era-dark-gray">Голоса не найдены</h3>
                <p className="text-muted-foreground mt-1">Создайте новый голос</p>
                <Button className="btn-primary mt-4" onClick={() => navigate('/voice/create')}>
                  <Plus size={18} />
                  Создать голос
                </Button>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="system" className="mt-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredSystemVoices.map((voice) => (
                <VoiceCard 
                  key={voice.id} 
                  voice={voice} 
                  canEdit={false} 
                />
              ))}
            </div>
            
            {filteredSystemVoices.length === 0 && (
              <div className="text-center p-12 bg-white rounded-lg border border-era-gray/20 shadow-sm">
                <h3 className="text-lg font-medium text-era-dark-gray">Голоса не найдены</h3>
                <p className="text-muted-foreground mt-1">Попробуйте изменить параметры поиска</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

interface VoiceCardProps {
  voice: {
    id: string;
    name: string;
    gender: string;
    createdAt?: string;
    sample: string;
  };
  canEdit: boolean;
}

const VoiceCard: React.FC<VoiceCardProps> = ({ voice, canEdit }) => {
  const navigate = useNavigate();
  const [isPlaying, setIsPlaying] = useState(false);
  
  const handlePlay = () => {
    // In a real app, we would play the audio sample here
    setIsPlaying(!isPlaying);
    setTimeout(() => setIsPlaying(false), 3000);
  };
  
  return (
    <Card className="h-full flex flex-col hover:border-era-blue/40 group">
      <CardHeader className="flex justify-between items-start">
        <div>
          <h3 
            className={`font-medium text-era-black hover:text-era-blue cursor-pointer ${canEdit ? 'hover:text-era-blue' : ''}`}
            onClick={() => canEdit && navigate(`/voice/${voice.id}`)}
          >
            {voice.name}
          </h3>
          <p className="text-sm text-muted-foreground">
            Голос: {voice.gender}
          </p>
        </div>
        
        {canEdit && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreVertical size={16} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48 bg-white">
              <DropdownMenuItem onClick={() => navigate(`/voice/${voice.id}`)}>
                Редактировать
              </DropdownMenuItem>
              <DropdownMenuItem className="text-destructive">Удалить</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </CardHeader>
      
      <CardContent className="flex-grow">
        {voice.createdAt && (
          <div className="mb-4">
            <p className="text-sm text-muted-foreground">Создан</p>
            <p className="text-era-dark-gray">{voice.createdAt}</p>
          </div>
        )}
        
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="icon"
            className={`h-10 w-10 rounded-full ${isPlaying ? 'bg-era-blue text-white' : ''}`}
            onClick={handlePlay}
          >
            {isPlaying ? <Volume2 size={18} /> : <Play size={18} />}
          </Button>
          <div className="h-2 flex-grow bg-era-gray rounded-full overflow-hidden">
            <div 
              className="h-full bg-era-blue transition-all duration-300"
              style={{ width: isPlaying ? '75%' : '0%' }}
            />
          </div>
        </div>
      </CardContent>
      
      {canEdit && (
        <div className="p-4 border-t border-era-gray/20">
          <Button 
            className="w-full btn-primary"
            onClick={() => navigate(`/voice/${voice.id}`)}
          >
            Использовать голос
          </Button>
        </div>
      )}
    </Card>
  );
};

export default Voice;
