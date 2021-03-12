import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { SnackService } from '../services/snack.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private afAuth:AngularFireAuth,private snack:SnackService){}

  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot):  Promise<boolean> {// return true-> open to navigate, false->block the route
    const user=await this.afAuth.currentUser;
    const isLoggedIn=!!user;
    if(!isLoggedIn){
      this.snack.authError();
    }
    return isLoggedIn;
  }
  
}
