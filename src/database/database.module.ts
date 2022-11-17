import { DynamicModule, Module } from '@nestjs/common';
import { createConnection, ConnectionOptions } from 'typeorm';

@Module({})
export class DatabaseModule {
  static register(connectionOptions: ConnectionOptions): DynamicModule {
    return {
        module: DatabaseModule,
        providers: [{
            provide: 'CONNECTION',
            useValue: createConnection(connectionOptions)
        }]
    }
  }
}
