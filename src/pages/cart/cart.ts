import { Component } from "@angular/core";
import { CartService } from "../service/cartService";
import { UserService } from "../service/userService";
import { HttpService } from "../service/httpService";
import { MsgService } from "../service/msgService";
import { LoadingController, NavController } from "ionic-angular";
import { CreateOrderPage } from "../order/createOrder";
import { ShopCart } from "../model/shopCart";

@Component({
    templateUrl: 'cart.html'
})
export class CartPage {
    discountPrice: number = 0.00;
    totalPrice: number = 0.00;
    needPayPrice: number = 0.00;
    isEditItem:boolean = false;
    constructor(
        private cartService: CartService,
        private userService: UserService,
        private http: HttpService,
        private msgService: MsgService,
        private loadingCtrl: LoadingController,
        public navCtrl: NavController
    ) {
        
    }

    ionViewWillEnter(){
        //开始初始化用户的购物车
        this.loadUserShopCart();
    }

    loadUserShopCart() {
        
        let user = this.userService.curUser;
        this.http.get("shopCart/queryUserShopCart", {
            userId: user.id
        }).then(result => {
            if (result.code == 1) {
                this.cartService.cartItems = result.data;
                this.computePrice(true);
            } else {
                this.msgService.alert(result.msg);
            }
        });
    }

    /**
     * 结算
     */
    balance() {
        let selectCartItems:ShopCart[] = new Array();
        for(let i in this.cartService.cartItems){
            let ci = this.cartService.cartItems[i];
            if(ci.checked){
                selectCartItems.push(ci);
            }
        }
        this.navCtrl.push(CreateOrderPage,{
            cartItems : selectCartItems
        });
    }

    selectCartItem() {
        this.computePrice(false);
    }

    computePrice(checkAll) {
        this.totalPrice = 0.00;
        this.discountPrice = 0.00;
        for (let i in this.cartService.cartItems) {
            let ci = this.cartService.cartItems[i];
            if(checkAll){
                ci.checked = true;
            }
            if(ci.checked){
                this.totalPrice += (ci.price * ci.count);
                this.discountPrice += (ci.price * (1 - ci.discount) * ci.count);
            }
        }
        this.needPayPrice = this.totalPrice - this.discountPrice;
        this.discountPrice = parseFloat(this.discountPrice.toFixed(2));
    }

    beginEditItem(){
        this.isEditItem = !this.isEditItem;
        if(!this.isEditItem){//编辑完成，存储购物车数据
            this.http.postJson('shopCart/updateListById',JSON.stringify(this.cartService.cartItems)).then(result => {
                if(result.code==1){
                    this.msgService.show('编辑购物车成功！');
                }else{
                    this.loadUserShopCart();//重新初始化购物车
                    this.msgService.alert(result.msg);
                }
            });
        }
    }

    editItemCount(item,count){
        let me = this;
        if(item.count==1&&count==-1){
            this.msgService.confirm('是否要删除这件商品？',function(ok){
                if(ok){
                    //从购物车删除
                    me.cartService.deleteById(item.id);
                    me.computePrice(false);
                }
            });
        }else{
            item.count += count;
            this.computePrice(false);
        }
        
    }

    inputItemCount(item){
        if(item.count==null){
            return;
        }
        let me = this;
        if(item.count<=0){
            this.msgService.confirm('是否要删除这件商品？',function(ok){
                if(ok){
                    //从购物车删除
                    me.cartService.deleteById(item.id);
                    me.computePrice(false);
                }else{
                    item.count = 1;
                }
            });
        }else{
            this.computePrice(false);
        }
        
    }

    deleteCartItem(item){
        let me = this;
        this.msgService.confirm('是否要删除这件商品？',function(ok){
            if(ok){
                //从购物车删除
                me.cartService.deleteById(item.id);
                me.computePrice(false);
            }else{
                item.count = 1;
            }
        });
    }
}