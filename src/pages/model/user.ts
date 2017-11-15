export class User{
    id:number;
    userAccount:string;
    userName:string;
    sex:string;
    password:string;
    email:string;
    phone:string;
    birthday:Date;
    cardId:string;
    cardType:string;
    photoUrl:string;
    constructor(obj?:any){
        if(obj){
            this.id = obj.id;
            this.userAccount = obj.userAccount;
            this.userName = obj.userName;
            this.sex = obj.sex;
            this.email = obj.email;
            this.phone = obj.phone;
            this.birthday = new Date(obj.birthday);
            this.cardId = obj.cardId;
            this.cardType = obj.cardType;
            this.photoUrl = obj.photoUrl;
        }
    }

}