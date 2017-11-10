import { LoadingController, Loading } from 'ionic-angular';
import { CommonProperty } from './../../common/consts/commonProperty';
import { Logger } from './../log/logger';
import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class HttpService {

    constructor(
        private http: Http,
        private logger: Logger,
        private loadCtrl: LoadingController
    ) { }

    get(url: string, data?: any, opts?: any): Promise<any> {
        let loading:Loading,me = this;
        if(opts&&opts.loadMask){
            loading = this.loadCtrl.create({
                content : opts.loadMsg||''
            });
        }
        if(loading){
            loading.present();
        }
        return this.http.get(CommonProperty.SERVER_BASE_URL + url + this.toQueryString(data))
            .toPromise()
            .then(res => {
                if(loading){
                    loading.dismiss();
                }
                return me.extractData(res);
            })
            .catch(error => {
                if(loading){
                    loading.dismiss();
                }
                return me.handleError(error)
            });
    }

    post(url: string, data: any, opts?: any): Promise<any> {
        let loading:Loading,me = this;
        if(opts&&opts.loadMask){
            loading = this.loadCtrl.create({
                content : opts.loadMsg||''
            });
        }
        if(loading){
            loading.present();
        }
        let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        let options = new RequestOptions({ headers: headers });
        return this.http.post(CommonProperty.SERVER_BASE_URL + url, this.toBodyString(data), options)
            .toPromise()
            .then(res => {
                if(loading){
                    loading.dismiss();
                }
                return me.extractData(res);
            })
            .catch(error => {
                if(loading){
                    loading.dismiss();
                }
                return me.handleError(error)
            });
    }

    postJson(url: string, data: string, opts?: any): Promise<any> {
        let loading:Loading,me = this;
        if(opts&&opts.loadMask){
            loading = this.loadCtrl.create({
                content : opts.loadMsg||''
            });
        }
        if(loading){
            loading.present();
        }
        let headers = new Headers({ 'Content-Type': 'application/json;charset=utf-8' });
        let options = new RequestOptions({ headers: headers });
        return this.http.post(CommonProperty.SERVER_BASE_URL + url, data, options)
            .toPromise()
            .then(res => {
                if(loading){
                    loading.dismiss();
                }
                return me.extractData(res);
            })
            .catch(error => {
                if(loading){
                    loading.dismiss();
                }
                return me.handleError(error)
            });
    }

    private extractData(res: Response) {
        let body = res.json();
        console.log(body);
        return body || {};
    }

    private handleError(error: Response | any) {
        let msg = '请求失败';
        if (error.status == 0) {
          msg = '请求地址错误';
        }
        if (error.status == 400) {
          msg = '请求无效';
          console.log('请检查参数类型是否匹配');
        }
        if (error.status == 404) {
          msg = '请求资源不存在';
          console.error(msg+'，请检查路径是否正确');
        }
        console.log(error);
        return {code: 0, msg: msg};
    }

    /**
    * @param obj　参数对象
    * @return {string}　参数字符串
    * @example
    *  声明: var obj= {'name':'小军',age:23};
    *  调用: toQueryString(obj);
    *  返回: "?name=%E5%B0%8F%E5%86%9B&age=23"
    */
    private toQueryString(obj) {
        let ret = [];
        for (let key in obj) {
            key = encodeURIComponent(key);
            let values = obj[key];
            if (values && values.constructor == Array) {//数组
                let queryValues = [];
                for (let i = 0, len = values.length, value; i < len; i++) {
                    value = values[i];
                    queryValues.push(this.toQueryPair(key, value));
                }
                ret = ret.concat(queryValues);
            } else { //字符串
                ret.push(this.toQueryPair(key, values));
            }
        }
        return '?' + ret.join('&');
    }

    /**
     *
     * @param obj
     * @return {string}
     *  声明: var obj= {'name':'小军',age:23};
     *  调用: toQueryString(obj);
     *  返回: "name=%E5%B0%8F%E5%86%9B&age=23"
     */
    private toBodyString(obj) {
        let ret = [];
        for (let key in obj) {
            key = encodeURIComponent(key);
            let values = obj[key];
            if (values && values.constructor == Array) {//数组
                let queryValues = [];
                for (let i = 0, len = values.length, value; i < len; i++) {
                    value = values[i];
                    queryValues.push(this.toQueryPair(key, value));
                }
                ret = ret.concat(queryValues);
            } else { //字符串
                ret.push(this.toQueryPair(key, values));
            }
        }
        return ret.join('&');
    }

    private toQueryPair(key, value) {
        if (typeof value == 'undefined') {
            return key;
        }
        return key + '=' + encodeURIComponent(value === null ? '' : String(value));
    }

}