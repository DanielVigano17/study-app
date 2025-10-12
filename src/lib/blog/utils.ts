import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import { BlogPost, BlogPostMetadata } from './types';

const postsDirectory = path.join(process.cwd(), 'content/blog');

// Função para calcular tempo de leitura (palavras por minuto)
function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
}

// Função para extrair excerpt do conteúdo
function extractExcerpt(content: string, maxLength: number = 160): string {
  const plainText = content
    .replace(/[#*`_~]/g, '') // Remove formatação markdown
    .replace(/\n+/g, ' ') // Substitui quebras de linha por espaços
    .trim();
  
  if (plainText.length <= maxLength) {
    return plainText;
  }
  
  return plainText.substring(0, maxLength).trim() + '...';
}

// Função para processar conteúdo markdown para HTML
async function processMarkdown(content: string): Promise<string> {
  const result = await remark()
    .use(html, { sanitize: false })
    .process(content);

  return result.toString();
}

// Função para obter todos os slugs dos posts
export function getAllPostSlugs(): string[] {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames
    .filter(name => name.endsWith('.md'))
    .map(name => name.replace(/\.md$/, ''));
}

// // Função para processar caminho de imagem
// function processImagePath(imagePath: string | undefined): string | undefined {
//   if (!imagePath) return undefined;
  
//   // Se já é uma URL completa (http/https), mantém como está
//   if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
//     return imagePath;
//   }
  
//   // Se é um caminho relativo, adiciona /images/blog/
//   if (imagePath.startsWith('/')) {
//     return imagePath; // Já é um caminho absoluto
//   }
  
//   // Caminho relativo - assume que está em /images/blog/
//   return `/images/blog/${imagePath}`;
// }

// Função para verificar se a imagem existe localmente
function checkLocalImageExists(imagePath: string): boolean {
  if (!imagePath || imagePath.startsWith('http')) {
    return true; // URLs externas sempre "existem"
  }
  
  const publicPath = path.join(process.cwd(), 'public', imagePath);
  return fs.existsSync(publicPath);
}

// Função para obter dados de um post específico
export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.md`);
    
    if (!fs.existsSync(fullPath)) {
      return null;
    }

    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    // Validação dos metadados obrigatórios
    if (!data.title || !data.date || !data.author) {
      console.warn(`Post ${slug} está faltando metadados obrigatórios`);
      return null;
    }

    // Processar o conteúdo markdown
    const processedContent = await processMarkdown(content);
    const excerpt = extractExcerpt(content);
    const readingTime = calculateReadingTime(content);

    // Processar caminho da imagem
    // const processedImage = processImagePath(data.image);

    return {
      slug,
      title: data.title,
      description: data.description || excerpt,
      date: data.date,
      author: data.author,
      tags: data.tags || [],
      content: processedContent,
      excerpt,
      readingTime,
      featured: data.featured || false,
      published: data.published !== false, // Por padrão, posts são publicados
      image: data.image,
    };
  } catch (error) {
    console.error(`Erro ao processar post ${slug}:`, error);
    return null;
  }
}

// Função para obter todos os posts
export async function getAllPosts(): Promise<BlogPost[]> {
  const slugs = getAllPostSlugs();
  const posts = await Promise.all(
    slugs.map(slug => getPostBySlug(slug))
  );

  // Filtrar posts nulos e não publicados
  return posts
    .filter((post): post is BlogPost => post !== null && post.published)
    .sort((a, b) => {
      // Ordenar por data (mais recentes primeiro)
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
}

// Função para obter posts por tag
export async function getPostsByTag(tag: string): Promise<BlogPost[]> {
  const allPosts = await getAllPosts();
  return allPosts.filter(post => 
    post.tags.some(postTag => 
      postTag.toLowerCase() === tag.toLowerCase()
    )
  );
}

// Função para obter posts em destaque
export async function getFeaturedPosts(): Promise<BlogPost[]> {
  const allPosts = await getAllPosts();
  return allPosts.filter(post => post.featured);
}

// Função para obter todas as tags únicas
export async function getAllTags(): Promise<string[]> {
  const allPosts = await getAllPosts();
  const tags = allPosts.flatMap(post => post.tags);
  return Array.from(new Set(tags)).sort();
}

// Função para obter posts relacionados (baseado em tags)
export async function getRelatedPosts(currentPost: BlogPost, limit: number = 3): Promise<BlogPost[]> {
  const allPosts = await getAllPosts();
  
  return allPosts
    .filter(post => post.slug !== currentPost.slug)
    .map(post => ({
      post,
      score: post.tags.filter(tag => currentPost.tags.includes(tag)).length
    }))
    .filter(item => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(item => item.post);
}
