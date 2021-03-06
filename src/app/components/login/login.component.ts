import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  user: Observable<firebase.User>;

  constructor(public afAuth: AngularFireAuth, router: Router) {
    this.user = afAuth.authState;

    if (this.afAuth.authState.map(data => !!data)) {
      router.navigate(['/boards']);
    }
  }

  login() {
    this.afAuth.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
  }
}
