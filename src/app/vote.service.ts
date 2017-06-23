import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import {Observable} from 'rxjs/Observable';
import {MdSnackBar} from '@angular/material';
import { MdDialog } from '@angular/material';


@Injectable()
export class VoteService {
  updateableHash: string;

  private votes;

  constructor(public af: AngularFireDatabase, public snackBar: MdSnackBar, public dialog: MdDialog) {
    this.votes = this.af.list('/votes');
  }

  public saveVote(vote) {

    let a = this.votes.push(vote).then((item) => {
      this.updateableHash = item.key;
      this.snackBar.open('Szavazatodat elmentettük!', 'OK', {
        duration: 10000,
      });
    });
  }






  public getVotes(boardId) {
    return this.votes;
  }

  public getByEmail(email) {
    return this.votes.map(voteList => {
      return voteList.filter(item => item.from === email || item.to === email);
    });
  }

  public getGroupedVotes(boardId) {
    return this.votes.map(voteList => {
      const filtered = voteList.filter(item => item.board === boardId);
      const grouped = {};
      let votePercentage = 0;

      filtered.forEach(item => {
        if (grouped.hasOwnProperty(item.to)) {
          if (grouped[item.to].hasOwnProperty(item.category)) {
            grouped[item.to][item.category] += 1;
          } else {
            grouped[item.to][item.category] = 1;
          }
        } else {
          grouped[item.to] = {};
          grouped[item.to][item.category] = 1;
        }
      let sum = 0;
      for (
      const key in grouped [item.to]) {
          if (grouped[item.to].hasOwnProperty(key)) {
            sum +=grouped[item.to][key];
          }
            }
          if (sum > votePercentage) {
        votePercentage = sum;
        }
      });

      return {
        'users': grouped,
        'votePercentage': 100 / votePercentage
      };
    });
  }
}
