import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';
import { AuthService } from '../services/auth.service';
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

  constructor(public authService: AuthService, private eventService: EventService, private router: Router) {
    this.user = authService.authState;
    this.eventService.changeEmitted$.subscribe(message => {
      this.title = typeof message.title === 'undefined' ? '' : message.title;
    });

    this.isLoggedIn = false;
    this.setUserParams();
  }

  public logout() {
    this.authService.signOut();
    this.setUserParams();
    this.user = null;
    this.router.navigateByUrl('/');
  }

  setUserParams() {
      this.authService.authState.subscribe(user => {
        this.userProfile.name = user.displayName ? user.displayName : null;
        this.userProfile.img = user.photoURL ? user.photoURL : null;
        this.isLoggedIn = user ? true : null;
      });
  }
}
