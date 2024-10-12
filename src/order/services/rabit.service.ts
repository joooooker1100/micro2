import { Injectable } from '@nestjs/common';
import { ClientProxy, ClientProxyFactory, Transport } from '@nestjs/microservices';

import { environment } from '../../enviroments/enviroment';

@Injectable()
export class RabitService {
    private client:ClientProxy
  constructor() {
   this.client = ClientProxyFactory.create({
        transport: Transport.RMQ,
        options: {
          urls: [environment.rabbitMqUrl],
          queue: 'product_queue',
          queueOptions: {
            durable: false
          },
        },
      });
  }

 public async sendMessage(message:any) {
    await this.client.emit("product-queue",message);
  }
}
