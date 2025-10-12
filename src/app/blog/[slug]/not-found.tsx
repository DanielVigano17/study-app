import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Home } from 'lucide-react';
import { HeaderBlog } from '../../_components/header-blog';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background">
      <HeaderBlog />
      <div className="container mx-auto px-4 py-16 max-w-2xl text-center mt-16">
      <h1 className="text-4xl font-bold mb-4">Post não encontrado</h1>
      <p className="text-xl text-muted-foreground mb-8">
        O post que você está procurando não existe ou foi removido.
      </p>
      
      <div className="flex gap-4 justify-center">
        <Button asChild>
          <Link href="/blog" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Voltar ao blog
          </Link>
        </Button>
        
        <Button variant="outline" asChild>
          <Link href="/" className="flex items-center gap-2">
            <Home className="h-4 w-4" />
            Ir para home
          </Link>
        </Button>
      </div>
      </div>
    </div>
  );
}
