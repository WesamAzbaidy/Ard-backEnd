import { Document } from 'mongoose';

export interface Location extends Document {
  readonly city: string;
  readonly country: string;
  readonly latitude: number;
  readonly longitude: number;
  readonly createdAt: Date;
  readonly description?: string;
}
