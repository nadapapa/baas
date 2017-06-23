import { Component, OnInit } from '@angular/core';
import { BoardService } from '../board.service';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

@Component({
  selector: 'app-board-list',
  templateUrl: './board-list.component.html',
  styleUrls: ['./board-list.component.css']
})
export class BoardListComponent implements OnInit {
  boards: FirebaseListObservable<any[]>;


  constructor(private BoardService: BoardService) { }

  ngOnInit() {

    this.BoardService.getBoards().map(data => this.boards = data).subscribe();
  }

}
