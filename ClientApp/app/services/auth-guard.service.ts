import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { CanActivate } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    constructor(protected auth: AuthService) { }

    canActivate() {
        if (this.auth.isAuthenticated()) {
            return true;
        }

        this.auth.login();

        return false;
    }
}