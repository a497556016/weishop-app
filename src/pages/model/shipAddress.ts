export class ShipAddress{    

    id:number;
    userId:number;
    address:string;
    contactNumber:string;
    contactUserName:string;
    sex:string;
    country:string = '中国';
    province:string = '';
    city:string = '';
    street:string = '';
    community:string = '';
    buildingFloor:string;
    default:boolean;

    constructor(){
        
    }

    appendAddress(){
        this.address = this.country + this.province + this.city + this.street + this.community + this.buildingFloor;
    }

    copyFromObj(obj:any){
        if(null!=obj){
            this.id = obj.id;
            this.userId = obj.userId;
            this.address = obj.address;
            this.contactNumber = obj.contactNumber;
            this.contactUserName = obj.contactUserName;
            this.sex = obj.sex;
            this.country = obj.country||'中国';
            this.province = obj.province||'';
            this.city = obj.city||'';
            this.street = obj.street||'';
            this.community = obj.community||'';
            this.buildingFloor = obj.buildingFloor;
            this.default = obj.default;
        }
    }
}