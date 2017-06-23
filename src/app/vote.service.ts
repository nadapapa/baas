import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class VoteService {

  private votes;

  constructor(public af: AngularFireDatabase) {
    this.votes = this.af.list('/votes');
  }

  public saveVote(vote) {
    this.votes.push(vote);
  }

  public getVotes() {
    return this.votes;

  }
}
