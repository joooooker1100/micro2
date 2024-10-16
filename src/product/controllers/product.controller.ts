import { Controller, Get, Param } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ProductInterface } from '../interfaces/product.interface';
import { ProductService } from '../services/product.service';
import { RabitService } from '../../rabbit/rabit.service';

@Controller('shop')
export class ProductController {
    constructor(private readonly ProductService: ProductService,
        private readonly rabbitService:RabitService
    ) {

    }
    @MessagePattern({ event: 'product-created' })
    public async upsertProduct(@Payload() product: ProductInterface) {
        console.log('receined message:', product)
        await this.ProductService.upsert(product)

    }
    @MessagePattern({ event: 'product-deleted' })
    public async deleteProduct(@Payload() product: { sku: string }) {
        console.log('receined message:', product)
        await this.ProductService.deleteProduct(product.sku)

    }
    @MessagePattern({event:'product-status'})
    public async send(@Payload() product){
        await this.ProductService.showMessage(product)

    }
    @Get('')
    public async getProducts() {
        return this.ProductService.getProducts()
    }
    @Get(':id')
    public async getProduct(@Param('id') sku: string) {
       await this.rabbitService.sendMessage('product-get',{sku})
       const pro = await this.ProductService.getProduct(sku)
       console.log(pro)
        return pro
    }

}

