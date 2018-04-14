import { ToastService } from './../../services/toast/toast.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Task } from '../../models/task/task.model';
import { TaskListService } from '../../services/task/task.service';

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

  public myDate: string = new Date().toISOString();

  task: Task = {
    description: '',
    start: undefined ,
    end:undefined,
    timeRequired: undefined,
    fixed: false,
    academic: false,
    done: false,
    doneTime: null,
  }
  

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private toast: ToastService,
    private taskService: TaskListService,

  ) { }

  addTask(task:Task) {
    this.taskService.addTask(task).then(ref => {
      this.toast.show(`${task.description} added!`);
      this.navCtrl.setRoot('SchedulePage',{ key: ref.key})
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddTaskPage');
  }
  update() {
    console.log('New state:' + this.task.fixed);
  }
}
