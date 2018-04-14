import { TaskListService } from './../../services/task/task.service';
import { Task } from './../../models/task/task.model';
import { ToastService } from './../../services/toast/toast.service';
import { Component, ViewChild } from '@angular/core';

import { AlertController, App, FabContainer, ItemSliding, List, ModalController, NavController, ToastController, LoadingController, Refresher, IonicPage } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';

/*
  To learn how to use third party libs in an
  Ionic app check out our docs here: http://ionicframework.com/docs/v2/resources/third-party-libs/
*/
// import moment from 'moment';

// import { ConferenceData } from '../../providers/conference-data';
// import { UserData } from '../../providers/user-data';



@IonicPage(
  {
    name: 'SchedulePage'
  }
  )

@Component({
  selector: 'page-schedule',
  templateUrl: 'schedule.html'
})
export class SchedulePage {
  // the list is a child of the schedule page
  // @ViewChild('scheduleList') gets a reference to the list
  // with the variable #scheduleList, `read: List` tells it to return
  // the List and not a reference to the element
  @ViewChild('scheduleList', { read: List }) scheduleList: List;

  taskList$: Observable<Task[]>;

  dayIndex = 0;
  queryText = '';
  segment = 'all';
  excludeTracks: any = [];
  shownSessions: any = [];
  groups: any = [];
  confDate: string;

  constructor(
    public alertCtrl: AlertController,
    public app: App,
    public loadingCtrl: LoadingController,
    public modalCtrl: ModalController,
    public navCtrl: NavController,
    public toastCtrl: ToastService,
    public taskService: TaskListService,
    // public confData: ConferenceData,
    // public user: UserData,
  ) {
    this.taskList$ = this.taskService
    .getTaskList() //DB List
    .snapshotChanges() //Key and Value
    .map(
      changes => {
        return changes.map(c=>({
          key: c.payload.key, ...c.payload.val()
        }));
      });
  }

  ionViewDidLoad() {
    this.app.setTitle('Schedule');
    this.updateSchedule();
  }

  updateSchedule() {

  }

  presentFilter() {


  }

  goToSessionDetail(sessionData: any) {

  }

  addFavorite(slidingItem: ItemSliding, sessionData: any) {

    
  }

  removeFavorite(slidingItem: ItemSliding, sessionData: any, title: string) {
   
  }

  openSocial(network: string, fab: FabContainer) {

  }

  doRefresh(refresher: Refresher) {
    setTimeout(() => {
      this.toastCtrl.show('Updated');
      refresher.complete();
    }, 1000);
  }
  }
