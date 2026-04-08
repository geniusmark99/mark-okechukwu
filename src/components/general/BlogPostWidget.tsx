

export interface BlogPost {
  id: number;
  title: string;
  slug: string;
  author: string;
  date: string;
  image: string;
  category: string;
  content: string;
}



const BlogPostWidget: BlogPost[] = [
  {
    id: 1,
    title: 'How I Got My Dream Job: From Customer Support Rep To Software Engineer',
    slug: 'from-customer-support-to-software-engineer',
    author: 'Temitope Akintola',
    date: '2024-06-10',
    category: 'People',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=1200&h=800&fit=crop',
    content: `
    This is a story of transformation and persistence. I started in customer support but always had an interest in tech...
    I eventually learned frontend development, built projects, and applied for jobs until I got my first role.
    `,
  },
  {
    id: 2,
    title: 'From One Country To Another: My Tech Journey Across Borders',
    slug: 'tech-journey-across-borders',
    author: 'Amarachi Okafor',
    date: '2024-06-15',
    category: 'People',
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&h=800&fit=crop',
    content: `
    Relocating while staying consistent in my tech journey was a huge challenge. Here's how I navigated learning and adapting across two countries...
    `,
  },
  {
    id: 3,
    title: 'Dear Techies: 10 Job Sites You Should Be Using in 2025',
    slug: 'top-10-tech-job-sites-2024',
    author: 'Smart Innovative Tech',
    date: '2024-06-20',
    category: 'Career',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200&h=800&fit=crop',
    content: `
    Finding the right job platform can make or break your job search. Here are the top sites every developer should bookmark in 2025.
    `,
  },
  {
    id: 4,
    title: 'Code From Anywhere: Why Remote Work is the Future of Tech',
    slug: 'remote-work-future-of-tech',
    author: 'David Ibikunle',
    date: '2024-07-01',
    category: 'Workplace',
    image: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=1200&h=800&fit=crop',
    content: `
    The flexibility of remote work is reshaping how teams collaborate. Developers are no longer tied to one location...
    `,
  },
  {
    id: 5,
    title: 'Building Resilient Systems: Lessons From Production Failures',
    slug: 'building-resilient-systems',
    author: 'Victoria Ambah',
    date: '2024-07-01',
    category: 'Engineering',
    image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=1200&h=800&fit=crop',
    content: `
    Production incidents are inevitable. What matters is how you design systems to recover gracefully and learn from each failure.
    `,
  },
];

export default BlogPostWidget;