import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../../services/auth.service';
import * as firebase from 'firebase/app';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  user: Observable<firebase.User>;

  constructor(public authService: AuthService, router: Router) {
    this.user = this.authService.authState;

    if (this.authService.authState.map(data => !!data)) {
      router.navigate(['/boards']);
    }
  }

  login() {
    this.authService.googleSignIn();
  }
}
