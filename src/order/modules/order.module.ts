import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { orderScema, orderSchemaName } from "../schema/order.schema";
import { OrderService } from "../services/order.service";
import { OrderController } from "../controllers/order.controller";
import { RabbitModule } from "../../rabbit/rabbit.module";
import { ProductModule } from "../../product/product.module";
import { HttpModule } from "@nestjs/axios";


@Module({
    imports:[ProductModule,RabbitModule,HttpModule,MongooseModule.forFeature([{
        schema:orderScema,
        name:orderSchemaName
    }])], 
    providers:[
        OrderService
    ],
    controllers:[OrderController]
})
export class OrderModule{


}