import { Tab } from 'ionic-angular';
import { SELECT_TAB } from './../../common/consts/commonProperty';
import { LoginPage } from './../login/login';
import { NavController, Tabs } from 'ionic-angular';
import { Component, ViewChild } from '@angular/core';

import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';
import { CartPage } from '../cart/cart';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  @ViewChild('mainTabs') tabs:Tabs;//加这句以及引用两个模块
  tab1Root = HomePage;
  tab2Root = CartPage;
  tab3Root = ContactPage;

  constructor(
    
  ) {
    
  }



  changeTabs(){
    let selectTab:Tab;
    for(var i in this.tabs._tabs){
      if(this.tabs._tabs[i].isSelected){
        selectTab = this.tabs._tabs[i];
      }
    }
    if(selectTab&&selectTab.tabTitle=='购物车'){
      
    }
  }

  ionViewDidLoad() {
    // let curUser = this.userService.curUser;
    // if(!curUser){
    //   this.navCtrl.setRoot(LoginPage);
    // }
  }
}
