import { MsgService } from './../service/msgService';
import { HttpService } from './../service/httpService';
import { Component } from "@angular/core";
import { ShopCart } from "../model/shopCart";
import { NavParams, NavController, LoadingController } from "ionic-angular";
import { ShipAddressPage } from "../shipAddress/shipAddress";
import { ShipAddress } from "../model/shipAddress";
import { Order } from '../model/order';
import { OrderList } from '../model/orderList';
import { UserService } from '../service/userService';

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
        private msg:MsgService,
        private userService:UserService,
        private loadCtrl:LoadingController
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
        console.log('提交订单', this.cartItems);
        let order = new Order();
        order.userId = this.userService.curUser.id;
        order.userName = this.userService.curUser.userName;
        order.shipId = this.shipAddress.id;
        order.shipAddress = this.shipAddress.address;
        order.contactUserName = this.shipAddress.contactUserName;
        order.contactNumber = this.shipAddress.contactNumber;
        order.totalPrice = this.totalPrice;
        order.countPrice = this.needPayPrice;
        order.createBy = this.userService.curUser.userName;

        let orderList = new Array<OrderList>();
        let delShopCartIds = new Array<number>();
        for(let i in this.cartItems){
            let ci = this.cartItems[i];
            let ol = OrderList.createByShopCart(ci);
            orderList.push(ol);

            delShopCartIds.push(ci.id);
        }

        let orderDto = {
            order : order,
            orderList : orderList,
            delShopCartIds : delShopCartIds
        };

        console.log('提交订单', order);
        let loading = this.loadCtrl.create({
            content : '正在提交订单...'
        });
        loading.present();
        this.http.postJson('order/createOrder',JSON.stringify(orderDto)).then(result => {
            loading.dismiss();
            if(result.code == 1){
                this.msg.show('订单创建成功，请及时支付！');
                this.navCtrl.pop();
            }else{
                this.msg.alert(result.msg);
            }
        });
    }
}