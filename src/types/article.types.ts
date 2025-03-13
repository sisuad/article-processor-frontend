export interface Article {
  id: string;
  url: string;
  title: string;
  summary: string;
  content: string;
  tags: string[];
  categories: string[];
}

export interface ArticleProcessingJob {
  id: string;
  status: "pending" | "processing" | "completed" | "failed";
  articles: Article[];
  error?: string;
}
