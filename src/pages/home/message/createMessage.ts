import { StorageService } from './../../service/storageService';
import { HomePage } from './../home';
import { Message } from './../../model/message';
import { FileService } from './../../service/fileService';
import { ModalController, ViewController, NavController, NavParams } from 'ionic-angular';
import { Component } from '@angular/core';
import { CommonProperty } from '../../../common/consts/commonProperty';
@Component({
    templateUrl : 'createMessage.html'
})
export class CreateMessagePage{
    message:Message;
    homePage:HomePage;
    constructor(
        private modalController:ModalController,
        private viewController:ViewController,
        private navCtrl:NavController,
        private fileService:FileService,
        private navParams:NavParams,
        private storageService:StorageService
    ){
        this.message = new Message();
        this.homePage = navParams.get('homePage');
    }

    close(){
        this.viewController.dismiss();
    }

    selectPic(){
        this.fileService.showPicActionSheet({
            success : (data) => {

            },
            error : (err) => {
                let path = err.source;
                this.message.picUrl = path;
            }
        });
    }

    createMessage(){
        
        this.close();
    }
}