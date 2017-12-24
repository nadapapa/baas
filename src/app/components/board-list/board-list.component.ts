import { Component, OnInit } from '@angular/core';
import { BoardService } from '../../services/board.service';
import { EventService } from '../../services/event.service';

@Component({
  selector: 'app-board-list',
  templateUrl: './board-list.component.html',
  styleUrls: ['./board-list.component.css']
})
export class BoardListComponent implements OnInit {
  public boards;

  constructor(private boardService: BoardService, private eventService: EventService) {
    this.eventService.emitChange({title: 'Táblák'});
  }

  ngOnInit() {
    this.boardService.getBoards().valueChanges().map(data => this.boards = data).subscribe();
  }
}
