import { Injectable } from '@angular/core';
import { ToastController, AlertController } from "ionic-angular";

@Injectable()
export class MsgService {
    constructor(
        private toastCtrl: ToastController,
        private alertCtrl: AlertController
    ){

    }

    show(msg){
        this.toastCtrl.create({
            message: msg,
            duration: 3000,
            position: 'top'
        }).present();
    }
    alert(msg:string,call?:any){
        this.alertCtrl.create({
            title: '提示',
            subTitle: msg,
            buttons: [{
                text: '确定',
                role : 'cancel',
                handler: data => {
                    if(call){
                        call();
                    }
                }
            }]
        }).present();
    }
    confirm(msg:string,call?:any){
        this.alertCtrl.create({
            title: '提示',
            subTitle: msg,
            buttons: [{
                text: '确定',
                role : 'cancel',
                handler: data => {
                    if(call){
                        call(true);
                    }
                }
            },{
                text: '取消',
                role : 'cancel',
                handler: data => {
                    if(call){
                        call(false);
                    }
                }
            }]
        }).present();
    }
    prompt(msg:string,call?:any) {
        let prompt = this.alertCtrl.create({
            title: '输入',
            message: msg,
            inputs: [
                {
                    name: 'title',
                    placeholder: '请输入'
                },
            ],
            buttons: [
                {
                    text: '取消',
                    role : 'cancel',
                    handler: data => {
                        console.log('Cancel clicked');
                    }
                },
                {
                    text: '确定',
                    handler: data => {
                        console.log('Saved clicked');
                        if(call){
                            call(data);
                        }
                    }
                }
            ]
        });
        prompt.present();
    }
}