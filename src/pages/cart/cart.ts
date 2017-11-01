import { Component } from "@angular/core";
import { StorageService } from "../service/storageService";
import { CommonProperty } from "../../common/consts/commonProperty";
import { CartService } from "../service/cartService";
import { UserService } from "../service/userService";
import { HttpService } from "../service/httpService";
import { MsgService } from "../service/msgService";
import { LoadingController } from "ionic-angular";

@Component({
    templateUrl: 'cart.html'
})
export class CartPage {
    discountPrice: number = 0.00;
    totalPrice: number = 0.00;
    needPayPrice: number = 0.00;
    constructor(
        private storage: StorageService,
        private cartService: CartService,
        private userService: UserService,
        private http: HttpService,
        private msgService: MsgService,
        private loadingCtrl: LoadingController
    ) {
        //开始初始化用户的购物车
        this.loadUserShopCart();
    }

    loadUserShopCart() {
        let loading = this.loadingCtrl.create({
            content: '请稍候...'
        });
        loading.present();
        let user = this.userService.curUser;
        this.http.get("shopCart/queryUserShopCart", {
            userId: user.id
        }).then(result => {
            loading.dismiss();
            if (result.code == 1) {
                this.cartService.cartItems = result.data;
                this.computePrice(true);
            } else {
                this.msgService.alert(result.msg);
            }
        });
    }

    /**
     * 结算
     */
    balance() {
        let cartItems = [];
        for (let i in this.cartService.cartItems) {
            let ci = this.cartService.cartItems;
            cartItems.push({

            });
        }
    }

    selectCartItem() {
        this.computePrice(false);
    }

    computePrice(checkAll) {
        this.totalPrice = 0.00;
        this.discountPrice = 0.00;
        for (let i in this.cartService.cartItems) {
            let ci = this.cartService.cartItems[i];
            if(checkAll){
                ci.checked = true;
            }
            if(ci.checked){
                this.totalPrice += (ci.price * ci.count);
                this.discountPrice += (ci.price * (1 - ci.discount) * ci.count);
            }
        }
        this.needPayPrice = this.totalPrice - this.discountPrice;
        this.discountPrice = this.discountPrice.toFixed(2);
    }
}