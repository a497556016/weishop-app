import { LoginPage } from './../login/login';
import { NavController } from 'ionic-angular';
import { Logger } from './../log/logger';
import { User } from './../model/user';
import { Component } from '@angular/core';

@Component({
    templateUrl : 'register.html'
})
export class RegisterPage{
    sexs:{name:string,value:string}[] = [{name:'男',value:'1'},{name:'女',value:'0'}];
    user:User = new User();
    constructor(
        private logger:Logger,
        private navCtrl:NavController
    ){
        this.user.sex = '1';
    }

    onSubmit(){
        console.log(this.user);
        this.logger.info('注册成功！');
        this.navCtrl.push(LoginPage,{
            user : this.user
        });
    }
}