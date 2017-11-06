import { EditShipAddressPage } from './editShipAddress';
import { Component } from "@angular/core";
import { ShipAddress } from "../model/shipAddress";
import { HttpService } from "../service/httpService";
import { UserService } from "../service/userService";
import { MsgService } from "../service/msgService";
import { NavController } from "ionic-angular";


@Component({
    templateUrl : 'shipAddress.html'
})
export class ShipAddressPage{
    shipAddressList:ShipAddress[];
    constructor(
        private http: HttpService,
        private userService: UserService,
        private msg: MsgService,
        private navCtrl: NavController
    ){
        
        
    }

    ionViewWillEnter(){
        this.loadShipAddress();
    }

    loadShipAddress(){
        this.http.get('shipAddress/selectList',{
            userId : this.userService.curUser.id
        }).then(result => {
            if(result.code==1){
                this.shipAddressList = result.data;
            }else{
                this.msg.alert(result.msg);
            }
        });
    }

    selectShippAddress(shipAddress){
        let createOrderPage = this.navCtrl.getPrevious().instance;
        
        createOrderPage.shipAddress = shipAddress;

        console.log(createOrderPage);
        this.navCtrl.pop();
    }

    editShipAddress(){
        this.navCtrl.push(EditShipAddressPage,{
            
        });
    }
}