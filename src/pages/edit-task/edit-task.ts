import { Task } from './../../models/task/task.model';
import { TaskListService } from './../../services/task/task.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ToastService } from '../../services/toast/toast.service';
import { Storage } from "@ionic/storage";

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
  fName: string;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private toast: ToastService,
    private taskService: TaskListService,
    public storage: Storage,
  ) {
  }

  ionViewWillLoad() {
    this.task = this.navParams.get('task');
    this.storage.get('fullName').then((val)=>
    {
      this.task.studentName=val;
    });
  }


  ionViewDidLoad() {
    this.storage.get('fullName').then((val)=>
    {
      console.log(val+"654321")
      this.fName=val;
    });
  }

  doneTask(task: Task)
  {
    if(task.tAcademic==true) {
    task.doneTime=new Date().toISOString();
    this.taskService.editTask(task)
    task.done=true;
    task.source=false;
    console.log(task.doneTime+"doneTimeString")
      this.taskService.addTask(task).then(ref => {
        this.toast.show(`${task.description} completed`);
        this.navCtrl.setRoot('SchedulePage',{ key: ref.key})
      }); }
      else{
        task.done=true;
        task.doneTime=new Date().toISOString();
        this.taskService.editTask(task)
    .then(() => {
      this.toast.show(`${task.description} saved!`);
      this.navCtrl.setRoot('SchedulePage');
    })
      }
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
