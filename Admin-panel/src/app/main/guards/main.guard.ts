import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { TokenService } from 'src/app/auth/services/token.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class MainGuard implements CanActivate {

  constructor(private router: Router, private authService: TokenService) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (!this.authService.getStorageToken()) {
      this.router.navigateByUrl('/');
      return false;
    }
    return true;
  }

}
