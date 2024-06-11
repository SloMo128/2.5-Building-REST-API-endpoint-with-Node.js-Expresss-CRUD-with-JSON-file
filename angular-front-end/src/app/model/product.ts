export class Product {
    id: number;
    product_name:string;
    vendor:string;
    price: number;

    constructor(id: number, product_name:string, vendor:string, price: number) {
        this.id = id;
        this.product_name = product_name;
        this.vendor = vendor;
        this.price = price;
    }
}