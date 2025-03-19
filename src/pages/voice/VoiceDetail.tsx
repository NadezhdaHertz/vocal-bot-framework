
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import PageHeader from '@/components/common/PageHeader';

const VoiceDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <div className="max-w-7xl mx-auto">
      <PageHeader 
        title={`Голос ${id}`}
        description="Детальная информация о голосе"
        action={{
          label: "Назад",
          icon: <ArrowLeft size={18} />,
          onClick: () => navigate('/voice')
        }}
      />
      
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <p className="text-era-dark-gray">
          Детальная страница голоса будет реализована позже.
        </p>
      </div>
    </div>
  );
};

export default VoiceDetail;
