import { LOGIN_USER } from './../../common/consts/commonProperty';
import { StorageService } from './storageService';
import { User } from './../model/user';
import { Injectable } from "@angular/core";

@Injectable()
export class UserService{
    private _curUser:User;
    constructor(
        private storageService:StorageService
    ){

    }

    saveUser(user:User){
        this._curUser = user;
        this.storageService.set(LOGIN_USER,this._curUser);
    }
    removeLoginUser(){
        this._curUser = null;
        this.storageService.remove(LOGIN_USER);
    }

    set curUser(value:User){
        this._curUser = value;
    }
    get curUser(){
        return this._curUser||this.storageService.get(LOGIN_USER)||null;
    }
}