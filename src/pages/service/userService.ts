import { StorageService } from './storageService';
import { User } from './../model/user';
import { Injectable } from "@angular/core";
import { CommonProperty } from '../../common/consts/commonProperty';

@Injectable()
export class UserService{
    private _curUser:User;
    constructor(
        private storageService:StorageService
    ){

    }

    saveUser(user:User){
        this._curUser = user;
        this.storageService.set(CommonProperty.LOGIN_USER,this._curUser);
    }
    removeLoginUser(){
        this._curUser = null;
        this.storageService.remove(CommonProperty.LOGIN_USER);
    }

    set curUser(value:User){
        this._curUser = value;
    }
    get curUser(){
        return this._curUser||this.storageService.get(CommonProperty.LOGIN_USER)||null;
    }
}