import { Component, OnInit} from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { MdDialog } from '@angular/material';

import { BoardService } from '../board.service';

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
        .subscribe((params: Params) => {
          this.BoardService.getBoard(params['id']).subscribe(data => this.board = data);
          this.VoteService.getVotes(params['id']).subscribe(data => this.votes = data);
          this.VoteService.getGroupedVotes(params['id']).subscribe(data => this.groupedVotes = data);
        });
  }

  private openVote(email: string) {
    const dialogRef = this.dialog.open(VoteComponent, {data: {board: this.board, email: email}, width: '80%'});
  }
}
