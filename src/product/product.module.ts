import { Module } from "@nestjs/common";
import { ProductService } from "./services/product.service";
import { MongooseModule } from "@nestjs/mongoose";
import { productSchema, productSchemaName } from "./schema/product.schema";
import { ProductController } from "./controllers/product.controller";
import { RabbitModule } from "../rabbit/rabbit.module";
import { HttpModule } from "@nestjs/axios";



@Module({
    imports: [RabbitModule,HttpModule,
        MongooseModule.forFeature([{
            schema: productSchema,
            name: productSchemaName
        }])],
        exports:[ProductService],
    providers: [ProductService],
    controllers: [ProductController]
})
export class ProductModule {

}