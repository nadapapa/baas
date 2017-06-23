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
    console.log(vote);
    this.votes.push(vote);

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

        for (const key in grouped[item.to]) {
          if (grouped[item.to].hasOwnProperty(key)) {
            sum += grouped[item.to][key];
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

  public getVotesByBoard(boardId) {
    return this.votes.map(voteList => {
      const filtered = voteList.filter(item => item.board == boardId);
      var data = new Date().toLocaleString('hu-HU', {hour12: false});

      data = data.replace(/\s+/g, '_');
      data = data.replace(/\./g,'');
      data = data.replace(/\:/g,'-');

      var archivedVotes = this.af.list('/archivedVotes/'+data);
      archivedVotes.push(filtered);

      filtered.forEach(item => {
        console.log(item.$key);
        this.votes.remove(item.$key);
      });

    });
  }

  public archiveVotesByBoard(id: number) {
    var votes2;
    console.log(id);

    this.getVotesByBoard(id).map(data => {
      votes2 = data;
      return data;
    }).subscribe(console.log);

    console.log(votes2);
    return ;
  }

}
