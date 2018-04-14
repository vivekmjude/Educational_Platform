import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddTaskPage } from './add-task';
import { Moment } from "moment";
@NgModule({
  declarations: [
    AddTaskPage,
  ],
  imports: [
    IonicPageModule.forChild(AddTaskPage),
  ],
})
export class AddTaskPageModule {}
