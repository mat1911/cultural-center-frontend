import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuardService implements CanActivate{

  constructor(private authService: AuthService, private router: Router, private notificationService: NotificationService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    if(this.authService.userSessionExpires() || !this.authService.hasRoleAdmin()){
      this.router.navigate(['/news']);
      this.notificationService.dispatch({message: "Dostęp zabroniony!", type: 'danger', dismissible: true});
    }
    return true;
  }
}
