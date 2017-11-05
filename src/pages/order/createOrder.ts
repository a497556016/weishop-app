import { MsgService } from './../service/msgService';
import { HttpService } from './../service/httpService';
import { Component } from "@angular/core";
import { ShopCart } from "../model/shopCart";
import { NavParams, NavController } from "ionic-angular";
import { ShipAddressPage } from "../shipAddress/shipAddress";
import { ShipAddress } from "../model/shipAddress";

@Component({
    templateUrl: 'createOrder.html'
})
export class CreateOrderPage {
    cartItems: ShopCart[];
    shipAddress: ShipAddress;
    discountPrice: number = 0.00;
    totalPrice: number = 0.00;
    needPayPrice: number = 0.00;
    constructor(
        private navParam: NavParams,
        public navCtrl: NavController,
        private http:HttpService,
        private msg:MsgService
    ) {
        this.cartItems = this.navParam.get('cartItems');
        this.computePrice();
        this.loadDefaultShipAddress();
    }

    loadDefaultShipAddress(){
        this.http.get('shipAddress/selectOne',{
            isDefault : 1
        }).then(result => {
            if(result.code == 1){
                this.shipAddress = result.data;
            }else{
                this.msg.alert(result.msg);
            }
        });
    }

    selectShipAddress() {
        this.navCtrl.push(ShipAddressPage);
    }

    ionViewDidEnter() {
        console.log('...........', this.shipAddress)
    }

    computePrice() {
        this.totalPrice = 0.00;
        this.discountPrice = 0.00;
        for (let i in this.cartItems) {
            let ci = this.cartItems[i];
            this.totalPrice += (ci.price * ci.count);
            this.discountPrice += (ci.price * (1 - ci.discount) * ci.count);
        }
        this.needPayPrice = this.totalPrice - this.discountPrice;
        this.discountPrice = parseFloat(this.discountPrice.toFixed(2));
    }

    submitOrder() {
        console.log('提交订单', this.cartItems)
    }
}