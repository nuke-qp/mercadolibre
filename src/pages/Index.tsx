import { useState, useMemo } from 'react';
import { SaleData, FilterState, KPIData } from '@/types/sales';
import { mockSalesData } from '@/data/mockData';
import { 
  formatCurrency, 
  formatNumber, 
  groupByMonth, 
  groupByRegion, 
  groupByPaymentMethod, 
  groupByProduct 
} from '@/utils/dataUtils';
import { KPICard } from '@/components/dashboard/KPICard';
import { RevenueChart } from '@/components/dashboard/RevenueChart';
import { StoreChart } from '@/components/dashboard/StoreChart';
import { StoreTypePieChart } from '@/components/dashboard/StoreTypePieChart';
import { BrandChart } from '@/components/dashboard/BrandChart';
import { DashboardFilters } from '@/components/dashboard/DashboardFilters';
import { DollarSign, Package, TrendingUp, ShoppingCart } from 'lucide-react';

const Index = () => {
  const [salesData] = useState<SaleData[]>(mockSalesData);
  const [filters, setFilters] = useState<FilterState>({});

  // Valores únicos para os filtros
  const uniqueValues = useMemo(() => ({
    produtos: [...new Set(salesData.map(s => s.produto))],
    regioes: [...new Set(salesData.map(s => s.regiao))],
    clientes: [...new Set(salesData.map(s => s.cliente))],
    formasPagamento: [...new Set(salesData.map(s => s.formaPagamento))],
  }), [salesData]);

  // Aplicar filtros
  const filteredData = useMemo(() => {
    return salesData.filter(sale => {
      if (filters.dataInicio && sale.data < filters.dataInicio) return false;
      if (filters.dataFim && sale.data > filters.dataFim) return false;
      if (filters.produto && sale.produto !== filters.produto) return false;
      if (filters.regiao && sale.regiao !== filters.regiao) return false;
      if (filters.cliente && sale.cliente !== filters.cliente) return false;
      if (filters.formaPagamento && sale.formaPagamento !== filters.formaPagamento) return false;
      return true;
    });
  }, [salesData, filters]);

  // Calcular KPIs
  const kpis: KPIData = useMemo(() => {
    const faturamentoTotal = filteredData.reduce((sum, sale) => sum + sale.valor, 0);
    const totalVendas = filteredData.length;
    
    return {
      faturamentoTotal,
      quantidadeTotal: totalVendas,
      ticketMedio: totalVendas > 0 ? faturamentoTotal / totalVendas : 0,
      totalVendas,
    };
  }, [filteredData]);

  // Dados dos gráficos
  const revenueByMonth = useMemo(() => groupByMonth(filteredData), [filteredData]);
  const revenueByRegion = useMemo(() => groupByRegion(filteredData), [filteredData]);
  const revenueByPaymentMethod = useMemo(() => groupByPaymentMethod(filteredData), [filteredData]);
  const revenueByProduct = useMemo(() => groupByProduct(filteredData), [filteredData]);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-gradient-to-r from-primary via-yellow-400 to-primary py-8 px-6 shadow-lg">
        <div className="container mx-auto">
          <h1 className="text-4xl font-bold text-primary-foreground mb-2">
            Dashboard MercadoLibre
          </h1>
          <p className="text-primary-foreground/80 text-lg">
            Análise de Vendas e Performance
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        {/* Filtros */}
        <DashboardFilters 
          filters={filters} 
          setFilters={setFilters} 
          uniqueValues={uniqueValues}
        />

        {/* KPIs */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <KPICard
            title="Faturamento Total"
            value={formatCurrency(kpis.faturamentoTotal)}
            icon={DollarSign}
            iconColor="text-secondary"
          />
          <KPICard
            title="Total de Vendas"
            value={formatNumber(kpis.quantidadeTotal)}
            icon={Package}
            iconColor="text-chart-3"
          />
          <KPICard
            title="Ticket Médio"
            value={formatCurrency(kpis.ticketMedio)}
            icon={TrendingUp}
            iconColor="text-chart-4"
          />
          <KPICard
            title="Clientes Únicos"
            value={formatNumber([...new Set(filteredData.map(s => s.cliente))].length)}
            icon={ShoppingCart}
            iconColor="text-chart-5"
          />
        </div>

        {/* Gráficos */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <RevenueChart data={revenueByMonth} />
          <StoreChart data={revenueByRegion} title="Faturamento por Região" />
          <StoreTypePieChart data={revenueByPaymentMethod} title="Faturamento por Forma de Pagamento" />
          <BrandChart data={revenueByProduct} title="Faturamento por Produto" />
        </div>

        {/* Footer Info */}
        <div className="mt-8 p-6 bg-muted rounded-xl">
          <p className="text-sm text-muted-foreground text-center">
            💡 <strong>Dica:</strong> Use os filtros acima para segmentar os dados por período, produto, marca, loja ou categoria. 
            Todos os gráficos e indicadores são atualizados automaticamente.
          </p>
        </div>
      </main>
    </div>
  );
};

export default Index;
