# Documentação - Portal Multi-Routing

## 📋 Visão Geral

Portal Multi-Routing é uma aplicação Next.js que utiliza **multi-hosting** (múltiplos domínios) com roteamento dinâmico, temas customizáveis e geração estática incremental (ISR).

---

## 🎨 1. Sistema de Temas com shadcn e ThemeWrapper

### O que é ThemeWrapper?

O `ThemeWrapper` é um componente que aplica temas dinâmicos usando CSS custom properties (variáveis CSS). Ele recebe um objeto de configuração de cores e as injeta como variáveis no DOM.

**Localização:** [components/templates/ThemeWrapper.tsx](components/templates/ThemeWrapper.tsx)

### Estrutura de Tema

```typescript
interface ThemeConfig {
  primary: string;
  primaryForeground: string;
  secondary: string;
  secondaryForeground: string;
  background: string;
  foreground: string;
  card: string;
  cardForeground: string;
  muted: string;
  mutedForeground: string;
  accent: string;
  accentForeground: string;
  destructive: string;
  destructiveForeground: string;
  border: string;
  input: string;
  ring: string;
}
```

### Como Usar no Layout Dinâmico

No [app/band/[...slug]/layout.tsx](app/band/[...slug]/layout.tsx):

```typescript
const data = await getPageData(slug.join('/'));

return <ThemeWrapper theme={data.metadata.theme}>{children}</ThemeWrapper>;
```

O tema vem do backend (via `getPageData`) e é aplicado dinamicamente a todas as páginas filhas.

### Integração com shadcn

O shadcn utiliza as mesmas variáveis CSS definidas pelo ThemeWrapper. Isso significa que todos os componentes shadcn (Button, Card, etc.) herdam automaticamente o tema.

**Arquivo base:** [styles/shadcn-base.css](styles/shadcn-base.css)

### CSS Customizado por Editoria

Você pode sobrescrever estilos em editorias específicas criando arquivos CSS locais:

**Exemplo - Página de Cidades:**

- [app/band/cidades/page.tsx](app/band/cidades/page.tsx) importa `cidades.css`
- [app/band/cidades/cidades.css](app/band/cidades/cidades.css) define estilos locais

```typescript
// app/band/cidades/page.tsx
import './cidades.css';

export default async function Page() {
  // Estilos de cidades.css sobrescrevem o tema global
}
```

**Vantagens:**

- ✅ Cada editoria pode ter aparência única
- ✅ Mantém o tema base do shadcn
- ✅ Simples e previsível

---

## 🔄 2. Sistema de Roteamento Multi-Host com proxy.ts

### O que é proxy.ts?

O `proxy.ts` é um **middleware Next.js** que intercepta requisições e redireciona URLs com base no domínio (hostname).

**Localização:** [proxy.ts](proxy.ts)

### Como Funciona

```typescript
export function proxy(request: NextRequest) {
  const url = request.nextUrl;
  const hostname = request.headers.get('host');

  // Recipes (receitas)
  if (hostname === process.env.NEXT_PUBLIC_RECIPES_HOSTNAME) {
    url.pathname = `/band-receitas${url.pathname}`;
    return NextResponse.rewrite(url);
  }

  // Portal principal
  if (hostname === process.env.NEXT_PUBLIC_PORTAL_HOSTNAME) {
    url.pathname = `/band${url.pathname}`;
    return NextResponse.rewrite(url);
  }
}
```

### Configuração de Domínios

No `.env.local`:

```env
NEXT_PUBLIC_PORTAL_HOSTNAME=portal.example.com
NEXT_PUBLIC_RECIPES_HOSTNAME=receitas.example.com
```

### Fluxo de Requisição

1. Usuário acessa `receitas.example.com/categoria/sobremesa`
2. Middleware intercepta a requisição
3. URL é reescrita para `/band-receitas/categoria/sobremesa`
4. A rota [app/band-receitas/...slug/page.tsx](app/band-receitas/[...slug]/page.tsx) processa
5. Resposta é enviada ao usuário (URL original permanece na barra)

### Matcher Config

```typescript
matcher: ['/((?!_next/static|_next/image|favicon.ico|api).*)'];
```

Ignora assets estáticos e rotas de API, processando apenas rotas de página.

---

## ⚡ 3. Geração Estática Incremental (ISR) com Revalidate

### O que é ISR?

ISR permite gerar páginas estáticas que são automaticamente revalidadas em intervalos específicos, combinando os benefícios de SSG (Static Site Generation) e SSR (Server-Side Rendering).

**Localização:** [services/api.ts](services/api.ts)

### Implementação

