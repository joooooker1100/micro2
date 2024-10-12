import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ProductInterface } from '../interfaces/product.interface';
import { ProductService } from '../services/product.service';

@Controller()
export class ProductController {
    constructor(private readonly ProductService:ProductService){

    }
    @MessagePattern({event:'product-created'})
    public async upsertProduct(@Payload() product: ProductInterface) {
        console.log('receined message:', product)
        await this.ProductService.upsert(product)

    }
    @MessagePattern({event:'product-deleted'})
    public async deleteProduct(@Payload() product:{sku:string}) {
        console.log('receined message:', product)
        await this.ProductService.deleteProduct(product.sku)

    }


}

