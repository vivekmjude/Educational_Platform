import { Profile } from './../../models/profile/profile.model';
import { AngularFireAuth } from 'angularfire2/auth';
import { ToastService } from './../../services/toast/toast.service';
import { User } from './../../models/user/user.model';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  user = {} as User;
  profile = {} as Profile;


  constructor(public navCtrl: NavController,
     public navParams: NavParams,
     private afAuth: AngularFireAuth,
     private menu: MenuController,
     private toastCtrl: ToastService,
    private afDatabase: AngularFireDatabase) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  ionViewDidEnter() {
    this.menu.swipeEnable(false);
  }
  ionViewWillLeave() {
    this.menu.swipeEnable(true);
   }


   async register(user: User) {
    console.log(user.email);
    this.profile.email=this.user.email;
    try {
      const result = await this.afAuth.auth.createUserWithEmailAndPassword(
        user.email,
        user.password
      );
      if (result) {
        this.afAuth.authState.take(1).subscribe(auth =>{
          this.afDatabase.object(`profile/${auth.uid}`).set(this.profile).then(() =>
          this.navCtrl.setRoot('HomePage')
        );
        });
      }
    } catch (e) {
      console.log(e.message);
      this.toastCtrl.show(e.message);
    }
    //this.navCtrl.setRoot('LoginPage');
  }

}
