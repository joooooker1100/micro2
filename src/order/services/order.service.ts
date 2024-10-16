import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { orderSchemaName } from "../schema/order.schema";
import { OrderModel } from "../model/order.model";
import { Model } from "mongoose";
import { OrderInterface } from "../interfaces/order.interface";

@Injectable()
export class OrderService {
    constructor(
        @InjectModel(orderSchemaName)
        private readonly orderModel: Model<OrderModel>
    ) { }
    public async order(order: OrderInterface): Promise<OrderModel> {
        return this.orderModel.create(order);
    }
    public async getOrder(customer: string) {
        return this.orderModel.findOne({ customer })



    }

}