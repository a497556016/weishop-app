import { MsgService } from './msgService';
import { Injector } from "@angular/core";
declare const AMap: any;//声明

export class MapService{
    public map:any;
    private geolocation:any;
    private polyline:any;
    private msgService:MsgService;
    constructor(
        private opts:{
            container? : string
            onComplete : any
        },
        private injector: Injector
    ){
        this.msgService = this.injector.get(MsgService);
    }

    initMap(){
        let map = this.map = new AMap.Map(this.opts.container||'container',{
            resizeEnable: true,
            zoom: 10
        });

        this.getLocation();

        AMap.plugin(['AMap.ToolBar'], function () {
            map.addControl(new AMap.ToolBar());
        })

    }

    getLocation(){
        let me = this;
        this.map.plugin('AMap.Geolocation', function () {
            let geolocation = me.geolocation = new AMap.Geolocation({
                enableHighAccuracy: true,//是否使用高精度定位，默认:true
                timeout: 10000,          //超过10秒后停止定位，默认：无穷大
                maximumAge: 0,           //定位结果缓存0毫秒，默认：0
                convert: true,           //自动偏移坐标，偏移后的坐标为高德坐标，默认：true
                showButton: true,        //显示定位按钮，默认：true
                buttonPosition: 'LB',    //定位按钮停靠位置，默认：'LB'，左下角
                buttonOffset: new AMap.Pixel(10, 20),//定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
                showMarker: true,        //定位成功后在定位到的位置显示点标记，默认：true
                showCircle: true,        //定位成功后用圆圈表示定位精度范围，默认：true
                panToLocation: true,     //定位成功后将定位到的位置作为地图中心点，默认：true
                zoomToAccuracy:true      //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
            });
            me.map.addControl(geolocation);
            
            AMap.event.addListener(geolocation, 'complete', data => {
                if(me.opts.onComplete){
                    me.opts.onComplete(data);
                }
            });//返回定位信息
            AMap.event.addListener(geolocation, 'error', data => {
                me.onError(data);
            });//返回定位出错信息
        });
    }

    private onError(data:any){
        console.log(data);
        this.msgService.show('定位失败！')
    }

    getCurrentPosition(){
        this.geolocation.getCurrentPosition();
    }

    setMarker(position){
        let marker = new AMap.Marker({
            position: position,
            draggable: true,
            cursor: 'move'
        });
        marker.setMap(this.map);
        // 设置点标记的动画效果，此处为弹跳效果
        marker.setAnimation('AMAP_ANIMATION_DROP');
    }

    //逆地理编码
    regeocoder(position:number[],geocoder_CallBack?:any) {  
        let geocoder = new AMap.Geocoder({
            radius: 1000,
            extensions: "all"
        });        
        geocoder.getAddress(position, function(status, result) {
            if (status === 'complete' && result.info === 'OK' && geocoder_CallBack) {
                geocoder_CallBack(result);
            }
        });        
        this.setMarker(position);
        this.map.setFitView();
    }

    drawPolyline(points){
        this.polyline = this.polyline||new AMap.Polyline({
            //path: points,          //设置线覆盖物路径
            strokeColor: "#3366FF", //线颜色
            strokeOpacity: 1,       //线透明度
            strokeWeight: 5,        //线宽
            strokeStyle: "solid",   //线样式
            strokeDasharray: [10, 5] //补充线样式
        });
        this.polyline.setPath(points);
        this.polyline.setMap(this.map);
    }
}