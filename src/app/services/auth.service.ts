import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthService {

  readonly authState: Observable<firebase.User | null>;

  constructor(private angularFireAuth: AngularFireAuth) {
    this.authState = angularFireAuth.authState;
  }

  public signOut(): Promise<any> {
    return this.angularFireAuth.auth.signOut();
  }

  public googleSignIn(): Promise<any> {
    return this.angularFireAuth.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
  }
}
