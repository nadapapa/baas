import { CanActivate } from '@angular/router';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {

    private can = false;

    constructor(public afAuth: AngularFireAuth, private router: Router) {}

    canActivate() {
        return this.afAuth.authState.map(data => {
            const tmp = !!data;

            if (!tmp) {
                this.router.navigate(['/'])
            }

            return tmp;
        });

    }

}
