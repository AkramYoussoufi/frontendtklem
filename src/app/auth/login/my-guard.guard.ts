import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { AuthService } from 'src/app/service/api/auth.service';

@Injectable({
  providedIn: 'root',
})
export class MyGuardGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> {
    return this.authService.checkJWT().pipe(
      map((data: any) => {
        if (data.status) {
          return true; // Proceed with navigation
        } else {
          this.router.navigate(['/login']);
          return false; // Stop navigation
        }
      }),
      catchError(() => {
        this.router.navigate(['/login']);
        return of(false); // Stop navigation
      })
    );
  }
}
