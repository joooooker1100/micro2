import { Schema } from "mongoose"
import {v4 as uuid} from 'uuid'

export const orderSchemaName:string="Order";
const ItemSchema = new Schema({
    sku:String,
    qt:Number,
    price:Number
})

export const orderScema=new Schema(
{  
    _id:{type:String,default:uuid},
    totalPrice:Number,
    customer:String,
    items:[ItemSchema]
})