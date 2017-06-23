import {Component, OnInit} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
import {EventService} from './event.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title;

  user: Observable<firebase.User>;

  constructor(public afAuth: AngularFireAuth, private eventService: EventService, private router: Router) {
    this.user = afAuth.authState;
    this.eventService.changeEmitted$.subscribe(message => {
      this.title = typeof message.title === 'undefined' ? message.title : '';
    });
  }

  ngOnInit() {

  }

  public logout() {
    this.afAuth.auth.signOut();
    this.router.navigate(['/']);
  }


}
