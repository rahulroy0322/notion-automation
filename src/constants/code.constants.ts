const CODE = {
  // 4**
  400: 'BAD_REQUEST',
  404: 'NOT_FOUND',
  409: 'CONFLICT',

  //   5**
  500: 'SERVER_ERROR',
} as const satisfies Record<number, string>;

type CodeType = (typeof CODE)[keyof typeof CODE];

export type { CodeType };
export { CODE };
