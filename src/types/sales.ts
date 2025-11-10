export interface SaleData {
  skuVendido: string;
  qtdVendida: number;
  produto: string;
  marca: string;
  categoria: string;
  precoUnitario: number;
  faturamento: number;
  loja: string;
  dataVenda: Date;
  tipoLoja: 'Loja Física' | 'Online';
  codigoCliente: number;
}

export interface FilterState {
  dataInicio?: Date;
  dataFim?: Date;
  produto?: string;
  marca?: string;
  loja?: string;
  categoria?: string;
}

export interface KPIData {
  faturamentoTotal: number;
  quantidadeTotal: number;
  ticketMedio: number;
  totalVendas: number;
}
