import { Injectable } from '@nestjs/common';

@Injectable()
export class HealthService {
  getHealthStatus() {
    return {
      serverSatus: 'Ok',
      env: process.env.NODE_ENV,
    };
  }
}
