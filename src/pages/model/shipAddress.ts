export class ShipAddress{
    id:number;
    userId:number;
    address:string;
    contactNumber:string;
    contactUserName:string;
    sex:string;
    country:string = '中国';
    province:string;
    city:string;
    street:string;
    community:string;
    buildingFloor:string;
    default:boolean;
    constructor(){

    }

    setAddress(){
        this.address = this.country + this.province + this.city + this.street + this.community + this.buildingFloor;
    }
}