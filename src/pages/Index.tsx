import { useState, useMemo } from 'react';
import { SaleData, FilterState, KPIData } from '@/types/sales';
import { mockSalesData } from '@/data/mockData';
import { 
  formatCurrency, 
  formatNumber, 
  groupByMonth, 
  groupByStore, 
  groupByStoreType, 
  groupByBrand 
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
    marcas: [...new Set(salesData.map(s => s.marca))],
    lojas: [...new Set(salesData.map(s => s.loja))],
    categorias: [...new Set(salesData.map(s => s.categoria))],
  }), [salesData]);

  // Aplicar filtros
  const filteredData = useMemo(() => {
    return salesData.filter(sale => {
      if (filters.dataInicio && sale.dataVenda < filters.dataInicio) return false;
      if (filters.dataFim && sale.dataVenda > filters.dataFim) return false;
      if (filters.produto && sale.produto !== filters.produto) return false;
      if (filters.marca && sale.marca !== filters.marca) return false;
      if (filters.loja && sale.loja !== filters.loja) return false;
      if (filters.categoria && sale.categoria !== filters.categoria) return false;
      return true;
    });
  }, [salesData, filters]);

  // Calcular KPIs
  const kpis: KPIData = useMemo(() => {
    const faturamentoTotal = filteredData.reduce((sum, sale) => sum + sale.faturamento, 0);
    const quantidadeTotal = filteredData.reduce((sum, sale) => sum + sale.qtdVendida, 0);
    
    return {
      faturamentoTotal,
      quantidadeTotal,
      ticketMedio: quantidadeTotal > 0 ? faturamentoTotal / quantidadeTotal : 0,
      totalVendas: filteredData.length,
    };
  }, [filteredData]);

  // Dados dos gráficos
  const revenueByMonth = useMemo(() => groupByMonth(filteredData), [filteredData]);
  const revenueByStore = useMemo(() => groupByStore(filteredData), [filteredData]);
  const revenueByStoreType = useMemo(() => groupByStoreType(filteredData), [filteredData]);
  const quantityByBrand = useMemo(() => groupByBrand(filteredData), [filteredData]);

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
            title="Quantidade Vendida"
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
            title="Total de Vendas"
            value={formatNumber(kpis.totalVendas)}
            icon={ShoppingCart}
            iconColor="text-chart-5"
          />
        </div>

        {/* Gráficos */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <RevenueChart data={revenueByMonth} />
          <StoreChart data={revenueByStore} />
          <StoreTypePieChart data={revenueByStoreType} />
          <BrandChart data={quantityByBrand} />
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
