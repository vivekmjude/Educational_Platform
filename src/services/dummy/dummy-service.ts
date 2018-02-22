import { Dummy } from './../../models/dummy/dummy.model';
import { Injectable } from "@angular/core";
import  { AngularFireDatabase } from 'angularfire2/database';
@Injectable()
export class DummyService 
{
  private dummyListRef = this.db.list<Dummy>('dummy-list');
  constructor(private db: AngularFireDatabase)
  {
    
  }
  getDummyList() {
    return this.dummyListRef;
  }
  addDummy(dummy: Dummy){
    return this.dummyListRef.push(dummy);
  }
  editDummy(dummy: Dummy){
    return this.dummyListRef.update(dummy.key,dummy);
  }
  removeDummy(dummy: Dummy){
    return this.dummyListRef.remove(dummy.key);
  }
}