# Sistema de Blog - SmartStudy

Este diretório contém os posts do blog em formato Markdown. O sistema de blog foi desenvolvido para ser simples de usar e fácil de manter.

## Como Criar um Novo Post

### 1. Estrutura do Arquivo

Crie um novo arquivo `.md` no diretório `content/blog/` com o seguinte formato:

```markdown
---
title: "Título do Post"
description: "Breve descrição do post para SEO e preview"
date: "YYYY-MM-DD"
author: "Nome do Autor"
tags: ["tag1", "tag2", "tag3"]
featured: true/false
published: true/false
image: "https://exemplo.com/imagem.jpg" (opcional)
---

# Conteúdo do Post em Markdown

Aqui você escreve o conteúdo do post usando sintaxe Markdown...
```

### 2. Metadados Obrigatórios

- **title**: Título do post
- **description**: Descrição para SEO e preview
- **date**: Data de publicação (formato YYYY-MM-DD)
- **author**: Nome do autor
- **tags**: Array de tags para categorização
- **featured**: Se o post deve aparecer em destaque (true/false)
- **published**: Se o post está publicado (true/false)

### 3. Metadados Opcionais

- **featured**: Por padrão é `false`
- **published**: Por padrão é `true` (posts são publicados automaticamente)
- **image**: URL da imagem de destaque do post (opcional)

## Sintaxe Markdown Suportada

### Texto Básico
```markdown
**Negrito** e *itálico*
# Título H1
## Título H2
### Título H3
```

### Listas
```markdown
- Item 1
- Item 2
- Item 3

1. Item numerado 1
2. Item numerado 2
3. Item numerado 3
```

### Links e Imagens
```markdown
[Link para outro site](https://exemplo.com)
![Imagem](caminho/para/imagem.jpg)
```

### Código
```markdown
`código inline`

```javascript
// Bloco de código
function exemplo() {
  return "Hello World";
}
```

### Tabelas
```markdown
| Coluna 1 | Coluna 2 | Coluna 3 |
|----------|----------|----------|
| Dados 1  | Dados 2  | Dados 3  |
```

### Citações
```markdown
> Esta é uma citação importante
> que pode ter múltiplas linhas.
```

## URLs dos Posts

Os posts são automaticamente acessíveis através das URLs:
- `/blog` - Página principal do blog
- `/blog/[slug]` - Post individual (ex: `/blog/como-estudar-eficientemente`)

## Filtros e Busca

O sistema suporta:
- Filtro por tags: `/blog?tag=estudo`
- Posts em destaque na página principal
- Posts relacionados baseados em tags similares

## Exemplos de Posts

Veja os arquivos de exemplo no diretório para referência:
- `como-estudar-eficientemente.md`
- `flashcards-digitais.md`
- `tecnica-pomodoro.md`

## Dicas para Escrever

1. **Títulos**: Use títulos claros e descritivos
2. **Estrutura**: Organize o conteúdo com subtítulos
3. **Exemplos**: Inclua exemplos práticos quando possível
4. **Imagens**: Use imagens para ilustrar conceitos
5. **Código**: Inclua exemplos de código quando relevante
6. **Links**: Link para recursos externos úteis
7. **Conclusão**: Sempre termine com uma conclusão ou próximos passos

## Manutenção

- Posts não publicados (`published: false`) não aparecem no blog
- Posts em destaque (`featured: true`) aparecem destacados na página principal
- O sistema calcula automaticamente o tempo de leitura
- Excerpts são gerados automaticamente a partir do conteúdo
