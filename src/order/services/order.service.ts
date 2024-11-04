import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { orderSchemaName } from "../schema/order.schema";
import { OrderModel } from "../model/order.model";
import { Model } from "mongoose";
import { OrderInterface } from "../interfaces/order.interface";
import { ProductService } from "../../product/services/product.service";


@Injectable()
export class OrderService {
    constructor(
        @InjectModel(orderSchemaName)
        private readonly orderModel: Model<OrderModel>,
        private readonly productService: ProductService
    ) { }
    public async order(order: OrderInterface): Promise<OrderModel> {
        for (const item of order.items) {
            const pro = await this.productService.checkAvailability(item.sku);
            console.log(pro);
            if (pro) {
                return this.orderModel.create(order);
            } else {
                console.log('No items available for order creation')
            }
        }
        throw new Error('No items available for order creation')
    }
    public async getOrder(customer: string) {
        return this.orderModel.find({ customer })
    }
    public async getInvorce(id: string) {
        const product = await this.orderModel.findOne({ _id: id });
        return product

    }

}