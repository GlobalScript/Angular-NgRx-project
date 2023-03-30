import { Injectable } from "@angular/core"
import {
  HttpRequest,
  HttpInterceptor,
  HttpHandler,
  HttpEvent
} from "@angular/common/http";
import { Observable } from 'rxjs';
import { TokenService } from "../services/token.service";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private tokenService: TokenService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.tokenService.getStorageToken()) {
      const authReq = req.clone({
        setHeaders: {
          Authorization: "Bearer " + this.tokenService.getStorageToken()
        }
      });
      return next.handle(authReq)
    }
    return next.handle(req)
  }
}