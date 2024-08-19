export type GenerativeResponse = {
  model: string;
  created_at: string;
  message: GenerativeMessageResponse;
  done: boolean;
};

export type GenerativeMessageResponse = {
  role: string;
  content: string;
  images?: string;
};

export interface GenerativeCompleteResponse {
  model: string;
  created_at: string;
  message: Message;
  done_reason: string;
  done: boolean;
  total_duration: number;
  load_duration: number;
  prompt_eval_count: number;
  prompt_eval_duration: number;
  eval_count: number;
  eval_duration: number;
}

export interface Message {
  role: string;
  content: string;
}

export type GenerativeRequest = {
  model?: string;
  prompt: string;
  stream?: boolean;
};
