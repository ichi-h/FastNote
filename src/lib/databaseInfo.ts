export interface DateInfo {
  year: number;
  month: number;
  date: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export interface Memo {
  title: string;
  category: string;
  tags: string[];
  star: boolean;
  trash: boolean;
  created: DateInfo;
  updated: DateInfo;
  content: string;
}

export interface DatabaseInfo {
  memos: Memo[];
  categories: string[];
  lastUpdated: DateInfo;
}
