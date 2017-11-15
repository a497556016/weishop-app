import { NavController } from 'ionic-angular';
import { MsgService } from './../service/msgService';
import { User } from './../model/user';
import { UserService } from './../service/userService';
import { HttpService } from './../service/httpService';
import { Component } from '@angular/core';
import { DatePipe } from '@angular/common';

@Component({
    templateUrl : 'editUser.html'
})
export class EditUserPage{
    userInfo:any = {};
    constructor(
        private http: HttpService,
        private userService: UserService,
        private msg: MsgService,
        private navCtrl: NavController,
        private datePipe: DatePipe
    ){

    }

    ionViewWillEnter(){
        this.http.get('user/selectOne',{
            id : this.userService.curUser.id
        }).then(result => {
            if(result.code == 1){
                this.userInfo = result.data;
                this.userInfo.birthday = this.datePipe.transform(new Date(result.data.birthday),'yyyy-MM-dd');// ;
            }
        });
    }

    ionViewDidLoad(){
     
    }

    submitUserInfo(){
        let user = new User();
        user.id = this.userInfo.id;
        user.userName = this.userInfo.userName;
        user.password = this.userInfo.password;
        user.sex = this.userInfo.sex;
        user.email = this.userInfo.email;
        user.phone = this.userInfo.phone;
        user.birthday = this.userInfo.birthday;
        user.cardId = this.userInfo.cardId;

        this.http.postJson('user/saveOrUpdate',JSON.stringify(user),{
            loadMask : true
        }).then(result => {
            if(result.code == 1){
                this.msg.show('编辑个人信息完成');
                this.navCtrl.pop();
            }else{
                this.msg.error(result.msg);
            }
        });
    }
}