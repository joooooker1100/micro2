import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { OrderService } from "../services/order.service";
import { OrderInterface } from "../interfaces/order.interface";
import { OrderModel } from "../model/order.model";
import { HttpService } from "@nestjs/axios";

@Controller("order")
export class OrderController {
    constructor(private readonly orderService: OrderService,
        private readonly httpService: HttpService
    ) { }
    @Post()
    public async createOrder(@Body() order: OrderInterface): Promise<OrderModel> {
        return this.orderService.order(order)
    }
    @Get(':customer')
    public async getOrder(@Param("customer") customer: string) {
        return this.orderService.getOrder(customer)
    }
    @Get('invorce/:id')
    public async getInvorce(@Param('id') id: string) {
        //  const product = await this.orderService.getOrder(customer)
        // 
        //  
        // 
        const product = await this.orderService.getInvorce(id);
        
        const responses = await Promise.all(
            product.items.map(async (element)=>{
                const response = await this.httpService.get(`http://localhost:3000/api/warehouse/${element.sku}?qt=${element.qt}`).toPromise();
                console.log(response)
                    console.log(response.data)
                    return response.data
                })
                
            )
             
         


        return product

    
}
}