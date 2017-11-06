import { Logger } from './../log/logger';
import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { CommonProperty } from '../../common/consts/commonProperty';

@Injectable()
export class HttpService {

    constructor(
        private http: Http,
        private logger: Logger
    ) { }

    get(url: string, data?: any): Promise<any> {
        console.log(CommonProperty.SERVER_BASE_URL)
        return this.http.get(CommonProperty.SERVER_BASE_URL + url + this.toQueryString(data))
            .toPromise()
            .then(this.extractData)
            .catch(this.handleError);
    }

    post(url: string, data: any): Promise<any> {
        let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        let options = new RequestOptions({ headers: headers });
        return this.http.post(CommonProperty.SERVER_BASE_URL + url, this.toBodyString(data), options)
            .toPromise()
            .then(this.extractData)
            .catch(this.handleError);
    }

    postJson(url: string, data: string): Promise<any> {
        let headers = new Headers({ 'Content-Type': 'application/json;charset=utf-8' });
        let options = new RequestOptions({ headers: headers });
        return this.http.post(CommonProperty.SERVER_BASE_URL + url, data, options)
            .toPromise()
            .then(this.extractData)
            .catch(this.handleError);
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