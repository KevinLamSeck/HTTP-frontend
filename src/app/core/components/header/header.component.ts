import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { Member } from 'src/app/user/models/member';
import { UserService } from 'src/app/user/services/user.service';
import { DarkModeService } from '../../services/dark-mode.service';
import { LocalStorageService } from '../../services/local-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  public user$: BehaviorSubject<any | undefined>;
  public theme$: Observable<any> = this._darkModeService.theme

  public user: any;

  public menu: boolean = false;

  private _localStorageService: LocalStorageService =
    LocalStorageService.getInstance();

  private _member: Member = new Member(
    this._localStorageService.getMemberFromStorage()
  );

  constructor(private _userService: UserService, private _router: Router, private _darkModeService: DarkModeService) {
    this.user$ = this._userService.user$;
  }

  ngOnInit(): void {
    this._userService.user$.subscribe((_user: any) => {
      this.user = _user;
    });
  }

  public menuDropdown(): void {
    this.menu = !this.menu;
  }

  public goToDashboard(): void {
    const role = this._member.getRoleName();
    this._router.navigate(['/dashboard', role.toLowerCase()]);
  }

  public signOut(): void {
    this._userService.logout();
  }

  public toggleTheme(): void {
    this._darkModeService.toggleTheme();
  }
}
