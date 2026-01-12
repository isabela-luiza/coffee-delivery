# Coffee Delivery

## Sobre o Projeto
Coffee Delivery é uma aplicação web completa de e-commerce para delivery de cafés especiais. O projeto simula um sistema real de pedidos online, permitindo que usuários naveguem por um catálogo de cafés, adicionem produtos ao carrinho, preencham dados de entrega e finalizem a compra.

A aplicação foi desenvolvida como projeto de estudos para praticar conceitos modernos de desenvolvimento web com React/Next.js, focando em gerenciamento de estado, validação de formulários, persistência de dados e criação de interfaces responsivas.

## Funcionalidades

- **Catálogo de Produtos**: Navegação por diversos tipos de cafés com imagens, descrições e preços
- **Carrinho de Compras**: 
  - Adicionar produtos com quantidades personalizadas
  - Aumentar/diminuir quantidades
  - Remover itens
  - Visualizar total e subtotais
  - Persistência dos dados no localStorage
- **Seleção de Cidade**: Escolha da cidade de entrega com persistência da preferência
- **Formulário de Checkout**: 
  - Validação completa de endereço (CEP, rua, número, bairro, cidade, UF)
  - Formatação automática de CEP
  - Seleção de forma de pagamento
- **Página de Sucesso**: Confirmação do pedido com resumo completo
- **Indicador de Carrinho**: Badge mostrando quantidade total de itens
- **Design Responsivo**: Interface adaptável para desktop, tablet e mobile

## Tecnologias Utilizadas

### Core
- **Next.js** - Framework React com App Router
- **TypeScript** - Tipagem estática para maior segurança
- **React** - Biblioteca para construção de interfaces

### Gerenciamento de Estado
- **Context API** - Gerenciamento global do carrinho de compras
- **React Hooks** - useState, useEffect, useContext

### Formulários e Validação
- **React Hook Form** - Gerenciamento eficiente de formulários
- **Zod** - Validação de schema com TypeScript
- **@hookform/resolvers** - Integração entre React Hook Form e Zod

### Estilização
- **Tailwind CSS** - Framework CSS utility-first
- **React Icons** - Biblioteca de ícones (Fa, Pi, Ci)

### Armazenamento
- **localStorage** - Persistência de carrinho e preferências do usuário

## Conceitos de Estudo Aplicados

### 1. **Context API & Gerenciamento de Estado Global**
- Criação de um Context para compartilhar o estado do carrinho entre componentes
- Implementação de Provider customizado
- Hook personalizado (`useCart`) para facilitar o acesso ao contexto
- Cálculo de valores derivados (quantidade total de itens)

### 2. **React Hooks**
- **useState**: Gerenciamento de estados locais (quantidade, dropdown aberto/fechado)
- **useEffect**: Side effects como carregar dados do localStorage
- **useContext**: Consumo de contextos globais
- **Custom Hooks**: Criação do hook `useCart`

### 3. **Validação de Formulários**
- Schema de validação com Zod
- Integração com React Hook Form
- Validação em tempo real
- Mensagens de erro customizadas
- Regex para validação de CEP

### 4. **Persistência de Dados**
- Salvamento automático do carrinho no localStorage
- Recuperação de dados ao recarregar a página
- Sincronização entre estado e localStorage
- Limpeza de dados após finalização do pedido

### 5. **Roteamento e Navegação**
- Next.js App Router (arquitetura baseada em pastas)
- Navegação programática com `useRouter`
- Rotas dinâmicas e estáticas
- Links otimizados com componente `Link`

### 6. **TypeScript**
- Tipagem de componentes e props
- Interfaces e tipos customizados
- Type inference com Zod (`z.infer`)
- Tipagem de funções e hooks

### 7. **Componentização**
- Separação de responsabilidades
- Componentes reutilizáveis 
- Props e composition
- Componentes controlados vs não-controlados

### 8. **Performance e Otimização**
- Carregamento condicional de componentes
- Memoização implícita do Next.js
- Lazy loading de imagens com `next/image`
- Evitar re-renders desnecessários

### 9. **UX/UI**
- Feedback visual (estados hover, active, disabled)
- Loading states
- Estados vazios (carrinho vazio)
- Design responsivo com Tailwind
- Acessibilidade (aria-labels)

### 10. **Boas Práticas**
- Código limpo e comentado
- Nomenclatura semântica
- Separação de lógica e apresentação
- Tratamento de edge cases
- Validação de dados do usuário

## Estrutura do Projeto

coffee-delivery/
├── app/
│   ├── cart/
│   │   └── page.tsx          # Página do carrinho
│   ├── success/
│   │   └── page.tsx          # Página de sucesso
│   └── page.tsx              # Página inicial
├── components/
│   ├── Header.tsx            # Cabeçalho com carrinho e seletor de cidade
│   ├── Hero.tsx              # Seção hero da página inicial
│   └── CoffeCard.tsx         # Card de produto
├── contexts/
│   └── CartContext.tsx       # Context API do carrinho
├── data/
│   └── coffes.ts             # Dados dos produtos
└── public/
    └── images/               # Imagens dos cafés

## Objetivos de Aprendizado Alcançados

- Domínio de React Hooks e Context API
- Implementação de formulários complexos com validação
- Gerenciamento de estado global
- Persistência de dados no navegador
- Criação de interfaces responsivas
- Tipagem estática com TypeScript
- Navegação entre páginas com Next.js
- Componentização e reutilização de código
- Aplicação de padrões de design
- Desenvolvimento de fluxo completo de e-commerce


## Créditos
O design e a ideia base deste projeto foram inspirados no desafio **Coffee Delivery** da [Rocketseat](https://www.rocketseat.com.br/). 

**Funcionalidades adicionais implementadas:**
- Persistência do carrinho com localStorage
- Seletor de cidades com salvamento de preferência
- Página de sucesso com resumo detalhado do pedido
- Validação avançada de formulários com Zod
- Cálculo automático de totais e subtotais
- Sistema completo de gerenciamento de carrinho
- Responsividade aprimorada

## Autor
Desenvolvido como projeto de estudos para aprimorar habilidades em desenvolvimento web moderno, expandindo o conceito original com funcionalidades próprias.

