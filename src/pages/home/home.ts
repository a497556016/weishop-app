import { StorageService } from './../service/storageService';
import { MsgService } from './../service/msgService';
import { HttpService } from './../service/httpService';
import { CreateMessagePage } from './message/createMessage';
import { Component, ViewChild } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';

import 'rxjs/add/operator/toPromise';
import { Product } from '../model/product';
import { ProductItemPage } from './item/item';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  products: Product[] = [];
  adProducts: Product[] = [];
  @ViewChild('ionSlides') slides;

  constructor(
    public navCtrl: NavController,
    private http: HttpService,
    private modalController: ModalController,
    private msgService: MsgService
  ) {
    this.loadProducts();
  }

  autoPlay() {
    this.slides.startAutoplay();
  }

  //页面进入时启动自动播放  
  ionViewWillEnter() {
    if (this.slides) {
      this.slides.startAutoplay();
    }

  }

  //页面离开时停止自动播放  
  ionViewDidLeave() {
    this.slides.stopAutoplay();
  }

  loadProducts(success?) {
    console.log("开始加载商品列表")
    this.http.get('product/listProduct')
      .then(data => {
        if (success) {
          success();
        }
        if (data.code == 1) {
          this.adProducts = data.data.p1;
          this.products = data.data.p2;
        } else {
          this.msgService.alert("系统异常！");
        }
      });

  }

  doRefresh(refresher) {
    this.loadProducts(() => {
      refresher.complete();
    });
  }

  doInfinite(infiniteScroll) {
    console.log('Begin async operation');

    setTimeout(() => {
      console.log('Async operation has ended');
      infiniteScroll.complete();
    }, 500);
  }

  showDetail(product) {
    console.log(product);

    this.navCtrl.push(ProductItemPage, {
      product: product
    });

  }

  ionSlideTap(slide) {
    let i = this.slides.clickedSlide.id;
    this.showDetail(this.adProducts[i]);
  }

  createMessage() {

    this.msgService.confirm('是否要创建一个消息？', data => {
      if (data) {
        this.modalController.create(CreateMessagePage, {
          homePage: this
        }).present();
      }
    })
  }

}
