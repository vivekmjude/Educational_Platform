import { Task } from './../../models/task/task.model';
import { TaskListService } from './../../services/task/task.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ToastService } from '../../services/toast/toast.service';

/**
 * Generated class for the EditTaskPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit-task',
  templateUrl: 'edit-task.html',
})
export class EditTaskPage {
  task: Task;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private toast: ToastService,
    private taskService: TaskListService,
  ) {
  }

  ionViewWillLoad() {
    this.task = this.navParams.get('task');
  }

  saveTask(task: Task) {
    this.taskService.editTask(task)
    .then(() => {
      this.toast.show(`${task.description} saved!`);
      this.navCtrl.setRoot('SchedulePage');
    })
  }
  removeTask(task: Task) {
    this.taskService.removeTask(task)
    .then(() => {
      this.toast.show(`${task.description} deleted!`);
      this.navCtrl.setRoot('SchedulePage');
    })
  }

}
