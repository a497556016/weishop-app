import { MyApp } from './../../app/app.component';
import { LoginPage } from './../login/login';
import { UserService } from './../service/userService';
import { User } from './../model/user';
import { Component, ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';
import { MsgService } from '../service/msgService';
import { ListOrderPage } from '../order/listOrder';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {
  loginUser: User;
  constructor(
    public navCtrl: NavController,
    private userService: UserService,
    // private myApp:MyApp,
    private msg: MsgService
  ) {
    this.loginUser = userService.curUser;
  }

  logout() {
    this.msg.confirm('是否退出当前账号？', function (yes) {
      if (yes) {
        this.userService.removeLoginUser();
        // this.myApp.rootPage = LoginPage;
        this.navCtrl.parent.parent.setRoot(LoginPage);
      }
    });

  }

  toOrderList() {
    this.navCtrl.push(ListOrderPage,{
      
    });
  }
}
