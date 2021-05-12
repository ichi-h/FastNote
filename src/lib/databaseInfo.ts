export interface Memo {
  title: string;
  category: string;
  tags: string[];
  star: boolean;
  created: string;
  updated: string;
  content: string;
}

export interface DatabaseInfo {
  memos: Memo[];
  categories: string[];
  settings: {
    theme: string;
    fontSize: string;
    font: string;
  };
}
