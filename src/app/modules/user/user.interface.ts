export type TRole = "Customer" | "Staff";

export interface IUser {
  name: string;
  email: string;
  password: string;
  role: TRole;
  createdAt?: Date;
  updatedAt?: Date;
}
