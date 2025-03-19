
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import PageHeader from '@/components/common/PageHeader';

const CampaignDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <div className="max-w-7xl mx-auto">
      <PageHeader 
        title={`Кампания ${id}`}
        description="Детальная информация о кампании"
        action={{
          label: "Назад",
          icon: <ArrowLeft size={18} />,
          onClick: () => navigate('/campaigns')
        }}
      />
      
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <p className="text-era-dark-gray">
          Детальная страница кампании будет реализована позже.
        </p>
      </div>
    </div>
  );
};

export default CampaignDetail;
