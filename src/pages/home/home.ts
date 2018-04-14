import { Component } from '@angular/core';
import { NavController, IonicPage, NavParams, LoadingController } from 'ionic-angular';
import { ToastService } from '../../services/toast/toast.service';
import { DummyService } from './../../services/dummy/dummy-service';
import { Dummy } from './../../models/dummy/dummy.model';
import { Observable } from 'rxjs/Observable';
import { User } from './../../models/user/user.model';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { Profile } from './../../models/profile/profile.model';
import { ProfileService } from '../../services/profile/profile.service';

let homePageAccess=0;

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})


export class HomePage {

  public loggedUser: User;

  dummy: Dummy = {
    name: '',
  }

  userProfileData: Profile;

  Dummies$: Observable<Dummy[]>;

  user = {
    name: 'Alexander Jones',
    profileImage: 'assets/imgs/PPP.jpeg',
    coverImage: 'assets/imgs/PP3.jpg',
    description: 'Education is not the preparation for life; education is life itself.',
    // followers: 456,
    upcomingAct: 10,
    pendingAct: 5
  };

  posts = [
    {
      postImageUrl: 'assets/imgs/EduBG.png',
      text: `“I often warn people: "Somewhere along the way, someone is going to tell you, 'There is no "I" in team.' What you should tell them is, 'Maybe not. But there is an "I" in independence, individuality and integrity.”  
      ―George Carlin`,
      date: 'February 5, 2018',
    } 
  ];

  constructor(public navCtrl: NavController,
  private toastCtrl: ToastService,
  private DummiesL: DummyService,
  private ProfServ: ProfileService,
  public loadingCtrl: LoadingController,
  public navParams: NavParams,
  private afAuth: AngularFireAuth,
  private dummies: DummyService,
  private afDatabase: AngularFireDatabase) { 
    this.loggedUser=navParams.get("userpassed");
    //this.toastCtrl.show("Welcome "+this.loggedUser.email);
    this.Dummies$ = this.DummiesL 
    .getDummyList() //DB List
    .snapshotChanges() //Key and Value
    .map(
      changes => {
        return changes.map(c=>({
          key: c.payload.key, ...c.payload.val()
        }));
      });


  }

  async addAct(dummy: Dummy)
  {
    this.dummies.addDummy(dummy).then(ref => {
      this.navCtrl.setRoot('HomePage',{ key: ref.key})
    });
    console.log(dummy.name+" added!");
  }


  async logout()
  {
    homePageAccess=0;
    this.afAuth.auth.signOut().then(()=>{
      this.navCtrl.setRoot('LoginPage');
      const loading = this.loadingCtrl.create({
        duration: 500
      });
      loading.present().then(()=>{
        this.toastCtrl.show('Logged Out');
      });
    });
  }

  ionViewWillLoad() {
    this.afAuth.authState.take(1).subscribe(data => {
      if(data && data.email && data.uid) {


        // this.userProfileData = this.afDatabase.object(`profile/${data.uid}`).valueChanges();


      // this.userProfileData = this.afDatabase.object(`profile/${data.uid}`).valueChanges();
      // console.log("HHH "+this.userProfileData);


  //     const personRef: afDatabase.Reference = firebase.database().ref(`profile/${data.uid}`);
  //    personRef.on('value', personSnapshot => {
  //   this.userProfileData = personSnapshot.val();
  // });
        if(homePageAccess==0)
        {
          this.toastCtrl.show('Welcome '+ data.email);
          console.log(homePageAccess);
          homePageAccess+=1;
         }
        console.log(homePageAccess);
        homePageAccess+=1;
      }
      else 
      {
        this.toastCtrl.show('Could not find authentication details. Please Login.');
        this.navCtrl.setRoot('LoginPage');
      }
    }
  );
    console.log('Hello Home-Page');
  }

  imageTapped(post) {
    this.toastCtrl.show('Post image clicked');
  }


}
