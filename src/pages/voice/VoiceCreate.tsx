
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import PageHeader from '@/components/common/PageHeader';

const VoiceCreate: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-7xl mx-auto">
      <PageHeader 
        title="Создать голос"
        description="Создание нового голоса"
        action={{
          label: "Назад",
          icon: <ArrowLeft size={18} />,
          onClick: () => navigate('/voice')
        }}
      />
      
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <p className="text-era-dark-gray">
          Форма создания голоса будет реализована позже.
        </p>
      </div>
    </div>
  );
};

export default VoiceCreate;
