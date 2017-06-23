import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { MdDialog } from '@angular/material';

import { BoardService } from '../board.service';

import 'rxjs/add/operator/switchMap';
import { VoteComponent } from '../vote/vote.component';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {
  private board;

  constructor(private BoardService: BoardService, private route: ActivatedRoute, public dialog: MdDialog) { }

  ngOnInit(): void {
    this.route.params
        .switchMap((params: Params) => this.BoardService.getBoard(params['id']))
        .subscribe(data => this.board = data);
  }

  private openVote(email: string) {
    const dialogRef = this.dialog.open(VoteComponent, {data: {board: this.board, email: email}});
  }
}
