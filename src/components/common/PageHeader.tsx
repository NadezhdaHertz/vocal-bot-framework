
import React from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface PageHeaderProps {
  title: string;
  description?: string;
  action?: {
    label: string;
    icon?: React.ReactNode;
    onClick: () => void;
  };
  className?: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  description,
  action,
  className,
}) => {
  return (
    <div className={cn("mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4", className)}>
      <div>
        <h1 className="text-2xl font-medium text-foreground">{title}</h1>
        {description && (
          <p className="mt-1 text-muted-foreground">{description}</p>
        )}
      </div>
      
      {action && (
        <Button onClick={action.onClick} className="btn-primary shrink-0 rounded-full">
          {action.icon}
          {action.label}
        </Button>
      )}
    </div>
  );
};

export default PageHeader;
