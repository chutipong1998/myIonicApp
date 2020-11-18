import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardGuard implements CanActivate {
  constructor(private router: Router, private afAuth: AngularFireAuth) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    return new Promise((resolve) => {
      this.afAuth.onAuthStateChanged(res => {
        if (res) {
          console.log("res =");

          console.log(res);

          resolve(true);
        } else {
          console.log("res =");

          console.log(res);
          console.log('User is not logged in');
          this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
          resolve(false);
        }
      });
    });
  }

}
