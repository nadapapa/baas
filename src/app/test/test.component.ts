import { Component, OnInit } from '@angular/core';
import { BoardService } from '../board.service';


@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

  private boardItems = [];

  constructor(private BoardService: BoardService) { console.log('construct'); }

  ngOnInit() {
    console.log('before');
    this.BoardService.getBoards().map(data => this.boardItems = data).subscribe();
    console.log('after');
  }
}
