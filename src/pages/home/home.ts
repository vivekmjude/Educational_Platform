import { Component } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';
import { ToastService } from '../../services/toast/toast.service';
import { DummyService } from './../../services/dummy/dummy-service';
import { Dummy } from './../../models/dummy/dummy.model';
import { Observable } from 'rxjs/Observable';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  Dummies$: Observable<Dummy[]>;

  following = false;
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
  private DummiesL: DummyService) { 
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

  ionViewDidLoad() {
    console.log('Hello Home-Page');
    this.toastCtrl.show("Welcome");
  }

  imageTapped(post) {
    this.toastCtrl.show('Post image clicked');
  }


}
