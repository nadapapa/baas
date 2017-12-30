import { Component, OnInit} from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { MatDialog } from '@angular/material';
import { AuthService } from '../../services/auth.service';
import 'rxjs/add/operator/switchMap';

import { VoteComponent } from '../vote/vote.component';
import { EventService } from '../../services/event.service';
import { VoteService } from '../../services/vote.service';
import { BoardService } from '../../services/board.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {
  public board;
  public userEmail;
  public adminUser;
  public votes;

  constructor(private boardService: BoardService, private route: ActivatedRoute, public dialog: MatDialog,
              private eventService: EventService, private voteService: VoteService, public authService: AuthService) {
    authService.authState.map(user => {
      this.userEmail = user.email;
    }).subscribe();
  }

  public ngOnInit(): void {
    this.eventService.emitChange({title: 'Felhasználók'});

    this.route.params
        .switchMap((params: Params) => this.boardService.getBoard(params['id']).valueChanges())
        .subscribe(data => {
          this.board = data;
          this.adminUser = this.board.users.filter( item => (item.email === this.userEmail && item.is_admin === true))[0];
        });

    this.route.params
        .switchMap((params: Params) => this.voteService.getGroupedVotes(params['id']))
        .subscribe(data => this.votes = data);
  }

  public openVote(email: string, name: string) {
    if (email !== this.userEmail) {
      this.dialog.open(VoteComponent, {data: {name: name, board: this.board, email: email, dialogRef: this.dialog}, width: '80%'});
    }
  }

  public archiveBt(id: number) {
    this.voteService.archiveVotesByBoard(id);
  }
}
