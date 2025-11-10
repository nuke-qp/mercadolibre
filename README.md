# Dashboard de Vendas - MercadoLivre

Este é um painel de visualização de dados (dashboard) interativo, construído para analisar os dados de vendas da planilha `Exercicio_Dashboard_Excel.xlsx`. O projeto foca em apresentar métricas de performance de vendas de forma clara e intuitiva, utilizando tecnologias web modernas.

## 🚀 Tecnologias Utilizadas

Este projeto foi construído com as seguintes tecnologias:

* **React** (v18)
* **TypeScript**
* **Vite** (Como bundler e servidor de desenvolvimento)
* **Tailwind CSS** (Para estilização)
* **shadcn/ui** (Para os componentes de UI, como cartões, botões e filtros)
* **Recharts** (Para a criação dos gráficos interativos)

## 📊 Funcionalidades do Dashboard

O painel é carregado com dados estáticos (mock data) baseados na planilha `Exercicio_Dashboard_Excel.xlsx` e apresenta as seguintes visualizações:

* **KPIs Principais**: Exibição de métricas-chave como Faturamento Total, Total de Vendas e Ticket Médio.
* **Gráfico de Receita por Mês**: Um gráfico de linhas que mostra a evolução do faturamento ao longo dos meses.
* **Gráfico de Vendas por Região**: Um gráfico de barras que compara o faturamento total entre as diferentes regiões.
* **Gráfico por Forma de Pagamento**: Um gráfico de pizza que mostra a distribuição do faturamento por forma de pagamento (ex: PIX, Boleto, Cartão).
* **Gráfico de Vendas por Produto**: Detalha o faturamento para cada produto (Produto A, Produto B, etc.).
* **Filtros Interativos**: Permite a filtragem dos dados por data, produto, região e cliente.

## 📁 Estrutura da Base de Dados

O dashboard foi modelado para analisar os dados da aba `Base` da planilha `Exercicio_Dashboard_Excel.xlsx`, que possui a seguinte estrutura:

* `Data` (Data da venda)
* `Cliente` (Nome do cliente)
* `Região` (Região da venda, ex: Sudeste, Sul)
* `Produto` (Nome do produto, ex: Produto A)
* `Valor` (Valor total da venda)
* `Forma de Pagamento` (ex: PIX, Boleto)

*(Nota: Os dados estão carregados estaticamente em `src/data/mockData.ts` para fins de demonstração.)*

## 💿 Como Executar Localmente

Siga os passos abaixo para executar o projeto na sua máquina.

1.  **Clone o repositório:**
    ```bash
    git clone https://github.com/Ma2903/mercadolibre.git
    cd mercadolibre-sales-viz
    ```

2.  **Instale as dependências** (use `npm`, `yarn` ou `bun`):
    ```bash
    # Usando bun
    bun install
    
    # Ou usando npm
    npm install
    ```

3.  **Execute o servidor de desenvolvimento:**
    ```bash
    # Usando bun
    bun run dev
    
    # Ou usando npm
    npm run dev
    ```

4.  Abra o seu navegador e acesse `http://localhost:5173` (ou a porta indicada no seu terminal).
