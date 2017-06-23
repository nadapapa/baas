import { Component, OnInit } from '@angular/core';
import { BoardService } from '../board.service';
import {AfoListObservable } from 'angularfire2-offline/database';
import {EventService} from '../event.service';

@Component({
  selector: 'app-board-list',
  templateUrl: './board-list.component.html',
  styleUrls: ['./board-list.component.css']
})
export class BoardListComponent implements OnInit {
  boards;

  constructor(private BoardService: BoardService, private eventService: EventService) {
    this.eventService.emitChange({title: 'Táblák'});
  }

  ngOnInit() {
    this.BoardService.getBoards().map(data => this.boards = data).subscribe();
  }

}
