import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { formatCurrency } from '@/utils/dataUtils';

interface RevenueChartProps {
  data: Array<{ month: string; value: number }>;
  chartType?: 'line' | 'bar';
}

export const RevenueChart = ({ data, chartType = 'bar' }: RevenueChartProps) => {
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-card border border-border p-3 rounded-lg shadow-lg">
          <p className="text-sm font-medium">{payload[0].payload.month}</p>
          <p className="text-sm font-bold text-secondary">
            {formatCurrency(payload[0].value)}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="shadow-card col-span-full">
      <CardHeader>
        <CardTitle className="text-xl font-bold">Faturamento por Mês</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={350}>
          {chartType === 'line' ? (
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
              <XAxis 
                dataKey="month" 
                className="text-xs"
                tick={{ fill: 'hsl(var(--muted-foreground))' }}
              />
              <YAxis 
                className="text-xs"
                tick={{ fill: 'hsl(var(--muted-foreground))' }}
                tickFormatter={(value) => `R$ ${(value / 1000).toFixed(0)}k`}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="value" 
                name="Faturamento"
                stroke="hsl(var(--secondary))" 
                strokeWidth={3}
                dot={{ fill: 'hsl(var(--secondary))', r: 5 }}
                activeDot={{ r: 7 }}
              />
            </LineChart>
          ) : (
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
              <XAxis 
                dataKey="month" 
                className="text-xs"
                tick={{ fill: 'hsl(var(--muted-foreground))' }}
              />
              <YAxis 
                className="text-xs"
                tick={{ fill: 'hsl(var(--muted-foreground))' }}
                tickFormatter={(value) => `R$ ${(value / 1000).toFixed(0)}k`}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Bar 
                dataKey="value" 
                name="Faturamento"
                fill="hsl(var(--secondary))" 
                radius={[8, 8, 0, 0]}
              />
            </BarChart>
          )}
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};
