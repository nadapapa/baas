import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class BoardService {

  constructor(public af: AngularFireDatabase) {}

  public getBoards(): FirebaseListObservable<any[]> {
    return this.af.list('/boards');
  }

}
