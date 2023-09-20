import { Permission } from './permission';

export type User = {
  id: number;
  username: string;
  permission: Permission[];
};
