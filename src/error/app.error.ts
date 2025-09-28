import { CODE, type CodeType } from '../constants/code.constants';
import { STATUS, type StatusType } from '../constants/status.constants';

class AppError extends Error {
  readonly status: number;
  readonly code: string;

  constructor(message: string, status: StatusType, code: CodeType) {
    if (!message.endsWith('!')) {
      message = `${message} !`;
    }
    super(message);
    if (this.name === 'Error') {
      this.name = 'AppError';
    }
    this.status = status;
    this.code = code;
    AppError.captureStackTrace(this);
  }
}

// 4**
class BadRequestError extends AppError {
  constructor(message: string) {
    super(message, STATUS.BAD_REQUEST, CODE[400]);
    this.name = 'BadRequestError';
  }
}

class ValueError extends AppError {
  constructor(message: string) {
    super(message, STATUS.BAD_REQUEST, CODE[400]);
    this.name = 'BadRequestError';
  }
}

class NotFoundError extends AppError {
  constructor(message: string) {
    super(message, STATUS.NOT_FOUND, CODE[404]);
    this.name = 'NotFoundError';
  }
}

// 5**
class ServerError extends AppError {
  constructor(message = 'Something went wrong!') {
    super(message, STATUS.SERVER_ERROR, CODE[500]);
    this.name = 'ServerError';
  }
}

// db
class DBError extends AppError {
  constructor(message: string) {
    super(message, STATUS.CONFLICT, CODE[409]);
    this.name = 'DBError';
  }
}

export {
  AppError,
  // 4**
  BadRequestError,
  ValueError,
  NotFoundError,
  // 5**
  ServerError,
  // db
  DBError,
};
