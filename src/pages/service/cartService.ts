import { Injectable } from "@angular/core";
import { ShopCart } from "../model/shopCart";
import { HttpService } from "./httpService";
import { MsgService } from "./msgService";

@Injectable()
export class CartService {
    _cartItems: ShopCart[] = [];
    constructor(
        private http:HttpService,
        private msg:MsgService
    ) {

    }
    set cartItems(cartItems: ShopCart[]) {
        this._cartItems = cartItems;
    }
    get cartItems() {
        return this._cartItems;
    }

    addCartitem(cartItem: ShopCart) {
        let curItem = null;
        for (let i in this._cartItems) {
            let ci = this._cartItems[i];
            if (ci.id == cartItem.id) {
                curItem = ci;
            }
        }
        if (curItem != null) {
            curItem.count += cartItem.count;
        } else {
            this._cartItems.push(cartItem);
        }
    }

    deleteById(id:number){
        this.http.post('shopCart/deleteById',{
            id : id
        }).then(result => {
            if(result.code==1){
                let newItems = new Array();
                for (let i in this._cartItems) {
                    let ci = this._cartItems[i];
                    if (ci.id != id) {
                        newItems.push(ci);
                    }
                }
                this._cartItems = newItems;
            }else{
                this.msg.show('删除失败！');
            }
        });
        
    }
}