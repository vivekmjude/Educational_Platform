import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, ToastController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { FcmProvider } from './../providers/fcm/fcm';
import { tap } from 'rxjs/operators';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: string = 'LoginPage';
  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform,
     public statusBar: StatusBar, 
     public splashScreen: SplashScreen,
     public toastCtrl: ToastController,
     public fcm: FcmProvider,
    ) {

    this.initializeApp();
    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: 'HomePage' },
      { title: 'Schedule', component: 'SchedulePage' },
    ];


  //   platform.ready().then(() => {
  //     //back button handle
  //     //Registration of push in Android and Windows Phone
  //     var lastTimeBackPress = 0;
  //     var timePeriodToExit  = 2000;

  //     platform.registerBackButtonAction(() => {
  //         // get current active page
  //         let view = this.nav.getActive();
  //         if (view.component.name == "HomePage") {
  //             //Double check to exit app
  //             if (new Date().getTime() - lastTimeBackPress < timePeriodToExit) {
  //                 this.platform.exitApp(); //Exit from app
  //             } else {
  //                 console.log("TOASTING");
  //                 lastTimeBackPress = new Date().getTime();
  //             }
  //         } else {
  //             // go to previous page
  //             this.nav.pop({});
  //         }
  //     });
  // });    

  platform.ready().then(() => {

    // Get a FCM token
    fcm.getToken()
    console.log("TOKEN GOT")
    // Listen to incoming messages
    fcm.listenToNotifications().pipe(
      tap(msg => {
        // show a toast
        const toast = toastCtrl.create({
          message: msg.body,
          duration: 3000
        });
        toast.present();
      })
    )
    .subscribe()
  });
}



  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }


}
