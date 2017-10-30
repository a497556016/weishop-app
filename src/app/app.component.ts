import { LoginPage } from './../pages/login/login';
import { UserService } from './../pages/service/userService';
import { TabsPage } from './../pages/tabs/tabs';
import { Component, ViewChild } from '@angular/core';
import { Platform, ToastController, Nav, IonicApp, Keyboard } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any;
  backButtonPressed: boolean = false;  //用于判断返回键是否触发
  @ViewChild('nav') nav: Nav;
  constructor(
    private ionicApp: IonicApp,
    private platform: Platform, 
    private keyboard:Keyboard, 
    public toastCtrl: ToastController,
    private statusBar: StatusBar,
    private splashScreen: SplashScreen,
    private userService:UserService
  ) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      this.registBackButtionAction();//处理返回键

      //判断登录状态
      let curUser = userService.curUser;
      console.log(curUser)
      if(!curUser||!curUser.id){
        this.rootPage = LoginPage;
      }else{
        this.rootPage = TabsPage;
      }
    });
    
  }

  registBackButtionAction(){
    this.platform.registerBackButtonAction(() => {
      if(this.keyboard.isOpen()){
        this.keyboard.close();
        return;
      }
      //如果想点击返回按钮隐藏toast或loading或Overlay就把下面加上
      // this.ionicApp._toastPortal.getActive() || this.ionicApp._loadingPortal.getActive() || this.ionicApp._overlayPortal.getActive()
      let activePortal = this.ionicApp._modalPortal.getActive()
      //||this.ionicApp._toastPortal.getActive() 
      || this.ionicApp._loadingPortal.getActive() 
      || this.ionicApp._overlayPortal.getActive();
      if (activePortal) {
        activePortal.dismiss().catch(() => {});
        activePortal.onDidDismiss(() => {});
        return;
      }
      let activeVC = this.nav.getActive();
      let page = activeVC.instance;
      let activeNav;
      if(page instanceof TabsPage){
        activeNav = page.tabs.getSelected();
      }else{
        activeNav = page.navCtrl;
      }
      
      return activeNav.canGoBack() ? activeNav.pop() : this.showExit();//另外两种方法在这里将this.showExit()改为其他两种的方法的逻辑就好。
    },1);
  }

  //双击退出提示框
  showExit() {
     if (this.backButtonPressed) { //当触发标志为true时，即2秒内双击返回按键则退出APP
       this.platform.exitApp();
     } else {
       this.toastCtrl.create({
         message: '再按一次退出应用',
         duration: 2000,
         position: 'top'
       }).present();
       this.backButtonPressed = true;
       setTimeout(() => this.backButtonPressed = false, 500);//2秒内没有再次点击返回则将触发标志标记为false
     }
  }
}
