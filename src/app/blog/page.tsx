import { Metadata } from 'next';
import Link from 'next/link';
import { getAllPosts, getAllTags } from '@/lib/blog/utils';
import { BlogPost } from '@/lib/blog/types';
import { Calendar, Clock, Tag, User } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { HeaderBlog } from '../_components/header-blog';
import { AuroraText } from '@/components/magicui/aurora-text';

export const metadata: Metadata = {
  title: 'Blog - SmartStudy',
  description: 'Artigos e dicas sobre estudos, produtividade e aprendizado eficiente.',
};

interface BlogPageProps {
  searchParams: Promise<{
    tag?: string;
  }>;
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const params = await searchParams;
  const selectedTag = params.tag;
  
  const [allPosts, allTags] = await Promise.all([
    getAllPosts(),
    getAllTags()
  ]);

  // Filtrar posts por tag se especificado
  const posts = selectedTag 
    ? allPosts.filter(post => 
        post.tags.some(tag => tag.toLowerCase() === selectedTag.toLowerCase())
      )
    : allPosts;

  return (
    <div className="min-h-screen bg-background">
      {/* Header Navigation */}
      <HeaderBlog />
      
      {/* Header */}
      <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 py-16 mt-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            <AuroraText colors={["#3b82f6", "#003c9d", "#3b82f6","#95beff"]}>
              {" "}Blog SmartStudy
            </AuroraText>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Descubra dicas, estratégias e insights para maximizar seu aprendizado e produtividade nos estudos.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 max-w-7xl">
        {/* Filtros de Tag */}
        {allTags.length > 0 && (
          <div className="mb-12">
            <div className="flex flex-wrap gap-3 justify-center">
              <Link href="/blog">
                <Badge 
                  variant={!selectedTag ? "default" : "outline"} 
                  className="cursor-pointer px-4 py-2 text-sm font-medium hover:bg-primary hover:text-primary-foreground transition-colors"
                >
                  Todos
                </Badge>
              </Link>
              {allTags.map(tag => (
                <Link key={tag} href={`/blog?tag=${encodeURIComponent(tag)}`}>
                  <Badge 
                    variant={selectedTag === tag ? "default" : "outline"} 
                    className="cursor-pointer px-4 py-2 text-sm font-medium hover:bg-primary hover:text-primary-foreground transition-colors"
                  >
                    {tag}
                  </Badge>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Posts Grid */}
        {posts.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-6">📝</div>
            <h3 className="text-2xl font-semibold mb-4">Nenhum post encontrado</h3>
            <p className="text-muted-foreground text-lg">
              {selectedTag 
                ? `Não há posts com a tag "${selectedTag}".` 
                : 'Ainda não há posts publicados.'
              }
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <BlogPostCard key={post.slug} post={post} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

interface BlogPostCardProps {
  post: BlogPost;
}

function BlogPostCard({ post }: BlogPostCardProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <Card className="h-full flex flex-col hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 group overflow-hidden">
      {/* Imagem de destaque */}
      <div className="relative h-48 overflow-hidden">
        {post.image ? (
          <>
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/20"></div>
          </>
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600">
            <div className="absolute inset-0 bg-black/20"></div>
          </div>
        )}
        {post.featured && (
          <div className="absolute top-4 right-4">
            <Badge className="bg-white/90 text-primary hover:bg-white">
              Destaque
            </Badge>
          </div>
        )}
      </div>

      <CardHeader className="flex-grow pb-4">
        <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
          <User className="h-3 w-3" />
          <span>{post.author}</span>
          <span>•</span>
          <Calendar className="h-3 w-3" />
          <span>{formatDate(post.date)}</span>
          <span>•</span>
          <Clock className="h-3 w-3" />
          <span>{post.readingTime} min</span>
        </div>
        
        <CardTitle className="line-clamp-2 mb-3 text-lg leading-tight">
          <Link 
            href={`/blog/${post.slug}`}
            className="hover:text-primary transition-colors group-hover:text-primary"
          >
            {post.title}
          </Link>
        </CardTitle>
        
        <CardDescription className="line-clamp-3 text-sm leading-relaxed">
          {post.description}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="pt-0">
        {post.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-4">
            {post.tags.slice(0, 2).map(tag => (
              <Badge key={tag} variant="secondary" className="text-xs bg-primary/10 text-primary hover:bg-primary/20">
                {tag.toUpperCase()}
              </Badge>
            ))}
            {post.tags.length > 2 && (
              <Badge variant="secondary" className="text-xs">
                +{post.tags.length - 2}
              </Badge>
            )}
          </div>
        )}

        <Button asChild className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
          <Link href={`/blog/${post.slug}`}>
            Ler artigo
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}
