interface ServiceSuccess<T> {
  data: T;
  success: true;
}

export interface ServiceError {
  code: string;
  message: string;
}

interface ServiceFailure {
  error: ServiceError;
  success: false;
}

type ServiceResult<T> = ServiceFailure | ServiceSuccess<T>;

function success<T>(data: T): ServiceSuccess<T> {
  return {
    success: true,
    data
  };
}

function failure(message: string, code: string): ServiceFailure {
  return {
    success: false,
    error: {
      message,
      code
    }
  };
}

export { failure, type ServiceResult, success };
