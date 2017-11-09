import { MyApp } from './../../app/app.component';
import { RegisterPage } from './../register/register';
import { TabsPage } from './../tabs/tabs';
import { App, ViewController, NavController, NavParams } from 'ionic-angular';
import { Logger } from './../log/logger';
import { UserService } from './../service/userService';
import { User } from './../model/user';
import { Component } from '@angular/core';
import { HttpService } from '../service/httpService';
import { MsgService } from '../service/msgService';

@Component({
    selector : 'loginPage',
    templateUrl : 'login.html'
})
export class LoginPage{
    username:string;
    password:string;
    constructor(
        private userService:UserService,
        private logger:Logger,
        private viewCtrl:ViewController,
        private appCtrl:App,
        public navCtrl:NavController,
        private navParams:NavParams,
        private myApp:MyApp,
        private httpService:HttpService,
        private msgService:MsgService
    ){
        let user = navParams.get('user');
        if(user){
            this.username = user.name;
            this.password = user.pwd;
        }
    }

    login(){
        console.log(this.username,this.password)
        this.httpService.get("user/loginOrRegister",{
            userAccount : this.username,
            password : this.password
        }).then(data => {
            if(data.code==1){
                let user = new User();
                user.userAccount = data.data.userAccount;
                user.id = data.data.id;
                user.userName = data.data.userName;

                this.userService.saveUser(user);
                this.logger.info('登录系统成功');
                //this.viewCtrl.dismiss();
                this.navCtrl.push(TabsPage);
                this.navCtrl.remove(0,1);
                //this.appCtrl.getRootNav().push(TabsPage);
            }else{
                this.msgService.alert(data.msg);
            }
        });
        
    }

    register(){
        this.navCtrl.push(RegisterPage);
    }
}