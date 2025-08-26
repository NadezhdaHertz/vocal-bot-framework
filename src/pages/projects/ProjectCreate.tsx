
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Mic, Upload, PlusCircle, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import { toast } from 'sonner';

const ProjectCreate: React.FC = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [activeTab, setActiveTab] = useState('general');
  
  const [projectData, setProjectData] = useState({
    name: '',
    phoneNumber: '',
    greeting: '',
    prompt: '',
    useRag: false,
    interruptBot: false,
    voice: '',
    ragPrompt: '',
    streamPrompt: '',
    postPrompt: '',
  });
  
  const handleInputChange = (key: keyof typeof projectData, value: string | boolean) => {
    setProjectData(prev => ({ ...prev, [key]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Проект успешно создан');
    navigate('/projects');
  };
  
  const goToPrevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };
  
  const goToNextStep = () => {
    if (currentStep < 3) setCurrentStep(currentStep + 1);
  };
  
  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-6 flex items-center">
        <Button 
          variant="ghost" 
          className="p-2" 
          onClick={() => navigate('/projects')}
        >
          <ChevronLeft size={20} />
        </Button>
        <h1 className="text-2xl font-medium ml-2">Создание голосового бота</h1>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm border border-era-gray/20 overflow-hidden">
        <div className="border-b border-era-gray/20 p-4">
          <div className="flex items-center justify-between mb-6">
            <div className="flex space-x-4">
              <div 
                className={`flex items-center justify-center w-8 h-8 rounded-full ${
                  currentStep >= 1 ? 'bg-era-blue text-white' : 'bg-era-gray text-era-dark-gray'
                }`}
              >
                1
              </div>
              <div 
                className={`flex items-center justify-center w-8 h-8 rounded-full ${
                  currentStep >= 2 ? 'bg-era-blue text-white' : 'bg-era-gray text-era-dark-gray'
                }`}
              >
                2
              </div>
              <div 
                className={`flex items-center justify-center w-8 h-8 rounded-full ${
                  currentStep === 3 ? 'bg-era-blue text-white' : 'bg-era-gray text-era-dark-gray'
                }`}
              >
                3
              </div>
            </div>
            <div className="text-sm text-era-dark-gray">
              Шаг {currentStep} из 3
            </div>
          </div>
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="w-full">
              <TabsTrigger value="general" className="flex-1">Общие настройки</TabsTrigger>
              <TabsTrigger value="prompts" className="flex-1">Промты</TabsTrigger>
              <TabsTrigger value="files" className="flex-1">Файлы для RAG</TabsTrigger>
            </TabsList>
            
            <form onSubmit={handleSubmit}>
              <TabsContent value="general" className="mt-0">
                <div className="p-6 space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Название проекта</Label>
                      <Input
                        id="name"
                        value={projectData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        placeholder="Введите название проекта"
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="phoneNumber">Номер телефона для входящей линии</Label>
                      <Input
                        id="phoneNumber"
                        value={projectData.phoneNumber}
                        onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                        placeholder="+7 (___) ___-__-__"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="greeting">Приветствие</Label>
                    <Textarea
                      id="greeting"
                      value={projectData.greeting}
                      onChange={(e) => handleInputChange('greeting', e.target.value)}
                      placeholder="Введите текст приветствия"
                      rows={3}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="prompt">Промт</Label>
                    <Textarea
                      id="prompt"
                      value={projectData.prompt}
                      onChange={(e) => handleInputChange('prompt', e.target.value)}
                      placeholder="Введите основной промт"
                      rows={5}
                      required
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex items-center justify-between space-x-2">
                      <Label htmlFor="useRag">Использовать RAG</Label>
                      <Switch
                        id="useRag"
                        checked={projectData.useRag}
                        onCheckedChange={(checked) => handleInputChange('useRag', checked)}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between space-x-2">
                      <Label htmlFor="interruptBot">Перебивать бота</Label>
                      <Switch
                        id="interruptBot"
                        checked={projectData.interruptBot}
                        onCheckedChange={(checked) => handleInputChange('interruptBot', checked)}
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="voice">Выбор голоса</Label>
                      <Select
                        value={projectData.voice}
                        onValueChange={(value) => handleInputChange('voice', value)}
                      >
                        <SelectTrigger id="voice">
                          <SelectValue placeholder="Выберите голос" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="voice1">Анна</SelectItem>
                          <SelectItem value="voice2">Михаил</SelectItem>
                          <SelectItem value="voice3">Елена</SelectItem>
                          <SelectItem value="voice4">Александр</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Создать голос</Label>
                      <Button
                        type="button"
                        variant="outline"
                        className="w-full flex items-center justify-center gap-2"
                        onClick={() => navigate('/voice/create')}
                      >
                        <Mic size={18} />
                        Создать новый голос
                      </Button>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="prompts" className="mt-0">
                <div className="p-6 space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="ragPrompt">Промт для RAG</Label>
                    <Textarea
                      id="ragPrompt"
                      value={projectData.ragPrompt}
                      onChange={(e) => handleInputChange('ragPrompt', e.target.value)}
                      placeholder="Введите промт для RAG"
                      rows={5}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="streamPrompt">Промт для потоковой генерации</Label>
                    <Textarea
                      id="streamPrompt"
                      value={projectData.streamPrompt}
                      onChange={(e) => handleInputChange('streamPrompt', e.target.value)}
                      placeholder="Введите промт для потоковой генерации"
                      rows={5}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="postPrompt">Промт для постобработки</Label>
                    <Textarea
                      id="postPrompt"
                      value={projectData.postPrompt}
                      onChange={(e) => handleInputChange('postPrompt', e.target.value)}
                      placeholder="Введите промт для постобработки"
                      rows={5}
                    />
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="files" className="mt-0">
                <div className="p-6 space-y-6">
                  <div className="border-2 border-dashed border-era-gray rounded-lg p-6 text-center">
                    <div className="flex flex-col items-center justify-center">
                      <Upload className="text-era-dark-gray mb-2" size={32} />
                      <h3 className="font-medium text-era-black">Перетащите файлы сюда</h3>
                      <p className="text-sm text-era-dark-gray mb-4">или</p>
                      <Button type="button" className="btn-primary">
                        Выбрать файлы
                      </Button>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label>Добавить информацию вручную</Label>
                      <Button
                        type="button"
                        variant="outline"
                        className="flex items-center gap-1 text-era-blue"
                      >
                        <PlusCircle size={16} />
                        Добавить документ
                      </Button>
                    </div>
                    
                    <div className="border border-era-gray rounded-lg p-4 space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="fileName">Имя файла</Label>
                        <Input id="fileName" placeholder="Введите имя файла" />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="fileContent">Текст</Label>
                        <Textarea
                          id="fileContent"
                          placeholder="Введите текст документа"
                          rows={5}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <div className="flex items-center justify-between p-6 border-t border-era-gray/20">
                <Button
                  type="button"
                  variant="outline"
                  onClick={goToPrevStep}
                  disabled={currentStep === 1}
                >
                  Назад
                </Button>
                
                {currentStep < 3 ? (
                  <Button type="button" className="btn-primary" onClick={goToNextStep}>
                    Далее
                  </Button>
                ) : (
                  <Button type="submit" className="btn-primary">
                    <Save size={18} />
                    Сохранить
                  </Button>
                )}
              </div>
            </form>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default ProjectCreate;
