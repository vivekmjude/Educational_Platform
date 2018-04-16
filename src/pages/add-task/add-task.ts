import { ToastService } from './../../services/toast/toast.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Task } from '../../models/task/task.model';
import { TaskListService } from '../../services/task/task.service';
import * as moment from 'moment';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the AddTaskPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@IonicPage()
@Component({
  selector: 'page-add-task',
  templateUrl: 'add-task.html',
})


export class AddTaskPage {

  public minDate = moment(new Date().toISOString()).locale('ml').format('DD-MM-YYYY HH:mm');

  task: Task = {
    description: '',
    studentName: null,
    start: undefined,
    end:undefined,
    timeRequired: undefined,
    fixed: false,
    academic: false,
    source: false,
    done: false,
    doneTime: '',
    tAcademic: false,
  }
  

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private toast: ToastService,
    private taskService: TaskListService,
    public storage: Storage,

  ) { }



  addTask(task:Task) {
    this.storage.get('fullName').then((val)=>
    {
      task.studentName=val;
    });
    this.taskService.addTask(task).then(ref => {
      this.toast.show(`${task.description} added!`);
      this.navCtrl.setRoot('SchedulePage',{ key: ref.key})
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddTaskPage');
  console.log("DDDD"+this.minDate);
  this.storage.get('fullName').then((val)=>
  {
    this.task.studentName=val;
  });
  }
  update() {
    console.log('New state:' + this.task.fixed);
  }
}
