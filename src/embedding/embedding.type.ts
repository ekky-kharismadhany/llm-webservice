export type Document = {
  uuid: string;
  sourceTypeId: number;
  source: string;
};

export type EmbeddingResponse = {
  document: Document;
  message: string;
};
