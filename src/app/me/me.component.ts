import { Component, OnInit } from '@angular/core';
import { BoardService } from '../board.service';
import { VoteService } from '../vote.service';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'app-me',
  templateUrl: './me.component.html',
  styleUrls: ['./me.component.css']
})
export class MeComponent implements OnInit {

  private boardItems = [];
  private votes = [];
  private user = null;
  private userEmail = '';

  constructor(public afAuth: AngularFireAuth, private BoardService: BoardService, private VoteService: VoteService) {
    afAuth.authState.map(user => {
      this.userEmail = user.email;
      this.user = user;
    }).subscribe();
  }

  ngOnInit() {
    this.BoardService.getBoards().map(data => this.boardItems = data).subscribe();
    this.VoteService.getByEmail('balazs.kovacs@bigfish.hu').map(data => {
      this.votes = data;
    }).subscribe();
  }

  getUserName(vote) {
    const toFind = vote.from === this.userEmail ? vote.to : vote.from;
    return this.boardItems[vote.board].users.filter(user => user.email === toFind)[0]['name'];
  }

  getDirection(vote) {
    return vote.from === this.userEmail ? 'call_made' : 'call_received';
  }

}
