import { EditShipAddressPage } from './../editShipAddress';
import { Combo } from './../../model/combo';
import { NavParams, NavController } from 'ionic-angular';
import { Component } from '@angular/core';

declare const AMap: any;//声明

@Component({
    templateUrl: 'address.html'
})
export class AddressPage {
    districtSearch: any;
    query: string;
    level: number;
    data: Array<Combo>;
    editPage: any;
    levelMap: object = {
        0: 'country',
        1: 'province',
        2: 'city',
        3: 'district'
    };
    constructor(
        private navParams: NavParams,
        private navCtrl: NavController
    ) {
        this.query = this.navParams.get('query');
        this.level = this.navParams.get('level');
        this.editPage = this.navParams.get('editPage');
        let me = this;
        AMap.service('AMap.DistrictSearch', function () {
            me.districtSearch = new AMap.DistrictSearch({
                subDistrict: 1
            });
            me.initData();
        });
    }

    initData() {
        let me = this;
        this.districtSearch.setLevel(this.level);
        //调用查询方法
        this.districtSearch.search(this.query, function (status, result) {
            var subDistricts = result.districtList[0].districtList;
            me.data = me.toComboData(subDistricts);
        })
    }

    toComboData(subDistricts) {
        var data = new Array<Combo>();
        for (let i in subDistricts) {
            var d = subDistricts[i];
            data.push(new Combo(d.name, d.name));
        }
        // console.log(data)
        return data;
    }

    selectNext(code) {
        if (this.level == 0) {
            this.editPage.shipAddress.province = code;
            this.editPage.shipAddress.city = '';
            this.editPage.shipAddress.street = '';
            this.editPage.shipAddress.community = '';
        } else if (this.level == 1) {
            this.editPage.shipAddress.city = code;
        } else if (this.level == 2) {
            this.editPage.shipAddress.street = code;
        } else if (this.level == 3) {
            this.editPage.shipAddress.community = code;
        }
        if (this.level == 3) {
            let len = this.navCtrl.length();
            this.navCtrl.remove(len-this.level-1,this.level+1);
        } else {
            this.navCtrl.push(AddressPage, {
                query: code,
                level: this.level + 1,
                editPage: this.editPage
            });
        }
    }
}