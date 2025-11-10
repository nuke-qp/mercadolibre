export interface SaleData {
  data: Date;
  cliente: string;
  regiao: string;
  produto: string;
  valor: number;
  formaPagamento: string;
}

export interface FilterState {
  dataInicio?: Date;
  dataFim?: Date;
  produto?: string;
  regiao?: string;
  cliente?: string;
  formaPagamento?: string;
}

export interface KPIData {
  faturamentoTotal: number;
  quantidadeTotal: number;
  ticketMedio: number;
  totalVendas: number;
}
