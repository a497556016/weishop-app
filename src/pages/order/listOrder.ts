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
        }).then(result => {
            if(result.code == 1){
                this.orderDatas = result.rows;
            }else{
                this.msg.alert(result.msg);
            }
        });
    }
}