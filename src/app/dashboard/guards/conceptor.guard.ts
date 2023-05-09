import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree
} from '@angular/router';
import { Observable } from 'rxjs';
import { LocalStorageService } from 'src/app/core/services/local-storage.service';
import { Member } from 'src/app/user/models/member';

@Injectable({
  providedIn: 'root',
})
export class ConceptorGuard implements CanActivate {
  constructor(
    private _localStorageService: LocalStorageService,
    private _router: Router
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const requiredRoles = route.data['allowedRoles'];
    const member = new Member(this._localStorageService.getMemberFromStorage());

    if (member.role === "CONCEPTOR" && requiredRoles.includes('CONCEPTOR')) {
      return true;
    }

    this._router.navigate(['/not-found']);

    return false
  }
}
