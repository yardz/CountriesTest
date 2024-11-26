import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Modules from './modules';

const getEnvFile = () => {
  if (!process.env.NODE_ENV) {
    return '.env';
  }
  if (process.env.NODE_ENV === 'production') {
    return '.env';
  }
  return `.env.${process.env.NODE_ENV}`;
};

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: getEnvFile(),
      isGlobal: true,
    }),

    // All modules should be imported here
    ...Object.values(Modules),
  ],
})
export class AppModule {}
