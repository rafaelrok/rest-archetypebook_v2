export type SpringPage<T> = {
  _embedded?: {
    bookVOList: T[];
  }
  last?: boolean;
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
  first?: boolean;
  numberOfElements?: number;
  empty?: boolean;
};
