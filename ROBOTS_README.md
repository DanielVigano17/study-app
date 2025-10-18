# Robots.txt - SmartStudy

O arquivo `robots.txt` do SmartStudy está configurado para otimizar a indexação pelos motores de busca, permitindo acesso ao conteúdo público e protegendo áreas privadas.

## Estrutura do Robots.txt

### URLs Permitidas (Allow)

- **`/`** - Homepage da landing page
- **`/blog`** - Página principal do blog
- **`/blog/*`** - Todos os posts individuais do blog
- **`/login`** - Página de login (para SEO)
- **`/sitemap.xml`** - Sitemap para indexação

### URLs Bloqueadas (Disallow)

- **`/api/*`** - Todas as rotas de API
- **`/app/*`** - Área logada da aplicação
- **`/billing/*`** - Páginas de cobrança e assinatura
- **`/on-boarding/*`** - Processo de onboarding
- **`/quiz/*`** - Questionários (área logada)
- **`/settings/*`** - Configurações do usuário
- **`/_next/*`** - Arquivos estáticos do Next.js
- **`/admin/*`** - Área administrativa

### Proteção contra IA

Bloqueamos bots de IA para proteger o conteúdo:

- **GPTBot** - Bot do ChatGPT
- **ChatGPT-User** - Usuário do ChatGPT
- **CCBot** - Bot do Common Crawl
- **anthropic-ai** - Bot da Anthropic
- **Claude-Web** - Bot do Claude

## Configuração

### Desenvolvimento
```
http://localhost:3001/robots.txt
```

### Produção
```
https://smartstudy.me/robots.txt
```

## Exemplo de Robots.txt Gerado

```
User-agent: *
Allow: /
Allow: /blog
Allow: /blog/*
Allow: /login
Allow: /sitemap.xml
Disallow: /api/*
Disallow: /app/*
Disallow: /billing/*
Disallow: /on-boarding/*
Disallow: /quiz/*
Disallow: /settings/*
Disallow: /_next/*
Disallow: /admin/*

User-agent: GPTBot
Disallow: /

User-agent: ChatGPT-User
Disallow: /

User-agent: CCBot
Disallow: /

User-agent: anthropic-ai
Disallow: /

User-agent: Claude-Web
Disallow: /

Sitemap: https://smartstudy.me/sitemap.xml
```

## Benefícios

### SEO Otimizado
- ✅ **Blog indexado**: Todos os posts são indexáveis
- ✅ **Landing page**: Homepage acessível aos bots
- ✅ **Sitemap**: Referência ao sitemap para indexação

### Segurança
- ✅ **APIs protegidas**: Rotas de API não indexáveis
- ✅ **Área logada**: Conteúdo privado protegido
- ✅ **Billing**: Informações financeiras protegidas

### Proteção de Conteúdo
- ✅ **Anti-scraping**: Bloqueia bots de IA
- ✅ **Conteúdo proprietário**: Protege artigos e funcionalidades
- ✅ **Privacidade**: Mantém dados sensíveis privados

## Monitoramento

Para verificar se o robots.txt está funcionando:

1. **Google Search Console**: Verificar se as páginas estão sendo indexadas
2. **Ferramentas de SEO**: Usar ferramentas como Screaming Frog
3. **Teste manual**: Acessar `/robots.txt` diretamente

## Atualizações

O robots.txt é gerado dinamicamente e usa:
- **Variável de ambiente**: `NEXT_PUBLIC_APP_URL` para URL base
- **Sitemap automático**: Referência ao sitemap.xml
- **Configuração flexível**: Fácil de modificar conforme necessário
