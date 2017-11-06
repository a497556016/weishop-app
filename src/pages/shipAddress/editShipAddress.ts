import { Component } from '@angular/core';
import { Combo } from '../model/combo';
import { ShipAddress } from '../model/shipAddress';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpService } from '../service/httpService';
import { UserService } from '../service/userService';
import { NavController, LoadingController } from 'ionic-angular';
import { MsgService } from '../service/msgService';

declare const AMap: any;//声明

@Component({
    templateUrl: 'editShipAddress.html'
})
export class EditShipAddressPage {
    districtSearch: any;
    provinceData:Array<Combo>;
    cityData:Array<Combo>;
    streetData:Array<Combo>;
    communityData:Array<Combo>;

    shipAddress:ShipAddress = new ShipAddress();

    shipForm:FormGroup;
    constructor(
       private http:HttpService,
       private userService:UserService,
       private navCtrl:NavController,
       private msg:MsgService,
       private loadingCtrl: LoadingController
    ) {
        let me = this;
        AMap.service('AMap.DistrictSearch', function(){
            me.districtSearch = new AMap.DistrictSearch({
                subDistrict : 1
            });
            me.initProvinceSelect();
        });
        
    }

    ionViewDidLoad(): void {
        //this.msg.show('ionViewDidLoad')
        this.shipForm = new FormGroup({
            'contactNumber' : new FormControl(this.shipAddress.contactNumber,[Validators.required,Validators.pattern('\d{11,}s')])
        });
    }

    toComboData(subDistricts){
        var data = new Array<Combo>();
        for(let i in subDistricts){
            var d = subDistricts[i];
            data.push(new Combo(d.name,d.name));
        }
        console.log(data)
        return data;
    }

    initProvinceSelect(){
        let me = this;
        this.districtSearch.setLevel('country');
        //调用查询方法
        this.districtSearch.search(this.shipAddress.country, function (status, result) {
            var subDistricts = result.districtList[0].districtList;
            me.provinceData = me.toComboData(subDistricts);
        })
    }

    initCitySelect(){
        let me = this;
        this.districtSearch.setLevel('province');
        //调用查询方法
        this.districtSearch.search(this.shipAddress.province, function (status, result) {
            var subDistricts = result.districtList[0].districtList;
            me.cityData = me.toComboData(subDistricts);
        })
    }

    initStreetSelect(){
        let me = this;
        this.districtSearch.setLevel('city');
        //调用查询方法
        this.districtSearch.search(this.shipAddress.city, function (status, result) {
            var subDistricts = result.districtList[0].districtList;
            me.streetData = me.toComboData(subDistricts);
        })
    }

    initCommunitySelect(){
        let me = this;
        this.districtSearch.setLevel('district');
        //调用查询方法
        this.districtSearch.search(this.shipAddress.street, function (status, result) {
            var subDistricts = result.districtList[0].districtList;
            me.communityData = me.toComboData(subDistricts);
        })
    }

    saveShipAddress(){
        console.log(this.shipAddress);
        let loading = this.loadingCtrl.create({
            content : '正在保存...'
        });
        loading.present();
        this.shipAddress.userId = this.userService.curUser.id;
        this.shipAddress.setAddress();
        this.http.postJson('shipAddress/save',JSON.stringify(this.shipAddress)).then(result => {
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