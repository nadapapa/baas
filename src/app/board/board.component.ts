import { Component, OnInit} from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { MdDialog } from '@angular/material';

import { BoardService } from '../board.service';

import { VoteProgressComponent } from '../vote-progress/vote-progress.component';
import 'rxjs/add/operator/switchMap';
import { VoteComponent } from '../vote/vote.component';
import {EventService} from '../event.service';
import {VoteService} from '../vote.service';


@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {

  private board;
  private votes;
  private groupedVotes;

  constructor(private BoardService: BoardService, private route: ActivatedRoute, public dialog: MdDialog,
              private EventService: EventService, private VoteService: VoteService) { }

  ngOnInit(): void {
    this.EventService.emitChange({title: 'Felhasználók'});

    this.route.params
        .switchMap((params: Params) => this.BoardService.getBoard(params['id']))
        .subscribe(data => this.board = data);
    this.route.params
        .switchMap((params: Params) => this.VoteService.getGroupedVotes(params['id']))
        .subscribe(data => this.votes = data);
  }

  public getVotesProgressBar(email) {
    console.log(this.votes.users['email']);
    return email;
  }

  private openVote(email: string) {
    this.dialog.open(VoteComponent, {data: {board: this.board, email: email, dialogRef: this.dialog}, width: '80%'});
  }





}
