import { StorageService } from './../service/storageService';
import { MsgService } from './../service/msgService';
import { HttpService } from './../service/httpService';
import { CreateMessagePage } from './message/createMessage';
import { Message } from './../model/message';
import { Component } from '@angular/core';
import { NavController,ModalController } from 'ionic-angular';

import 'rxjs/add/operator/toPromise';
import { Product } from '../model/product';
import { ProductItemPage } from './item/item';
import { CommonProperty } from '../../common/consts/commonProperty';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  slidePics:string[] = [
    'assets/images/loginBg.jpg',
    'assets/images/girl.jpg'
  ];
  products:Product[] = [];
  constructor(
    public navCtrl: NavController,
    private http:HttpService,
    private modalController:ModalController,
    private msgService: MsgService,
    private storageService:StorageService
  ) {
    this.loadProducts();
  }

  loadProducts(){
    console.log("开始加载商品列表")
    this.http.get('product/listProduct',{
      current : 1,
      size : 100
    })
    .then(data => {
      if(data.code==1){
        this.products = data.rows;
      }else{
        this.msgService.alert("系统异常！");
      }
    });
  }

  showDetail(product){
    console.log(product);
    
    this.navCtrl.push(ProductItemPage,{
      product : product
    });
    
  }

  createMessage(){
    
    this.msgService.confirm('是否要创建一个消息？',data => {
      if(data){
        this.modalController.create(CreateMessagePage,{
          homePage : this
        }).present();
      }
    })
  }

}
