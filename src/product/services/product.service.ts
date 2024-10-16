import { Injectable } from "@nestjs/common";
import { ProductInterface } from "../interfaces/product.interface";
import { Model } from "mongoose";
import { ProductModel } from "../model/product.model";
import { InjectModel } from "@nestjs/mongoose";
import { productSchemaName } from "../schema/product.schema";

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
    public async getProducts() {
        return this.productModel.find();
    }
    public async getProduct(sku: string) {
        const product = await this.productModel.findOne({ sku })
        console.log(product)
        return product

    }
    public async showMessage(product){
        if(product.qt>0){
            console.log("mojod")
        }else{
            console.log("na mojod")
        }
     
       
    }
}