import * as mongoose from 'mongoose';

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: async (): Promise<typeof mongoose> => {
      // Use proper MongoDB URI format
      const uri = `mongodb://${process.env.DB_HOST || 'localhost'}:${process.env.DB_PORT || '27017'}/${process.env.DB_NAME || 'Ard'}`;

      console.log(
        `Connecting to MongoDB at: ${uri.replace(/:([^:]+)@/, ':*****@')}`,
      ); // Hide password if present

      try {
        const connection = await mongoose.connect(uri, {
          serverSelectionTimeoutMS: 5000,
          socketTimeoutMS: 30000,
        });

        console.log('✅ Successfully connected to MongoDB');
        return connection;
      } catch (error) {
        console.error('❌ MongoDB connection error:', error);
        throw error;
      }
    },
  },
];
