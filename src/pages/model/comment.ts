export class Comment{
    id:number;
    pId:number;
    proId:number;
    userId:number;
    userName:string;
    commentType:string;
    comment:string;
    stars:number;
    createTime:Date;

    constructor(stars?:number){
        if(stars){
            this.stars = stars;
        }
    }
}