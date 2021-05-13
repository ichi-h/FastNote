export interface Memo {
  title: string;
  category: string;
  tags: string[];
  star: boolean;
  created: string;
  updated: string;
  content: string;
}

export interface Settings {
  theme: string;
  fontSize: string;
  font: string;
}

export interface DatabaseInfo {
  memos: Memo[];
  categories: string[];
  settings: Settings;
  lastUpdated: number;
}