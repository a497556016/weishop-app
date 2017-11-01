import { Injectable } from "@angular/core";

@Injectable()
export class CartService {
    _cartItems: object[] = [];
    constructor(

    ) {

    }
    set cartItems(cartItems: object[]) {
        let reCartItems = new Array();
        for (let i in cartItems) {
            let ci = cartItems[i];
            let curCi = null;
            for (let j in reCartItems) {
                if (reCartItems[j].proItemId == ci.proItemId) {
                    curCi = reCartItems[j];
                    break;
                }
            }
            if (curCi != null) {
                curCi.count += ci.count;
            } else {
                curCi = ci;
                reCartItems.push(curCi);
            }

        }
        this._cartItems = reCartItems;
    }
    get cartItems() {
        return this._cartItems;
    }

    addCartitem(cartItem: object) {
        let curItem = null;
        for (let i in this._cartItems) {
            let ci = this._cartItems[i];
            if (ci.proItemId == cartItem.proItemId) {
                curItem = ci;
            }
        }
        if (curItem != null) {
            curItem.count += cartItem.count;
        } else {
            this._cartItems.push(cartItem);
        }
    }
}