import { Injectable } from '@angular/core';
import { UserService } from './../service/userService';
import { Logger } from './logger';

@Injectable()
export class BetterLogger extends Logger{
    username:string = '';
    constructor(private userService:UserService){
        super();
        let user = userService.curUser;
        if(user){
            this.username = user.userName;
        }
    }

    info(msg:string){
        super.info(this.username + '操作：' + msg);
    }

    error(msg:string){
        super.error(this.username + '操作发生异常：' + msg);
    }
}