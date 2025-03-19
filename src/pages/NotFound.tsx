
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

const NotFound: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-era-gray">
      <div className="text-center max-w-md p-8 bg-white rounded-lg shadow-sm border border-era-gray/20">
        <h1 className="text-4xl font-medium text-era-black mb-4">404</h1>
        <p className="text-xl text-era-dark-gray mb-6">
          Страница не найдена
        </p>
        <Button 
          className="btn-primary" 
          onClick={() => navigate('/')}
        >
          <ArrowLeft size={18} />
          Вернуться на главную
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
