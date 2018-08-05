interface OperatorError {
  error: string;
  expected: any;
  path?: string;
  subError?: {
    actual: any;
    path: string;
  };
}

export interface CompareError extends OperatorError {
  actual: any;
  full?: any;
  op: string;
}

export interface Operator {
  arity: 'binary' | 'unary';
  description: string;
  error: string;
  exec: (actual: any, expected: any) => undefined | OperatorError;
  name: string | string[];
}

export interface OperatorMap {
  [op: string]: Operator;
}