```typescript
export async function getPageData(path: string) {
  const response = await fetch(
    `${process.env.SERVER_BASE_URL}/api/content?path=${path}`,
    { next: { revalidate: 60 } } // ⚡ Revalida a cada 60 segundos
  );

  if (!response.ok) return null;
  const json = await response.json();
  return json.data;
}
```

### Como Funciona

1. **Primeira requisição:** Página é gerada e cacheada
2. **Requisições seguintes (< 60s):** Serve página cacheada
3. **Após 60 segundos:**
   - Próxima requisição dispara revalidação em background
   - Página cacheada é servida enquanto nova versão é gerada
   - Nova versão substitui a cacheada

### Diagrama Timeline

```
t=0s   → Requisição 1: Gera página + cacheia
t=10s  → Requisição 2: Serve do cache
t=30s  → Requisição 3: Serve do cache
t=65s  → Requisição 4: Serve cache ANTIGO + revalida em background
t=70s  → Requisição 5: Serve página NOVA (revalidada)
```

### Benefícios

- ✅ Páginas pré-geradas = resposta rápida
- ✅ Atualizações automáticas sem rebuild
- ✅ Reduz carga no backend (revalida periodicamente, não a cada requisição)
- ✅ Sem downtime

### Localidades com ISR

- [app/band/[...slug]/page.tsx](app/band/[...slug]/page.tsx) - Artigos e categorias
- [app/band/cidades/page.tsx](app/band/cidades/page.tsx) - Página de cidades
- [app/band-receitas/[...slug]/page.tsx](app/band-receitas/[...slug]/page.tsx) - Receitas

---

## 🗺️ 4. Sitemap Dinâmico

### Geração de Sitemap

**Localização:** [app/band/sitemap.xml/route.ts](app/band/sitemap.xml/route.ts)

```typescript
export async function GET() {
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      <url>
        <loc>https://portal.flavio-franco-tester.fun</loc>
        <changefreq>daily</changefreq>
        <priority>1.0</priority>
      </url>
    </urlset>`;

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control':
        'public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400',
    },
  });
}
```

### Cache Control

- **max-age=3600**: Browser cacheia por 1 hora
- **s-maxage=3600**: CDN cacheia por 1 hora
- **stale-while-revalidate=86400**: Serve versão antiga por até 24h enquanto revalida

### Próximos Passos

Para tornar o sitemap totalmente dinâmico, adicione:

```typescript
// Buscar URLs do backend
const response = await fetch(`${process.env.SERVER_BASE_URL}/api/pages`);
const pages = await response.json();

// Gerar XML dinamicamente
const urls = pages
  .map(
    (page) => `
  <url>
    <loc>${page.url}</loc>
    <lastmod>${page.updatedAt}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>
`
  )
  .join('');
```

---

## 📁 Estrutura de Rotas

```
app/
├── band/                          # Portal principal
│   ├── [...slug]/                 # Rotas dinâmicas
│   │   ├── layout.tsx             # Layout com ThemeWrapper
│   │   └── page.tsx               # Renderiza página baseado em tipo
│   ├── cidades/                   # Editoria específica
│   │   ├── page.tsx
│   │   └── cidades.css            # Estilos customizados
│   └── sitemap.xml/               # Sitemap dinâmico
│       └── route.ts
└── band-receitas/                 # Portal de receitas (mesmo padrão)
    └── [...slug]/
```

---

## 🔧 Variáveis de Ambiente

```env
# Servidor de conteúdo
SERVER_BASE_URL=http://localhost:3001

# Domínios (multi-hosting)
NEXT_PUBLIC_PORTAL_HOSTNAME=portal.example.com
NEXT_PUBLIC_RECIPES_HOSTNAME=receitas.example.com
```

---

## 🚀 Deploy

A aplicação é configurada com `output: "standalone"` no [next.config.ts](next.config.ts), permitindo:

- ✅ Deploy em container Docker
- ✅ Menor tamanho de bundle
- ✅ Sem dependências de build extras

```bash
docker build -t portal-multi-routing .
docker run -p 3000:3000 portal-multi-routing
```

---

## 📝 Resumo Técnico

| Feature        | Implementação           | Benefício                                |
| -------------- | ----------------------- | ---------------------------------------- |
| **Temas**      | ThemeWrapper + CSS vars | Customização dinâmica por editoria       |
| **Multi-host** | proxy.ts middleware     | Múltiplos domínios em única aplicação    |
| **Cache**      | ISR + revalidate        | Performance + atualização automática     |
| **SEO**        | Sitemap + ISR           | Indexação otimizada                      |
| **Styling**    | shadcn + CSS local      | Componentes consistentes + flexibilidade |

---

**Última atualização:** Janeiro 2026  
**Versão Next.js:** 15+
