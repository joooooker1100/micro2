import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ProductInterface } from '../interfaces/product.interface';
import { ProductService } from '../services/product.service';
import { RabitService } from '../../rabbit/rabit.service';
import { HttpService } from '@nestjs/axios'

@Controller('shop')
export class ProductController {
    constructor(private readonly ProductService: ProductService,
        private readonly rabbitService:RabitService,
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
 //   @MessagePattern({event:'product-status'})
 //   public async send(@Payload() product){
  //      await this.ProductService.showMessage(product)

  //  }
   @MessagePattern({ event: 'product-status' })
    public async getState(@Payload() product: ProductInterface) {
       console.log("d", product)
       const getProduct = await this.ProductService.setStatus(product)
        console.log(getProduct)}
 //   @Get('')
 //   public async getProducts() {
  //      return this.ProductService.getProducts()
  //  }
  //  @Get(':id')
   // public async getProduct(@Param('id') sku: string) {
   //    await this.rabbitService.sendMessage('product-get',{sku})
    //   const pro = await this.ProductService.getProduct(sku)
   //    console.log(pro)
     //   return pro
   // }
   

  @Get('checkAvailability/:sku')
  public async checkAvailability(@Param('sku') sku: string) {
    const response =  this.httpService.get(`http://localhost:3000/api/warehouse/${sku}`)
    
    console.log('Response from warehouse:', response);
    return response
    
 
}
}


