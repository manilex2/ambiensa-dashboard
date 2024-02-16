import { Injectable } from '@angular/core';
import decode from 'jwt-decode';
import { CurrentUser } from '../models';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  token: any;
  constructor() { }

  getUser(): string {
    this.token = localStorage.getItem('auth_token');

    let tokenPayload: any = this.token? decode(this.token) : false;

    return tokenPayload.user;
  }

  getUserName(): string {
    this.token = localStorage.getItem('auth_token');

    let tokenPayload: any = this.token? decode(this.token) : false;

    return tokenPayload.user.usuario;
  }

  obtenerCurrentUser(): CurrentUser {
    this.token = localStorage.getItem('auth_token');

    let tokenPayload: any = this.token? decode(this.token) : false;

    let user: CurrentUser = {
      nombres: tokenPayload.user.nombres? tokenPayload.user.nombres.trim() : "",
      apellidos: tokenPayload.user.apellidos? tokenPayload.user.apellidos.trim() : "",
      email: tokenPayload.user.email? tokenPayload.user.email.trim() : ""
    }
    return user;
  }
}
