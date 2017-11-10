import { ShipAddress } from './../model/shipAddress';
import { CreateOrderPage } from './../order/createOrder';
import { EditShipAddressPage } from './editShipAddress';
import { Component } from "@angular/core";
import { HttpService } from "../service/httpService";
import { UserService } from "../service/userService";
import { MsgService } from "../service/msgService";
import { NavController } from "ionic-angular";


@Component({
    templateUrl: 'shipAddress.html'
})
export class ShipAddressPage {
    shipAddressList: ShipAddress[] = new Array<ShipAddress>();
    constructor(
        private http: HttpService,
        private userService: UserService,
        private msg: MsgService,
        private navCtrl: NavController
    ) {


    }

    ionViewWillEnter() {
        this.loadShipAddress();
    }

    loadShipAddress() {
        this.shipAddressList = new Array<ShipAddress>();
        this.http.get('shipAddress/selectList', {
            userId: this.userService.curUser.id
        }).then(result => {
            if (result.code == 1) {
                for(let i in result.data){
                    let s = result.data[i];
                    let sa = new ShipAddress();
                    sa.copyFromObj(s);
                    this.shipAddressList.push(sa);
                }
            } else {
                this.msg.alert(result.msg);
            }
        });
    }

    selectShippAddress(shipAddress) {
        let createOrderPage = this.navCtrl.getPrevious().instance;
        if (createOrderPage instanceof CreateOrderPage) {
            createOrderPage.shipAddress = shipAddress;

            console.log(createOrderPage);
            this.navCtrl.pop();
        }else{
            this.navCtrl.push(EditShipAddressPage,{
                shipAddress : shipAddress
            });
        }
    }

    editShipAddress() {
        this.navCtrl.push(EditShipAddressPage, {

        });
    }

    deleteShipAddress(shipAddress){
        let me = this;
        this.msg.confirm('是否删除该收获地址？',yes => {
            if(yes){
                me.http.post('shipAddress/deleteById',{
                    id : shipAddress.id
                },{
                    loadMask : true,
                    loadMsg : '正在删除...'
                }).then(result => {
                    if(result.code == 1){
                        me.msg.show('删除成功！');
                        me.loadShipAddress();
                    }else{
                        me.msg.show(result.msg);
                    }
                });
            }
        });
       
    }
}