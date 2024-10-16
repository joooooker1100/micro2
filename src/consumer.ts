import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { environment } from './enviroments/enviroment';


async function bootstrap() {
  const rabbitApp = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.RMQ,
    options: {
      urls: [environment.rabbitMqUrl],
      queue: 'micro_queue',
      queueOptions: {
        durable: false
      },
    },
  });
  await rabbitApp.listen();
}
bootstrap();
