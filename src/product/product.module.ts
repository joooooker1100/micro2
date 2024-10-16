import { Module } from "@nestjs/common";
import { ProductService } from "./services/product.service";
import { MongooseModule } from "@nestjs/mongoose";
import { productSchema, productSchemaName } from "./schema/product.schema";
import { ProductController } from "./controllers/product.controller";
import { RabbitModule } from "../rabbit/rabbit.module";



@Module({
    imports: [RabbitModule,
        MongooseModule.forFeature([{
            schema: productSchema,
            name: productSchemaName
        }])],
    providers: [ProductService],
    controllers: [ProductController]
})
export class ProductModule {

}