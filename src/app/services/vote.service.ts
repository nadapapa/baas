import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { MatSnackBar } from '@angular/material';
import { MatDialog } from '@angular/material';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class VoteService {
  updateableHash: string;
  private votes: AngularFireList<any>;

  constructor(public af: AngularFireDatabase, public snackBar: MatSnackBar, public dialog: MatDialog) {
    this.votes = this.af.list<any>('/votes');
  }

  public saveVote(vote) {
    const a = this.votes.push(vote).then((item) => {
      this.updateableHash = item.key;
      this.snackBar.open('Szavazatodat elmentettük!', 'OK', {
        duration: 10000,
      });
    });
  }

  public getVotes(): Observable<any> {
    return this.votes.valueChanges();
  }

  public getByEmail(email): Observable<any> {
    return this.votes.valueChanges().map(voteList => {
      return voteList.filter(item => item.from === email || item.to === email);
    });
  }

  public getGroupedVotes(boardId: number): Observable<any> {
    return this.votes.valueChanges().map(voteList => {
      // debugger;
      const filtered = voteList.filter(item => +item.board === +boardId);
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
      for (const key in grouped [item.to]) {
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

  public getVotesByBoard(boardId): Observable<any> {
    return this.votes.valueChanges().map(voteList => {
      const filtered = voteList.filter(item => item.board === boardId);
      let data = new Date().toLocaleString('hu-HU', {hour12: false});

      data = data.replace(/\s+/g, '_');
      data = data.replace(/\./g, '');
      data = data.replace(/\:/g, '-');

      const archivedVotes = this.af.list('/archivedVotes/' + data);
      archivedVotes.push(filtered);

      filtered.forEach(item => {
        this.votes.remove(item.$key);
      });
    });
  }

  public archiveVotesByBoard(id: number) {
    let votes2;

    this.getVotesByBoard(id).map(data => {
      votes2 = data;
      return data;
    });

    return;
  }
}
