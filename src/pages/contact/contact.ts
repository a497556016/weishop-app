import { EditUserPage } from './../user/editUser';
import { HttpService } from './../service/httpService';
import { ShipAddressPage } from './../shipAddress/shipAddress';
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
    private msg: MsgService,
    private http: HttpService
  ) {
    this.loginUser = this.userService.curUser;
  }

  ionViewWillEnter(){

  }

  editUserInfo(){
    this.navCtrl.push(EditUserPage,{

    });
  }

  logout() {
    let me = this;
    this.msg.confirm('是否退出当前账号？', function (yes) {
      if (yes) {
        me.userService.removeLoginUser();
        // this.myApp.rootPage = LoginPage;
        me.navCtrl.parent.parent.setRoot(LoginPage);
      }
    });

  }

  toOrderList() {
    this.navCtrl.push(ListOrderPage,{
      
    });
  }

  toShipAddressList(){
    this.navCtrl.push(ShipAddressPage,{});
  }
}
