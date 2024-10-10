import { Module } from "@nestjs/common";
import { OrderService } from "./order/services/order.service";
import { MongooseModule } from "@nestjs/mongoose";
import { environment } from "./order/enviroments/enviroment";
import { OrderModule } from "./order/modules/order.module";

@Module({
imports:[
    OrderModule,
    MongooseModule.forRoot(environment.mongoDBUrl)
]
})
export class AppModule{

}
