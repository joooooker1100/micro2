import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { OrderService } from "../services/order.service";
import { OrderInterface } from "../interfaces/order.interface";
import { OrderModel } from "../model/order.model";

@Controller("order")
export class OrderController {
    constructor(private readonly orderService: OrderService) {

    }
    @Post()
    public async createOrder(@Body() order: OrderInterface): Promise<OrderModel> {
        return this.orderService.order(order)
    }
    @Get(':id')
    public async getOrder(@Param("id") customer: string) {
        return this.orderService.getOrder(customer)



    }
}