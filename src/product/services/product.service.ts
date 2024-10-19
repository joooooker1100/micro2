import { Injectable } from "@nestjs/common";
import { ProductInterface } from "../interfaces/product.interface";
import { Model } from "mongoose";
import { ProductModel } from "../model/product.model";
import { InjectModel } from "@nestjs/mongoose";
import { productSchemaName } from "../schema/product.schema";
import { HttpService } from "@nestjs/axios";

@Injectable()
export class ProductService {

    constructor(
        @InjectModel(productSchemaName)
        private readonly productModel: Model<ProductModel>,
    ) {
    }
    public async deleteProduct(sku: string): Promise<void> {
        await this.productModel.deleteOne({ sku })
    }
    public async upsert(product: ProductInterface): Promise<void> {
        await this.productModel.updateOne({ sku: product.sku }, { $set: product }, { upsert: true })
    }
    public async setStatus(product: ProductInterface): Promise<void> {

        await this.productModel.updateOne({ sku: product.sku }, { $set: { status: product.status } }, { upsert: true })
    }
    public async getProducts() {
        return this.productModel.find();
    }
    public async checkAvailability(sku: string): Promise<ProductModel> {
        return this.productModel.findOne({ sku })

    }
}