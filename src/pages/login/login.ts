import { User } from './../../models/user/user.model';
// import { FormBuilder, FormControl, Validator } from '@angular/forms';
import {  NavController, MenuController } from 'ionic-angular';
//import { ViewController} from 'ionic-angular';
import { Component } from '@angular/core';
import { AlertController, App, LoadingController, IonicPage } from 'ionic-angular';
import { ToastService } from '../../services/toast/toast.service';
// import { DummyService } from './../../services/dummy/dummy-service';
import { Dummy } from './../../models/dummy/dummy.model';
import { AngularFireAuth } from 'angularfire2/auth';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  dummy: Dummy = {
    name: '',
  }

  user = {} as User;


  public loginForm: any;
  public backgroundImage = 'assets/img/background/background-5.jpg';

  constructor(
    private afAuth: AngularFireAuth,
    public navCtrl: NavController,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public app: App,
    private menu: MenuController,
   // private viewCtrl: ViewController,
   // private dummies: DummyService,
    private toastCtrl: ToastService,
  ) { }

  async login(user: User) {
    const loading = this.loadingCtrl.create({
      duration: 500
    });

    // loading.onDidDismiss(() => {
    //   // const alert = this.alertCtrl.create({
    //   //   title: 'Logged in!',
    //   //   subTitle: 'Thanks for logging in.',
    //   //   buttons: ['Dismiss']
    //   // });
    //   // alert.present();
    //   this.navCtrl
    //   .push('HomePage')
    //   .then(() => {
    //     // first we find the index of the current view controller:
    //     const index = this.viewCtrl.index;
    //     // then we remove it from the navigation stack
    //     this.navCtrl.remove(index);
    //     console.log(index);
    //   });
    // });

    // this.dummies.addDummy(dummy);
    // console.log(dummy.name+" added!");

    loading.present();



    try {
      const result = await this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password);
      if (result) {
        this.navCtrl.setRoot('HomePage', {
          userpassed: user,
        });
      }  
    }
    catch (e) {
      console.log(e.message);
      this.toastCtrl.show(e.message);
    }

  }
  login1() {
    const loading = this.loadingCtrl.create({
      duration: 500
    });

    loading.onDidDismiss(() => {
      // const alert = this.alertCtrl.create({
      //   title: 'Logged in!',
      //   subTitle: 'Thanks for logging in.',
      //   buttons: ['Dismiss']
      // });
      // alert.present();
      this.navCtrl
      .push('HomePage')
      .then(() => {
        // first we find the index of the current view controller:
        //const index = this.viewCtrl.index;
        // then we remove it from the navigation stack
        //this.navCtrl.remove(index); (uncomment this if going back to login on pressing back button)
      });
    });

    loading.present();

  }


  async goToSignup() {
    this.navCtrl.push('RegisterPage');
  }



  ionViewDidEnter() {
    this.menu.swipeEnable(false);
    if(this.afAuth.auth.currentUser)
    {
      console.log(this.afAuth.auth.currentUser.email);
      const loading = this.loadingCtrl.create({
        duration: 500
      });
      loading.present().then(()=>{
        this.toastCtrl.show('Already Logged In');
      });
      this.navCtrl.setRoot('HomePage');
    }
  }
  ionViewWillLeave() {
    this.menu.swipeEnable(true);
   }

  


  // Gradient logic from https://codepen.io/quasimondo/pen/lDdrF
  // NOTE: I'm not using this logic anymore, but if you want to use somehow, somewhere,
  // A programmatically way to make a nice rainbow effect, there you go.
  // NOTE: It probably won't work because it will crash your phone as this method is heavy \o/
  colors = new Array(
    [62, 35, 255],
    [60, 255, 60],
    [255, 35, 98],
    [45, 175, 230],
    [255, 0, 255],
    [255, 128, 0]);

  step = 0;
  // color table indices for:
  // [current color left,next color left,current color right,next color right]
  colorIndices = [0, 1, 2, 3];

  // transition speed
  gradientSpeed = 0.00005;
  gradient = '';

  updateGradient() {

    const c00 = this.colors[this.colorIndices[0]];
    const c01 = this.colors[this.colorIndices[1]];
    const c10 = this.colors[this.colorIndices[2]];
    const c11 = this.colors[this.colorIndices[3]];

    const istep = 1 - this.step;
    const r1 = Math.round(istep * c00[0] + this.step * c01[0]);
    const g1 = Math.round(istep * c00[1] + this.step * c01[1]);
    const b1 = Math.round(istep * c00[2] + this.step * c01[2]);
    const color1 = 'rgb(' + r1 + ',' + g1 + ',' + b1 + ')';

    const r2 = Math.round(istep * c10[0] + this.step * c11[0]);
    const g2 = Math.round(istep * c10[1] + this.step * c11[1]);
    const b2 = Math.round(istep * c10[2] + this.step * c11[2]);
    const color2 = 'rgb(' + r2 + ',' + g2 + ',' + b2 + ')';

    this.gradient = `-webkit-gradient(linear, left top, right bottom, from(${color1}), to(${color2}))`;
    this.step += this.gradientSpeed;
    if (this.step >= 1) {
      this.step %= 1;
      this.colorIndices[0] = this.colorIndices[1];
      this.colorIndices[2] = this.colorIndices[3];

      // pick two new target color indices
      // do not pick the same as the current one
      this.colorIndices[1] =
        (this.colorIndices[1] + Math.floor(1 + Math.random() * (this.colors.length - 1)))
        % this.colors.length;

      this.colorIndices[3] =
        (this.colorIndices[3] + Math.floor(1 + Math.random() * (this.colors.length - 1)))
        % this.colors.length;

    }

    setInterval(() => { this.updateGradient(); }, 40);
  }
}
