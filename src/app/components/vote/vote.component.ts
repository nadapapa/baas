import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { VoteService } from '../../services/vote.service';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  templateUrl: './vote.component.html',
  styleUrls: ['./vote.component.css']
})
export class VoteComponent implements OnInit {
  sender_email: string;
  name: string;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private voteService: VoteService, public afAuth: AngularFireAuth) {
    this.afAuth.authState.subscribe(user => { this.sender_email = user.email; });
  }

  ngOnInit() {
      this.name = this.data.name;
  }

  public castAVote(index) {
      if (this.sender_email === this.data.email) {
        return;
      }
      this.voteService.saveVote(
          {
              'board': this.data.board.id,
              'category': index,
              'description': '',
              'from': this.sender_email,
              'to': this.data.email,
              'create_time': new Date().toLocaleString('hu-HU', {hour12: false})
          }
      );
  }
}
