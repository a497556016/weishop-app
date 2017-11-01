import { LoginPage } from './../login/login';
import { NavController, Tabs } from 'ionic-angular';
import { UserService } from './../service/userService';
import { Component, ViewChild } from '@angular/core';

import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';
import { CartPage } from '../cart/cart';
import { HttpService } from '../service/httpService';
import { StorageService } from '../service/storageService';
import { CommonProperty } from '../../common/consts/commonProperty';
import { CartService } from '../service/cartService';
import { MsgService } from '../service/msgService';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  @ViewChild('mainTabs') tabs:Tabs;//加这句以及引用两个模块
  tab1Root = HomePage;
  tab2Root = CartPage;
  tab3Root = ContactPage;

  constructor(
    private userService:UserService,
    private navCtrl:NavController,
    private http:HttpService,
    private storage:StorageService,
    private cartService:CartService,
    private msgService:MsgService
  ) {
    
  }



  changeTabs(){
    for(var i in this.tabs._tabs){
      if(this.tabs._tabs[i].isSelected){
        CommonProperty.SELECT_TAB = this.tabs._tabs[i];
      }
    }
    if(CommonProperty.SELECT_TAB&&CommonProperty.SELECT_TAB.tabTitle=='购物车'){
      
    }
  }

  ionViewDidLoad() {
    // let curUser = this.userService.curUser;
    // if(!curUser){
    //   this.navCtrl.setRoot(LoginPage);
    // }
  }
}