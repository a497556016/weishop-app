import { Component } from "@angular/core";
import { UserService } from "../service/userService";
import { HttpService } from "../service/httpService";
import { MsgService } from "../service/msgService";
import { Order } from "../model/order";


@Component({
    templateUrl : 'listOrder.html'
})
export class ListOrderPage{
    orderDatas:Array<Order>;

    payStatusData = {
        '0' : ['待支付','danger'],
        '1' : ['已支付','secondary']
    };
    deliveryStatusData = {
        '0' : ['待发货','light'],
        '1' : ['待收货','primary'],
        '2' : ['已收货','secondary']
    }
    constructor(
        private userService:UserService,
        private http:HttpService,
        private msg : MsgService
    ){

    }

    ionViewWillEnter() {
        //加载订单列表
        this.http.get('order/selectUserOrders',{
            current : 1,
            size : 10,
            userId : this.userService.curUser.id
        },{
            loadMask : true,
            loadMsg : '加载中...'
        }).then(result => {
            if(result.code == 1){
                this.orderDatas = result.rows;
            }else{
                this.msg.alert(result.msg);
            }
        });
    }

    deleteOrder(order){
        let me = this;
        me.msg.confirm('是否删除订单？',yes => {
            if(yes){
                me.http.post('order/deleteById',{
                    id : order.id
                },{
                    loadMask : true,
                    loadMsg : '删除中...'
                }).then(result => {
                    if(result.code == 1){
                        me.msg.show('删除成功！');
                        me.ionViewWillEnter();
                    }else{
                        me.msg.show(result.msg);
                    }
                });
            }
        });
    }
}