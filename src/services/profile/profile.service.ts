import { Profile } from './../../models/profile/profile.model';
import { Injectable } from "@angular/core";
import  { AngularFireDatabase } from 'angularfire2/database';
@Injectable()
export class ProfileService 
{
  private dummyListRef = this.db.object<Profile>('profile');
  constructor(private db: AngularFireDatabase)
  {
    
  }
  getProfileInfo() {
    return this.dummyListRef;
  }

}