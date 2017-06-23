import { Injectable } from '@angular/core';
import {AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2/database';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class BoardService {

  constructor(public af: AngularFireDatabase) {}

  public getBoards(): FirebaseListObservable<any[]> {
    return this.af.list('/boards');
  }

  public getBoard(id: number): FirebaseObjectObservable<any[]> {
    return this.af.object('/boards/' + id);
  }
}
