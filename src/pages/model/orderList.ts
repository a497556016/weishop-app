import { ShopCart } from "./shopCart";


export class OrderList{
    id:number;
	orderId:number;
	proItemId:number;
	name:string;
	code:string;
	model:string;
	size:string;
	unit:string;
	description:string;
	count:number;
	price:number;
	discount:number;
    constructor(){

    }

    public static createByShopCart(shopCart:ShopCart):OrderList{
        let ol = new OrderList();
        ol.proItemId = shopCart.proItemId;
        ol.name = shopCart.name;
        ol.code = shopCart.code;
        ol.model = shopCart.model;
        ol.size = shopCart.size;
        ol.unit = shopCart.unit;
        ol.description = shopCart.description;
        ol.count = shopCart.count;
        ol.price = shopCart.price;
        ol.discount = shopCart.discount;
        return ol;
    }
}