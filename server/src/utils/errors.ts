type DefaultError = {
  message: string;
};

export class ApiError<T extends object = DefaultError> extends Error {
  errorData: T | DefaultError;

  constructor(errorData: T | DefaultError) {
    super("message" in errorData ? errorData.message : "ApiError");
    this.errorData = errorData;
  }
}
