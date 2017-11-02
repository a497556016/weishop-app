import { Component } from "@angular/core";
import { ShopCart } from "../model/shopCart";
import { NavParams, NavController } from "ionic-angular";
import { ShipAddressPage } from "../shipAddress/shipAddress";
import { ShipAddress } from "../model/shipAddress";

@Component({
    templateUrl : 'createOrder.html'
})
export class CreateOrderPage{
    cartItems:ShopCart[];
    shipAddress:ShipAddress;
    constructor(
        private navParam : NavParams,
        public navCtrl: NavController
    ){
        this.cartItems = this.navParam.get('cartItems');
    }

    selectShipAddress(){
        this.navCtrl.push(ShipAddressPage);
    }

    ionViewDidEnter(){
        console.log('...........',this.shipAddress)
    }
}