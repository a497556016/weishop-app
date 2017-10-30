import { MyApp } from './../../app/app.component';
import { LoginPage } from './../login/login';
import { UserService } from './../service/userService';
import { User } from './../model/user';
import { Component, ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {
  loginUser:User;
  constructor(
    public navCtrl: NavController,
    private userService:UserService,
    // private myApp:MyApp
  ) {
    this.loginUser = userService.curUser;
  }

  logout(){
    this.userService.removeLoginUser();
    // this.myApp.rootPage = LoginPage;
    this.navCtrl.parent.parent.setRoot(LoginPage);
  }
}
