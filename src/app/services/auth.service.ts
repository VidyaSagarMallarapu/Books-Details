// src/app/auth/auth.service.ts

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import * as auth0 from 'auth0-js';
@Injectable()
export class AuthService {

  private _idToken: string;
  private _accessToken: string;
  public _expiresAt: number;

  auth0 = new auth0.WebAuth({
    clientID: 'sAOsyOGC3iPcbU2Ez1utDBrIzx6r0ggw',
    domain: 'booksnotes.auth0.com',
    responseType: 'token id_token',
    redirectUri: 'http://localhost:4200/callback',
    scope: 'openid'
  });

  constructor(public router: Router) {
    this._idToken = '';
    this._accessToken = '';
    this._expiresAt = 0;
  }

  get accessToken(): string {
    return this._accessToken;
  }

  get idToken(): string {
    return this._idToken;
  }

  public login(): void {
    this.auth0.authorize();
  }
  public isAuth(): boolean {
    return this._expiresAt != 0;
  }

}
