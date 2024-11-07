This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Inicialização

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Estrutura 

src/
├── app/
│   ├── login/                   # Página de autenticação
│   │   └── page.tsx             # Componente da página de login
│   ├── dashboard/               # Tela principal após login
│   │   └── page.tsx             # Componente da página do dashboard
│   └── layout.tsx               # Layout principal do Next.js para configuração global
|── assets/
│   ├── fonts/                   # Fontes do projeto
├── components/
│   ├── Auth/                    # Componentes relacionados à autenticação
│   ├── BackendControls/         # Botões e inputs para interação com as rotas do backend
│   ├── ResponseDisplay/         # Componentes para exibir as respostas do backend
│   └── UI/                      # Componentes de UI genéricos (botões, inputs, layouts, etc.)
├── contexts/
│   └── AuthContext.tsx          # Contexto para gerenciar o estado de autenticação
├── hooks/
│   └── useFetchBackend.ts       # Hook para fazer as requisições ao backend
├── services/
│   └── api.ts                   # Configuração do Axios para requisições ao backend
└── styles/
    └── globals.css              # Estilos globais incluindo Tailwind CSS

