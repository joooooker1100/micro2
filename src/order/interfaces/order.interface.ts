export interface OrderInterface{
    totalPrice:number;
    customer:string;
    items:[{
        sku:string;
        qt:number;
        price:number
    }]
}