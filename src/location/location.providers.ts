import { Connection } from 'mongoose';
import { LocationSchema } from '../schemas/location.schema';

export const locationProviders = [
  {
    provide: 'LOCATIONS_MODEL',
    useFactory: (connection: Connection) =>
      connection.model('Locations', LocationSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
