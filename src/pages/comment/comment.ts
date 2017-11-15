import { Comment } from './../model/comment';
import { OrderList } from './../model/orderList';
import { NavParams } from 'ionic-angular';
import { Component } from '@angular/core';

@Component({
    templateUrl : 'comment.html'
})
export class CommentPage{
    orderList:Array<OrderList>;
    
    starsNumber = [1,2,3,4,5];
    comment:Comment = new Comment(this.starsNumber.length);
    constructor(
        private navParams: NavParams
    ){
        this.orderList = this.navParams.get('orderList');
        
    }
}