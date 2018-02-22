import { Dummy } from './../../models/dummy/dummy.model';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ViewActivityPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-view-activity',
  templateUrl: 'view-activity.html',
})
export class ViewActivityPage {

  dummy: Dummy;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewWillLoad() {
    this.dummy = this.navParams.get('dummy');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ViewActivityPage');
  }

}
