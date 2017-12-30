import { Component, OnInit } from '@angular/core';
import { BoardService } from '../../services/board.service';
import { VoteService } from '../../services/vote.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-me',
  templateUrl: './me.component.html',
  styleUrls: ['./me.component.css']
})
export class MeComponent implements OnInit {
  private boardItems = [];
  public votes = [];
  private user = null;
  private userEmail = '';

  constructor(public authService: AuthService, private boardService: BoardService, private voteService: VoteService) {
    authService.authState.map(user => {
      this.userEmail = user.email;
      this.user = user;
    }).subscribe();
  }

  ngOnInit() {
    this.boardService.getBoards().valueChanges().map(data => this.boardItems = data).subscribe();
    this.voteService.getByEmail(this.userEmail).map(data => {
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
