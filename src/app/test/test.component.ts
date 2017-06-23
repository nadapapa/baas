import { Component, OnInit } from '@angular/core';
import { BoardService } from '../board.service';


@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

  constructor(private BoardService: BoardService) { }

  ngOnInit() {
    this.BoardService.getBoards().map(data => console.log(data));
  }
}
