import { ShipAddress } from './../model/shipAddress';
import { AddressPage } from './addresPages/address';
import { Component } from '@angular/core';
import { Combo } from '../model/combo';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpService } from '../service/httpService';
import { UserService } from '../service/userService';
import { NavController, LoadingController, NavParams } from 'ionic-angular';
import { MsgService } from '../service/msgService';

declare const AMap: any;//声明

@Component({
    templateUrl: 'editShipAddress.html'
})
export class EditShipAddressPage {
    shipAddress:ShipAddress = new ShipAddress();

    shipForm:FormGroup;
    constructor(
       private http:HttpService,
       private userService:UserService,
       private navCtrl:NavController,
       private msg:MsgService,
       private loadingCtrl: LoadingController,
       private navParams:NavParams
    ) {
        let sa = this.navParams.get('shipAddress');
        if(sa){
            this.shipAddress = sa as ShipAddress;
        }
    }

    ionViewDidLoad(): void {
        //this.msg.show('ionViewDidLoad')
        this.shipForm = new FormGroup({
            'contactNumber' : new FormControl(this.shipAddress.contactNumber,[Validators.required,Validators.pattern('\d{11,}s')])
        });
    }

    selectArea(){
        this.shipAddress.province = '';
        this.shipAddress.city = '';
        this.shipAddress.street = '';
        this.shipAddress.community = '';
        this.navCtrl.push(AddressPage,{
            query : this.shipAddress.country,
            level : 0,
            editPage : this
        });
    }

    saveShipAddress(){
        console.log(this.shipAddress);
        let loading = this.loadingCtrl.create({
            content : '正在保存...'
        });
        loading.present();
        this.shipAddress.userId = this.userService.curUser.id;
        this.shipAddress.appendAddress();

        this.http.postJson('shipAddress/saveOrUpdate',JSON.stringify(this.shipAddress)).then(result => {
            loading.dismiss();
            if(result.code == 1){
                this.msg.show('添加收货成功！');
               
                this.navCtrl.pop();
            }else{
                this.msg.alert(result.msg)
            }
        });
    }
}