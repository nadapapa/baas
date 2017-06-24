import { Injectable } from '@angular/core';
import {AfoListObservable, AfoObjectObservable, AngularFireOfflineDatabase } from 'angularfire2-offline/database';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class BoardService {

  constructor(public af: AngularFireOfflineDatabase) {}

  public getBoards(): AfoListObservable<any[]> {
    return this.af.list('/boards');
  }

  public getBoard(id: number): AfoObjectObservable<any[]> {
    return this.af.object('/boards/' + id);
  }
}
