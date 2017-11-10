export class Product{
    constructor(
        public id:number,
        public name:string,
        public code:string,
        public description:string,
        public unit:string,
        public createTime:any,
        public createBy:string,
        public modifyTime:any,
        public modifyBy:string,
        public picUrl:string,
        public images:Array<Product>
    ){

    }
}