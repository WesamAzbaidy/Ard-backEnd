import { Document } from 'mongoose';

export interface User extends Document {
  readonly firstName: string;
  readonly lastName: string;
  readonly email: string;
  readonly password: string;
  readonly age: number;
  readonly username: string;
  readonly role: 'admin' | 'user';
  active: boolean;
}
