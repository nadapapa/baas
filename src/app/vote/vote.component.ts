import {Component, Inject, OnInit} from '@angular/core';
import { MD_DIALOG_DATA } from '@angular/material';
import { VoteService } from '../vote.service';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';

@Component({
  templateUrl: './vote.component.html',
  styleUrls: ['./vote.component.css']
})
export class VoteComponent implements OnInit {
  sender_email: string;
  name: string;

  constructor(@Inject(MD_DIALOG_DATA) public data: any, private VoteService: VoteService, public afAuth: AngularFireAuth) {
    this.afAuth.authState.subscribe(user => { this.sender_email = user.email; });
  }

  ngOnInit() {
      this.name = this.data.name;
  }

  private castAVote(index) {

    this.VoteService.saveVote(
    {
          'board': this.data.board.$key,
          'category': index,
          'description': '',
          'from': this.sender_email,
          'to': this.data.email,
          'create_time': new Date().toLocaleString('hu-HU', {hour12: false})
        }
    );


  }
}
