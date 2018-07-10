import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelper } from 'angular2-jwt';
import * as auth0 from 'auth0-js';

(window as any).global = window;

@Injectable({
    providedIn: 'root'
})
export class AuthService {
  profile: any;
  private roles: any[] = [];

  auth0 = new auth0.WebAuth({
    clientID: 'XKCw7SBkVGd4KJ8caNk8qrDoemEqT5zB',
    domain: 'vega-andre.auth0.com',
    responseType: 'token id_token',
    // audience: 'https://vega-andre.auth0.com/userinfo',
    audience: 'https://vega.auth.com',
    // redirectUri: 'http://localhost:5000/vehicles',
    redirectUri: 'https://vega-dotnet-core.azurewebsites.net/vehicles',
    scope: 'openid email profile'
  });

  constructor(public router: Router) {    
    this.readUserFromLocalStorage();
  }

  public isInRole(roleName: string) {
    return this.roles.indexOf(roleName) !== -1;
  }

  private readUserFromLocalStorage() {
    this.profile = JSON.parse(localStorage.getItem('profile') || 'null');
    const access_token = localStorage.getItem('access_token');
    if (access_token) {
      const jwtHelper = new JwtHelper();
      const decodedToken = jwtHelper.decodeToken(access_token);
      this.roles = decodedToken['https://vega.com/roles'] || [];
    }
  }

  public login(): void {
    this.auth0.authorize();
  }
  
  public handleAuthentication(): void {
    this.auth0.parseHash((err: any, authResult: any) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        window.location.hash = '';
        this.setSession(authResult);
        this.router.navigate(['/vehicles']);
      } else if (err) {
        this.router.navigate(['/vehicles']);
        console.log(err);
      }
    });
  }

  private setSession(authResult: any): void {
    // Set the time that the Access Token will expire at
    const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', expiresAt);   


    this.auth0.client.userInfo(authResult.accessToken, (err, profile) => {
      if(err) {
        throw err;
      }

      localStorage.setItem('profile', JSON.stringify(profile));

      this.readUserFromLocalStorage();  
    });
  }

  public logout(): void {
    // Remove tokens and expiry time from localStorage
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    localStorage.removeItem('profile');
    this.profile = null;
    this.roles = [];
    // Go back to the home route
    this.router.navigate(['/']);
  }

  public isAuthenticated(): boolean {
    // Check whether the current time is past the
    // Access Token's expiry time
    const expiresAt = JSON.parse(localStorage.getItem('expires_at') || '{}');
    return new Date().getTime() < expiresAt;
  }

}