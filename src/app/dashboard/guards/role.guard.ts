import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { LocalStorageService } from 'src/app/core/services/local-storage.service';
import { Member } from 'src/app/user/models/member';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  private _localStorageService: LocalStorageService = LocalStorageService.getInstance();

  constructor(private _router: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {

    const allowedRoles = next.data['allowedRoles'];
    const userRole = new Member(this._localStorageService.getMemberFromStorage()).getRoleName().toUpperCase();

    if (userRole === 'STUDENT' && !state.url.startsWith('/dashboard/student')) {
      this._router.navigateByUrl('/dashboard/student');
      return false;
    }

    // Check if the user's role is allowed to access this page
    if (!allowedRoles.includes(userRole)) {
      // If not, navigate to the not-found page and return false
      this._router.navigate(['/not-found']);
      return false;
    }
    // The user is allowed to access this page but need to check the member's role
    // console.log('Authorized but need to check the member\'s role');

    // Create a new Map object that maps each role to its corresponding URL
    // Conceptor member should be able to access /dashboard/conceptor
    const urlMap = new Map<string, string>([
      ['CONCEPTOR', '/dashboard/conceptor'],
      ['MANAGER', '/dashboard/manager'],
      ['STUDENT', '/dashboard/student'],
    ]);

    // Get the correct URL for the user's role from a Map object
    const correctUrl = urlMap.get(userRole);
    // Check if the correct URL exists and if the current URL does not start with it
    if (correctUrl && !state.url.startsWith(correctUrl)) {
      // console.log(correctUrl);
      // Navigate to the correct URL
      this._router.navigateByUrl(correctUrl);
      return false;
    }

    // The user is allowed to access this page
    return true;
  }

}
