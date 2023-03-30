import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SubmitUser } from '../models/submitUser';
import { TokenService } from './token.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ErrorMessageComponent } from 'src/app/auth/components/error-message/error-message.component';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private preloader: boolean = false;

  constructor(
    private router: Router,
    private http: HttpClient,
    private tokenService: TokenService,
    private modalService: NgbModal
  ) { }

  set preloaderAuth(value: boolean) {
    this.preloader = value;
  }

  get preloaderAuth(): boolean {
    return this.preloader;
  }

  signUp(user: SubmitUser): Observable<SubmitUser> {
    return this.http.post<SubmitUser>(environment.API_URL + "/api/registration", user)
  }

  login(user: SubmitUser): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(environment.API_URL + "/api/login", user)
  }

  logout(): void {
    this.tokenService.removeToken();
    this.router.navigate(['']);
  }

  openErrorMessage(error: string | undefined): void {
    if (!error) error = 'The server is down';
    const modalRef = this.modalService.open(ErrorMessageComponent);
    modalRef.componentInstance.message = error;
  }

}
