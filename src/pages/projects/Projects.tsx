
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Search, MoreVertical } from 'lucide-react';
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
const MOCK_PROJECTS = [
  { id: '1', name: 'Голосовой робот консультант', phoneNumber: '+7 (900) 123-45-67', createdAt: '2023-10-15' },
  { id: '2', name: 'Бот для проведения опросов', phoneNumber: '+7 (900) 987-65-43', createdAt: '2023-11-02' },
  { id: '3', name: 'Консультант по техподдержке', phoneNumber: '+7 (900) 555-33-22', createdAt: '2023-12-05' },
  { id: '4', name: 'Робот для подтверждения заказов', phoneNumber: '+7 (900) 111-22-33', createdAt: '2023-12-12' },
];

const Projects: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  
  const filteredProjects = MOCK_PROJECTS.filter(project => 
    project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    project.phoneNumber.includes(searchQuery)
  );
  
  return (
    <div className="max-w-7xl mx-auto">
      <PageHeader 
        title="Проекты"
        description="Управление голосовыми ботами"
        action={{
          label: "Создать бота",
          icon: <Plus size={18} />,
          onClick: () => navigate('/projects/create')
        }}
      />
      
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-era-dark-gray" size={18} />
          <Input
            placeholder="Поиск проектов..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-white"
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
      
      {filteredProjects.length === 0 && (
        <div className="text-center p-12 bg-white rounded-lg border border-era-gray/20 shadow-sm">
          <h3 className="text-lg font-medium text-era-dark-gray">Проекты не найдены</h3>
          <p className="text-muted-foreground mt-1">Создайте новый голосовой бот</p>
          <Button className="btn-primary mt-4" onClick={() => navigate('/projects/create')}>
            <Plus size={18} />
            Создать бота
          </Button>
        </div>
      )}
    </div>
  );
};

interface ProjectCardProps {
  project: {
    id: string;
    name: string;
    phoneNumber: string;
    createdAt: string;
  };
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const navigate = useNavigate();
  
  return (
    <Card className="h-full flex flex-col hover:border-era-blue/40 group">
      <CardHeader className="flex justify-between items-start">
        <h3 
          className="font-medium text-era-black hover:text-era-blue cursor-pointer truncate"
          onClick={() => navigate(`/projects/${project.id}`)}
        >
          {project.name}
        </h3>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <MoreVertical size={16} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48 bg-white">
            <DropdownMenuItem onClick={() => navigate(`/projects/${project.id}`)}>
              Редактировать
            </DropdownMenuItem>
            <DropdownMenuItem>Дублировать</DropdownMenuItem>
            <DropdownMenuItem className="text-destructive">Удалить</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
      
      <CardContent className="flex-grow">
        <div className="space-y-2">
          <div>
            <p className="text-sm text-muted-foreground">Номер телефона</p>
            <p className="text-era-dark-gray">{project.phoneNumber}</p>
          </div>
          
          <div>
            <p className="text-sm text-muted-foreground">Создан</p>
            <p className="text-era-dark-gray">{project.createdAt}</p>
          </div>
        </div>
      </CardContent>
      
      <div className="p-4 border-t border-era-gray/20 transition-opacity group-hover:opacity-100 opacity-0">
        <Button 
          variant="ghost" 
          className="w-full text-era-blue hover:text-era-blue hover:bg-era-blue/10"
          onClick={() => navigate(`/projects/${project.id}`)}
        >
          Открыть проект
        </Button>
      </div>
    </Card>
  );
};

export default Projects;
