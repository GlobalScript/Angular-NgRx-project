import { Injectable } from '@angular/core';
import jwt_decode from 'jwt-decode';
import { User } from '../models/authUser';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }

  setToken(token: string): void {
    window.sessionStorage.setItem('auth_token', token)
  }

  removeToken(): void {
    window.sessionStorage.removeItem('auth_token');
  }

  getStorageToken(): string | null {
    return window.sessionStorage.getItem('auth_token') || null
  }

  parseJwt(token: string): User {
    return jwt_decode(token);
  }
}
