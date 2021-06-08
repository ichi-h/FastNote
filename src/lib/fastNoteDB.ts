interface ArrayObject<T> {
  [num: string]: T,
}

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
  tags: ArrayObject<string>;
  star: boolean;
  trash: boolean;
  created: DateInfo;
  updated: DateInfo;
  content: string;
}

export interface FastNoteDB {
  memos: ArrayObject<Memo>;
  categories: ArrayObject<string>;
  lastUpdated: DateInfo;
}
