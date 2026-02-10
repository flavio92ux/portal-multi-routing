export interface Article {
  id: string;
  metadata: {
    title: string;
    description: string;
    ogImage: string;
  };
  content: {
    headline: string;
    author: string;
    publishedAt: string;
    body: Array<{ type: string; content: string }>;
  };
}
