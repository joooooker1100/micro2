import { Module } from "@nestjs/common";
import { OrderService } from "./order/services/order.service";
import { MongooseModule } from "@nestjs/mongoose";
import { environment } from "./enviroments/enviroment";
import { OrderModule } from "./order/modules/order.module";
import { ProductModule } from "./product/product.module";

@Module({
imports:[
    OrderModule,
    ProductModule,
    MongooseModule.forRoot(environment.mongoDBUrl)
]
})
export class AppModule{

}
