import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { formatCurrency } from '@/utils/dataUtils';

interface StoreChartProps {
  data: Array<{ name: string; value: number }>;
}

export const StoreChart = ({ data }: StoreChartProps) => {
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-card border border-border p-3 rounded-lg shadow-lg">
          <p className="text-sm font-medium">{payload[0].payload.name}</p>
          <p className="text-sm font-bold text-primary">
            {formatCurrency(payload[0].value)}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="shadow-card col-span-full lg:col-span-2">
      <CardHeader>
        <CardTitle className="text-xl font-bold">Faturamento por Loja</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={data} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
            <XAxis 
              type="number" 
              className="text-xs"
              tick={{ fill: 'hsl(var(--muted-foreground))' }}
              tickFormatter={(value) => `R$ ${(value / 1000).toFixed(0)}k`}
            />
            <YAxis 
              type="category" 
              dataKey="name" 
              className="text-xs"
              tick={{ fill: 'hsl(var(--muted-foreground))' }}
              width={100}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Bar 
              dataKey="value" 
              name="Faturamento"
              fill="hsl(var(--primary))" 
              radius={[0, 8, 8, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};
