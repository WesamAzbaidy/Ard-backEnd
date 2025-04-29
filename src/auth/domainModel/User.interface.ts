export interface User {
  readonly _id?: string;
  readonly firstName: string;
  readonly lastName: string;
  readonly email: string;
  readonly password: string;
  readonly age: number;
  readonly username: string;
  readonly role: 'admin' | 'user';
  active: boolean;
}
