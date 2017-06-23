import { Component, OnInit } from '@angular/core';
import { BoardService } from '../board.service';
import { VoteService } from '../vote.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

  public boardItems = [];
  public votes = [];
  private emailData = null;
  ev;

  public vote = {
    'from': 'test',
    'to': '',
    'board': null,
    'category': null,
    'description': '',
  };

  constructor(private BoardService: BoardService, private VoteService: VoteService) { console.log('construct'); }

  ngOnInit() {
    this.BoardService.getBoards().map(data => this.boardItems = data).subscribe();
    this.VoteService.getGroupedVotes(0).map(data => {
      this.votes = data;
    }).subscribe(console.log);
  }

  saveVote() {
    this.VoteService.saveVote(this.vote);
  }
}
