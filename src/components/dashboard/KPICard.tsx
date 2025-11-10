import { Card, CardContent } from '@/components/ui/card';
import { LucideIcon } from 'lucide-react';

interface KPICardProps {
  title: string;
  value: string;
  icon: LucideIcon;
  trend?: string;
  iconColor?: string;
}

export const KPICard = ({ title, value, icon: Icon, trend, iconColor = 'text-primary' }: KPICardProps) => {
  return (
    <Card className="shadow-card hover:shadow-hover transition-all duration-300">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <p className="text-3xl font-bold text-foreground">{value}</p>
            {trend && (
              <p className="text-xs text-muted-foreground">{trend}</p>
            )}
          </div>
          <div className={`p-3 rounded-xl bg-muted ${iconColor}`}>
            <Icon className="w-6 h-6" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
