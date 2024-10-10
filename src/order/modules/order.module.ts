import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { orderScema, orderSchemaName } from "../schema/order.schema";
import { OrderService } from "../services/order.service";
import { OrderController } from "../controllers/order.controller";

@Module({
    imports:[MongooseModule.forFeature([{
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