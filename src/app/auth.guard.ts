import { CanActivate } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {

    private can = false;

    constructor(public authService: AuthService, private router: Router) {}

    canActivate() {
        return this.authService.authState.map(data => {
            const tmp = !!data;

            if (!tmp) {
                this.router.navigate(['/'])
            }

            return tmp;
        });

    }

}
