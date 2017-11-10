import { Product } from './../../model/product';
import { Component } from "@angular/core";
import { NavParams, ModalController, PopoverController, NavController, ViewController } from "ionic-angular";
import { ModelChoosePage } from "./modelChoose";
import { HttpService } from "../../service/httpService";
import { MsgService } from "../../service/msgService";
import { StorageService } from "../../service/storageService";
import { UserService } from "../../service/userService";
import { CartService } from "../../service/cartService";


@Component({
    templateUrl : 'item.html'
})
export class ProductItemPage{
    product:Product;
    productItem:any = {
        storeTotal : 0
    };
    model:string[];
    size:string[];
    selectItem:any = {
        model : '',
        size : ''
    };
    constructor(
        private navParams:NavParams,
        public navCtrl:NavController,
        private popoverCtrl: PopoverController,
        private viewCtrl:ViewController,
        private http:HttpService,
        private msg:MsgService,
        private storage:StorageService,
        private userService:UserService,
        private cartService:CartService
    ){
        this.product = navParams.get('product');
        this.loadModelAndSize();
        this.loadProductDetail();
    }

    loadProductDetail(){
        this.http.get('productItem/selectOne',{
            pCode : this.product.code
        }).then(result => {
            if(result.code == 1){
                this.productItem = result.data;
            }else{
                this.msg.show(result.msg);
            }
        });
    }

    loadModelAndSize(){
        this.http.get("productItem/selectModelSizeByProduct",{
            code : this.product.code
        }).then(data => {
            if(data.code==1){
                this.model = data.data.model;
                this.size = data.data.size;
            }else{
                this.msg.alert(data.msg);
            }
        });
    }

    selectModel(){
        this.http.get('productItem/getSizeByModel',{
            code : this.product.code,
            model : this.selectItem.model
        }).then(result => {
            if(result.code == 1){
                this.size = result.data;
            }
        });
    }

    selectSize(){
        this.http.get('productItem/getModelBySize',{
            code : this.product.code,
            size : this.selectItem.size
        }).then(result => {
            if(result.code == 1){
                this.model = result.data;
            }
        });
    }

    /**
     * 加入购物车
     */
    putInCart(){
        if(!this.selectItem.model){
            this.msg.alert('请选择颜色');
            return;
        }
        if(!this.selectItem.size){
            this.msg.alert('请选择尺寸');
            return;
        }
        if(!this.selectItem.count){
            this.msg.alert('请选择数量');
            return;
        }
        this.http.get("productItem/putInCart",{
            model : this.selectItem.model,
            size : this.selectItem.size,
            count : this.selectItem.count,
            code : this.product.code,
            userId : this.userService.curUser.id
        }).then(data => {
            if(data.code==1){
                this.cartService.addCartitem(data.data);
                this.msg.show('商品已经加入购物车！');
                this.viewCtrl.dismiss();
            }else{
                this.msg.alert(data.msg);
            }
        });
    }
}