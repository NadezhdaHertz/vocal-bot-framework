
import React, { useState } from 'react';
import { Calendar, ChevronDown, Download, Filter } from 'lucide-react';
import PageHeader from '@/components/common/PageHeader';
import { Card, CardContent, CardHeader } from '@/components/common/Card';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

// Mock data
const DAILY_CALLS = [
  { date: '01.12', all: 120, answered: 78, failed: 42 },
  { date: '02.12', all: 150, answered: 95, failed: 55 },
  { date: '03.12', all: 180, answered: 110, failed: 70 },
  { date: '04.12', all: 200, answered: 135, failed: 65 },
  { date: '05.12', all: 160, answered: 105, failed: 55 },
  { date: '06.12', all: 140, answered: 90, failed: 50 },
  { date: '07.12', all: 190, answered: 125, failed: 65 },
];

const CALL_STATUSES = [
  { name: 'Отвечено', value: 728, color: '#10B981' },
  { name: 'Перезвонить', value: 254, color: '#3B82F6' },
  { name: 'Не отвечено', value: 402, color: '#F59E0B' },
  { name: 'Ошибка', value: 156, color: '#EF4444' },
];

const CONVERSION_DATA = [
  { name: 'Положительный', value: 456, color: '#10B981' },
  { name: 'Нейтральный', value: 324, color: '#3B82F6' },
  { name: 'Отрицательный', value: 212, color: '#EF4444' },
];

const Statistics: React.FC = () => {
  const [selectedBot, setSelectedBot] = useState('all');
  const [period, setPeriod] = useState('week');
  
  return (
    <div className="max-w-7xl mx-auto">
      <PageHeader 
        title="Статистика"
        description="Аналитика работы голосовых ботов"
        action={{
          label: "Выгрузить отчет",
          icon: <Download size={18} />,
          onClick: () => {}
        }}
      />
      
      <div className="flex flex-wrap items-center gap-4 mb-6">
        <div className="bg-white rounded-md flex items-center px-3 border border-era-gray/20">
          <Calendar size={18} className="text-era-dark-gray mr-2" />
          <Select value={period} onValueChange={setPeriod}>
            <SelectTrigger className="border-0 w-auto px-0 flex items-center space-x-1 hover:bg-transparent">
              <SelectValue placeholder="Выберите период" />
              <ChevronDown size={16} />
            </SelectTrigger>
            <SelectContent className="bg-white">
              <SelectItem value="day">За день</SelectItem>
              <SelectItem value="week">За неделю</SelectItem>
              <SelectItem value="month">За месяц</SelectItem>
              <SelectItem value="quarter">За квартал</SelectItem>
              <SelectItem value="year">За год</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="bg-white rounded-md flex items-center px-3 border border-era-gray/20">
          <Filter size={18} className="text-era-dark-gray mr-2" />
          <Select value={selectedBot} onValueChange={setSelectedBot}>
            <SelectTrigger className="border-0 w-auto px-0 flex items-center space-x-1 hover:bg-transparent">
              <SelectValue placeholder="Выберите бота" />
              <ChevronDown size={16} />
            </SelectTrigger>
            <SelectContent className="bg-white">
              <SelectItem value="all">Все боты</SelectItem>
              <SelectItem value="bot1">Голосовой робот консультант</SelectItem>
              <SelectItem value="bot2">Бот для проведения опросов</SelectItem>
              <SelectItem value="bot3">Консультант по техподдержке</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <Button variant="outline" className="ml-auto">
          Дополнительные фильтры
        </Button>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-6">
        <StatCard title="Всего звонков" value="1,540" change="+12.5%" positive />
        <StatCard title="Успешных звонков" value="728" change="+8.3%" positive />
        <StatCard title="Средняя длительность" value="2:45" change="-0:15" />
        <StatCard title="Конверсия" value="47.3%" change="+2.1%" positive />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <Card>
          <CardHeader className="border-b border-era-gray/20">
            <h3 className="font-medium text-era-black">Динамика звонков</h3>
          </CardHeader>
          <CardContent className="p-4 h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={DAILY_CALLS} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white',
                    border: '1px solid #F1F5F9',
                    borderRadius: '6px'
                  }}
                />
                <Bar dataKey="answered" stackId="a" fill="#0EA5E9" />
                <Bar dataKey="failed" stackId="a" fill="#F59E0B" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="border-b border-era-gray/20">
            <h3 className="font-medium text-era-black">Статусы звонков</h3>
          </CardHeader>
          <CardContent className="p-4 h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={CALL_STATUSES}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={90}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {CALL_STATUSES.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white',
                    border: '1px solid #F1F5F9',
                    borderRadius: '6px'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="border-b border-era-gray/20">
            <h3 className="font-medium text-era-black">Результаты разговоров</h3>
          </CardHeader>
          <CardContent className="p-4 h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={CONVERSION_DATA}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={90}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {CONVERSION_DATA.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white',
                    border: '1px solid #F1F5F9',
                    borderRadius: '6px'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="border-b border-era-gray/20">
            <h3 className="font-medium text-era-black">Расходы по проектам</h3>
          </CardHeader>
          <CardContent className="p-4">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-era-gray/20">
                  <th className="py-3 font-medium">Проект</th>
                  <th className="py-3 font-medium">Звонки</th>
                  <th className="py-3 font-medium">Синтез речи</th>
                  <th className="py-3 font-medium">Всего</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-era-gray/20">
                  <td className="py-3">Голосовой робот консультант</td>
                  <td className="py-3">520₽</td>
                  <td className="py-3">320₽</td>
                  <td className="py-3 font-medium">840₽</td>
                </tr>
                <tr className="border-b border-era-gray/20">
                  <td className="py-3">Бот для проведения опросов</td>
                  <td className="py-3">380₽</td>
                  <td className="py-3">250₽</td>
                  <td className="py-3 font-medium">630₽</td>
                </tr>
                <tr className="border-b border-era-gray/20">
                  <td className="py-3">Консультант по техподдержке</td>
                  <td className="py-3">280₽</td>
                  <td className="py-3">190₽</td>
                  <td className="py-3 font-medium">470₽</td>
                </tr>
                <tr>
                  <td className="py-3">Робот для подтверждения заказов</td>
                  <td className="py-3">150₽</td>
                  <td className="py-3">80₽</td>
                  <td className="py-3 font-medium">230₽</td>
                </tr>
              </tbody>
              <tfoot>
                <tr className="border-t border-era-gray">
                  <td className="py-3 font-medium">Итого</td>
                  <td className="py-3 font-medium">1330₽</td>
                  <td className="py-3 font-medium">840₽</td>
                  <td className="py-3 font-medium">2170₽</td>
                </tr>
              </tfoot>
            </table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

interface StatCardProps {
  title: string;
  value: string;
  change: string;
  positive?: boolean;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, change, positive }) => {
  return (
    <Card>
      <CardContent className="p-4">
        <p className="text-muted-foreground text-sm">{title}</p>
        <p className="text-2xl font-medium text-era-black mt-2">{value}</p>
        <p className={`text-sm mt-2 ${positive ? 'text-green-500' : 'text-era-dark-gray'}`}>
          {change}
        </p>
      </CardContent>
    </Card>
  );
};

export default Statistics;
