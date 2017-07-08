import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-vote-progress',
  templateUrl: './vote-progress.component.html',
  styleUrls: ['./vote-progress.component.css']
})
export class VoteProgressComponent {
  @Input() votes;
  @Input() categories: any[];
  @Input() percentage;
}
