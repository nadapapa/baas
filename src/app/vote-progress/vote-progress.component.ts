import { Component, OnInit, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-vote-progress',
  templateUrl: './vote-progress.component.html',
  styleUrls: ['./vote-progress.component.css']
})
export class VoteProgressComponent implements OnInit, OnChanges {

  @Input() votes;
  @Input() categories: any[];
  @Input() percentage;

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges() {
  }

}
