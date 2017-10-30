import { Injector } from '@angular/core';
import { MapService } from './../service/mapService';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
  btnText:string = '开始行走';
  inter:number;
  curLocation:string;
  beginRun:boolean = false;
  points:number[][] = [];
  mapService:MapService;
  constructor(
    public navCtrl: NavController,
    private injector:Injector,
  ) {
    //初始化地图服务
    this.mapService = new MapService({
      onComplete : data => {
        this.onComplete(data);
      }
    },injector);
  }

  ionViewDidLoad() {
    this.mapService.initMap();
  }


  onComplete(data:any){
    console.log(data);
    let lng = data.position.getLng();
    let lat = data.position.getLat();

    let point = [lng,lat];
    //this.mapService.setMarker(point);
    if(this.beginRun){
      this.points.push(point);
      this.mapService.drawPolyline(this.points);
    }
    this.mapService.regeocoder(point,result => {
      this.curLocation = result.regeocode.formattedAddress; //返回地址描述
    });
  }

  beginSport(){
    this.beginRun = !this.beginRun;
    if(this.beginRun){
      this.btnText = '结束';
      let me = this;
      me.points = [];
      me.mapService.map.clearMap();

      this.mapService.getCurrentPosition();
      this.inter = setInterval(function(){
        me.mapService.getCurrentPosition();
      }, 5000);
    }else{
      this.btnText = '开始行走';
      window.clearInterval(this.inter);
    }
  }

}
