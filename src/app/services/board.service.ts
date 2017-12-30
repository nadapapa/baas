import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from 'angularfire2/database';

@Injectable()
export class BoardService {

  constructor(public af: AngularFireDatabase) {}

  public getBoards(): AngularFireList<any[]> {
    return this.af.list<any[]>('/boards');
  }

  public getBoard(id: number): AngularFireObject<any[]> {
    return this.af.object('/boards/' + id);
  }
}
