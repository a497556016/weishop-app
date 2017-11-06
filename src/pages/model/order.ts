import { OrderList } from "./orderList";

export class Order{
    id:number;
    userId:number;
    userName:string;
    shipId:number;
    shipAddress:string;
    contactNumber:string;
    contactUserName:string;
    totalPrice:number;
    countPrice:number;
    createBy:string;
    createTime:Date = new Date();
    modifyBy:string;
    modifyTime:Date = new Date();
    constructor(){}
}