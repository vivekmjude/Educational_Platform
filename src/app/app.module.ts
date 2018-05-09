import { TaskListService } from './../services/task/task.service';
import { ProfileService } from './../services/profile/profile.service';
import { DummyService } from './../services/dummy/dummy-service';
import { ToastService } from './../services/toast/toast.service';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { FIREBASE_CONFIG } from './firebase.credentials';
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { MyApp } from './app.component';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { CalendarModule } from 'ionic3-calendar-en';
import { AngularFirestoreModule } from "angularfire2/firestore";
import { Firebase } from "@ionic-native/firebase";
import { FcmProvider } from '../providers/fcm/fcm';
import { IonicStorageModule } from '@ionic/storage';
import { InAppBrowser } from "@ionic-native/in-app-browser";

@NgModule({
  declarations: [
    MyApp,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(FIREBASE_CONFIG),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFirestoreModule,
    CalendarModule,
    IonicStorageModule.forRoot(),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ToastService,
    Firebase,
    InAppBrowser,
    DummyService,
    ProfileService,
    TaskListService,
    FcmProvider,
  ]
})
export class AppModule {}
