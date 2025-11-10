import { SaleData } from '@/types/sales';

// Converte número serial do Excel para Date
export const excelSerialToDate = (serial: number): Date => {
  const utcDays = Math.floor(serial - 25569);
  const utcValue = utcDays * 86400;
  const dateInfo = new Date(utcValue * 1000);
  return new Date(dateInfo.getFullYear(), dateInfo.getMonth(), dateInfo.getDate());
};

// Formata moeda em Real
export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
};

// Formata número inteiro
export const formatNumber = (value: number): string => {
  return new Intl.NumberFormat('pt-BR').format(value);
};

// Agrupa vendas por mês
export const groupByMonth = (sales: SaleData[]) => {
  const grouped = sales.reduce((acc, sale) => {
    const monthYear = new Intl.DateTimeFormat('pt-BR', { 
      year: 'numeric', 
      month: 'short' 
    }).format(sale.data);
    
    if (!acc[monthYear]) {
      acc[monthYear] = 0;
    }
    acc[monthYear] += sale.valor;
    return acc;
  }, {} as Record<string, number>);

  return Object.entries(grouped)
    .map(([month, value]) => ({ month, value }))
    .sort((a, b) => {
      const dateA = new Date(a.month);
      const dateB = new Date(b.month);
      return dateA.getTime() - dateB.getTime();
    });
};

// Agrupa vendas por região
export const groupByRegion = (sales: SaleData[]) => {
  const grouped = sales.reduce((acc, sale) => {
    if (!acc[sale.regiao]) {
      acc[sale.regiao] = 0;
    }
    acc[sale.regiao] += sale.valor;
    return acc;
  }, {} as Record<string, number>);

  return Object.entries(grouped)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value);
};

// Agrupa vendas por forma de pagamento
export const groupByPaymentMethod = (sales: SaleData[]) => {
  const grouped = sales.reduce((acc, sale) => {
    if (!acc[sale.formaPagamento]) {
      acc[sale.formaPagamento] = 0;
    }
    acc[sale.formaPagamento] += sale.valor;
    return acc;
  }, {} as Record<string, number>);

  return Object.entries(grouped).map(([name, value]) => ({ name, value }));
};

// Agrupa vendas por produto
export const groupByProduct = (sales: SaleData[]) => {
  const grouped = sales.reduce((acc, sale) => {
    if (!acc[sale.produto]) {
      acc[sale.produto] = 0;
    }
    acc[sale.produto] += sale.valor;
    return acc;
  }, {} as Record<string, number>);

  return Object.entries(grouped)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value);
};
