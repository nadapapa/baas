import {Component, Inject, OnInit} from '@angular/core';
import { MD_DIALOG_DATA } from '@angular/material';

@Component({
  templateUrl: './vote.component.html',
  styleUrls: ['./vote.component.css']
})
export class VoteComponent implements OnInit {

  constructor(@Inject(MD_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    console.log(this.data);
  }
}
