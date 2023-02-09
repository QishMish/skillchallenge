import { ConfigService, ConfigModule } from '@nestjs/config';
import { DynamicModule } from '@nestjs/common';
import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { RmqModuleOptions } from './interfaces';
import { RmqService } from './rmq.service';


@Module({
  providers: [RmqService],
  exports: [RmqService],
})
export class RmqModule {
  static register({ name }: RmqModuleOptions): DynamicModule {
    return {
      module: RmqModule,
      imports: [
        ClientsModule.registerAsync([
          {
            name,
            useFactory: (configService: ConfigService) => {
              console.log(configService.get<string>('RABBIT_MQ_URI'))
              console.log(configService.get<string>(`RABBIT_MQ_${name}_QUEUE`))
              
              return {
                transport: Transport.RMQ,
                options: {
                  urls: [configService.get<string>('RABBIT_MQ_URI')],
                  queue: configService.get<string>(`RABBIT_MQ_${name}_QUEUE`),
                },
              }
            
            },
            inject: [ConfigService],
          },
        ]),
      ],
      exports: [ClientsModule],
    };
  }
}

