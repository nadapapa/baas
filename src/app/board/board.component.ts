import { Component, OnInit} from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { MdDialog } from '@angular/material';

import { BoardService } from '../board.service';

import { VoteProgressComponent } from '../vote-progress/vote-progress.component';
import 'rxjs/add/operator/switchMap';
import { VoteComponent } from '../vote/vote.component';
import { EventService } from '../event.service';
import { VoteService } from '../vote.service';

import { AngularFireAuth } from 'angularfire2/auth';

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
  public groupedVotes;

  constructor(private boardService: BoardService, private route: ActivatedRoute, public dialog: MdDialog,
              private eventService: EventService, private voteService: VoteService, public afAuth: AngularFireAuth) {

    afAuth.authState.map(user => {
      this.userEmail = user.email;
    }).subscribe();
  }

  public ngOnInit(): void {
    this.eventService.emitChange({title: 'Felhasználók'});

    this.route.params
        .switchMap((params: Params) => this.boardService.getBoard(params['id']))
        .subscribe(data => {
          this.board = data;
          this.adminUser = this.board.users.filter( item => (item.email === this.userEmail && item.is_admin === true))[0];
        });
    this.route.params
        .switchMap((params: Params) => this.voteService.getGroupedVotes(params['id']))
        .subscribe(data => this.votes = data);
  }

  public openVote(email: string, name: string) {
    this.dialog.open(VoteComponent, {data: {name: name, board: this.board, email: email, dialogRef: this.dialog}, width: '80%'});
  }

  public archiveBt(id: number) {
    this.voteService.archiveVotesByBoard(id);
  }
}
