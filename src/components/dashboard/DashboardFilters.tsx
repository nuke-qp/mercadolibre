import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon, Filter, X } from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { FilterState } from '@/types/sales';
import { cn } from '@/lib/utils';

interface DashboardFiltersProps {
  filters: FilterState;
  setFilters: (filters: FilterState) => void;
  uniqueValues: {
    produtos: string[];
    regioes: string[];
    clientes: string[];
    formasPagamento: string[];
  };
}

export const DashboardFilters = ({ filters, setFilters, uniqueValues }: DashboardFiltersProps) => {
  const hasActiveFilters = Object.values(filters).some(v => v !== undefined);

  const clearFilters = () => {
    setFilters({});
  };

  return (
    <Card className="shadow-card mb-6">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-primary" />
            <h3 className="text-lg font-semibold">Filtros</h3>
          </div>
          {hasActiveFilters && (
            <Button variant="outline" size="sm" onClick={clearFilters}>
              <X className="w-4 h-4 mr-2" />
              Limpar Filtros
            </Button>
          )}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          {/* Data Início */}
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "justify-start text-left font-normal",
                  !filters.dataInicio && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {filters.dataInicio ? format(filters.dataInicio, "PPP", { locale: ptBR }) : "Data Início"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={filters.dataInicio}
                onSelect={(date) => setFilters({ ...filters, dataInicio: date })}
                initialFocus
              />
            </PopoverContent>
          </Popover>

          {/* Data Fim */}
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "justify-start text-left font-normal",
                  !filters.dataFim && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {filters.dataFim ? format(filters.dataFim, "PPP", { locale: ptBR }) : "Data Fim"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={filters.dataFim}
                onSelect={(date) => setFilters({ ...filters, dataFim: date })}
                initialFocus
              />
            </PopoverContent>
          </Popover>

          {/* Produto */}
          <Select value={filters.produto} onValueChange={(value) => setFilters({ ...filters, produto: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Produto" />
            </SelectTrigger>
            <SelectContent>
              {uniqueValues.produtos.map((produto) => (
                <SelectItem key={produto} value={produto}>
                  {produto}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Região */}
          <Select value={filters.regiao} onValueChange={(value) => setFilters({ ...filters, regiao: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Região" />
            </SelectTrigger>
            <SelectContent>
              {uniqueValues.regioes.map((regiao) => (
                <SelectItem key={regiao} value={regiao}>
                  {regiao}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Cliente */}
          <Select value={filters.cliente} onValueChange={(value) => setFilters({ ...filters, cliente: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Cliente" />
            </SelectTrigger>
            <SelectContent>
              {uniqueValues.clientes.map((cliente) => (
                <SelectItem key={cliente} value={cliente}>
                  {cliente}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Forma de Pagamento */}
          <Select value={filters.formaPagamento} onValueChange={(value) => setFilters({ ...filters, formaPagamento: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Forma de Pagamento" />
            </SelectTrigger>
            <SelectContent>
              {uniqueValues.formasPagamento.map((forma) => (
                <SelectItem key={forma} value={forma}>
                  {forma}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
};
