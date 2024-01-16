type JsonSuccessResponseType<ResultType> = {
  status: boolean;
  message: string;
  result: ResultType;
  code: number;
};

type JsonFailedResponseType = {
  status: boolean;
  message: string;
  trace: any[];
  code: number;
};

type ListResultType<ModelType> = {
  total: number;
  prev_page: string;
  next_page: string;
  rows: ModelType[];
  page_count: number;
  page: number;
};
