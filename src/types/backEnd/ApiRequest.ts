export type ApiRequest<T> = SuccessStatus<T> | LoadingStatus | ErrorStatus;

type SuccessStatus<T> = {
  status: "success";
  data: T;
};

type LoadingStatus = {
  status: "loading";
};

type ErrorStatus = {
  status: "error";
};
