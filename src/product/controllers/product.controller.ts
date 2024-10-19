import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ProductInterface } from '../interfaces/product.interface';
import { ProductService } from '../services/product.service';
import { RabitService } from '../../rabbit/rabit.service';
import { HttpService } from '@nestjs/axios'

@Controller('shop')
export class ProductController {
    constructor(private readonly ProductService: ProductService,
        private readonly httpService: HttpService
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
    @MessagePattern({ event: 'product-status' })
    public async getState(@Payload() product: ProductInterface) {
        console.log("d", product)
        const updatedProduct = await this.ProductService.setStatus(product);
        return updatedProduct;
    }


    @Get('checkAvailability/:sku')
    public async checkAvailability(@Param('sku') sku: string) {
      //  try{
       //     const response = await this.httpService.get(`http://localhost:3000/api/warehouse/${sku}`).toPromise();
       //     console.log('Response from warehouse:', response.data);
       //     const warehouseProduct = response.data;
        //    await this.ProductService.setStatus({
        //      sku: warehouseProduct.sku,
        //      status: warehouseProduct.qt,
        //      category: 'category', 
        //      title: 'title' 
        //    });
            const product =await this.ProductService.checkAvailability(sku)
            console.log('Product from database:', product);
            return product 
      //  }catch(error){
     //       {
       //         console.error('Error in checkAvailability:', error.message);
      //          throw new Error('Internal server error')
      //  }


 //   }
}}


