import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
import { EventService } from '../services/event.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public title = '';
  public user: Observable<firebase.User>;
  public isLoggedIn: boolean;
  public userProfile = {name: null, img: null};

  constructor(public afAuth: AngularFireAuth, private eventService: EventService, private router: Router) {
    this.user = afAuth.authState;
    this.eventService.changeEmitted$.subscribe(message => {
      this.title = typeof message.title === 'undefined' ? message.title : '';
    });

    this.isLoggedIn = false;
    this.setUserParams();
  }

  public logout() {
    this.afAuth.auth.signOut();
    this.setUserParams();
    this.user = null;
    this.router.navigateByUrl('/');
  }

  setUserParams() {
      this.afAuth.authState.subscribe(user => {
        if (user) {
          this.userProfile.name = user.displayName;
          this.userProfile.img = user.photoURL;
          this.isLoggedIn = true;
        } else {
          this.userProfile.name = null;
          this.userProfile.img = null;
          this.isLoggedIn = false;
        }
      });
  }
}