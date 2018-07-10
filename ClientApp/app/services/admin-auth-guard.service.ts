import { AuthGuard } from './auth-guard.service';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { CanActivate, Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class AdminAuthGuard extends AuthGuard {

    constructor(auth: AuthService, private router: Router) {
        super(auth);
     }

    canActivate() {
        const isAuthenticated = super.canActivate();

        if (isAuthenticated) {
            console.log('Is Admin', this.auth.isInRole('Admin'));
            if (this.auth.isInRole('Admin')) {
                return true;
            };

            this.router.navigate(['/']);
            return false;
        }

        return false;
    }
}