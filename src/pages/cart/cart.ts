import { Component } from "@angular/core";
import { StorageService } from "../service/storageService";
import { CommonProperty } from "../../common/consts/commonProperty";
import { CartService } from "../service/cartService";
import { UserService } from "../service/userService";
import { HttpService } from "../service/httpService";
import { MsgService } from "../service/msgService";

@Component({
    templateUrl: 'cart.html'
})
export class CartPage {
    cartItems: object[];
    constructor(
        private storage: StorageService,
        private cartService: CartService,
        private userService:UserService,
        private http:HttpService,
        private msgService:MsgService
    ) {
        //开始初始化用户的购物车
        this.loadUserShopCart();
    }

    loadUserShopCart() {
        let user = this.userService.curUser;
        this.http.get("shopCart/queryUserShopCart", {
            userId: user.id
        }).then(result => {
            if (result.code == 1) {
                this.cartService.cartItems = result.data;
            } else {
                this.msgService.alert(result.msg);
            }
        });
    }
}