// TODO: add field to handle pdf or other source
export type CreateDocumentRequest = {
  source: string;
  sourceType: number;
};

export type CreateDocumentResponse = {
  uuid: string;
};

export type DeleteDocumentRequest = {
  uuid: string;
};

export type Document = {
  uuid: string;
  sourceTypeId: number;
  source: string;
};

export type SourceType = {
  id: number;
  name: string;
};
