
export type ContentType = 'text' | 'placeholder' | 'footnote';

export interface FormulaPart {
  text?: string;
  id?: number;
  type: ContentType;
}

export interface Essay {
  title: string;
  content: string;
}

export interface Vocab {
  word: string;
  definition: string;
  example: string;
}
