import { NavParams } from 'ionic-angular';
import { Component } from '@angular/core';

@Component({
    templateUrl : 'message.html'
})
export class MessageDetailPage{
    msg:any;
    constructor(private navParams:NavParams){
        this.msg = navParams.get('msg');
    }
}