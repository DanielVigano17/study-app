export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  author: string;
  tags: string[];
  content: string;
  excerpt: string;
  readingTime: number;
  featured?: boolean;
  published: boolean;
  image?: string;
}

export interface BlogPostMetadata {
  title: string;
  description: string;
  date: string;
  author: string;
  tags: string[];
  featured?: boolean;
  published: boolean;
  image?: string;
}
