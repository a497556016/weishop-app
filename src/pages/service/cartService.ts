import { Injectable } from "@angular/core";

@Injectable()
export class CartService{
    cartItems:object[] = [{
        userId : null,
        proItemId : null,
        name : null,
        code : null,
        description : null,
        price : 0,
        discount : 1,
        picUrl : ''
    }];
    constructor(

    ){

    }
}