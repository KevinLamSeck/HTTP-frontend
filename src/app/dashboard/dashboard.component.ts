import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { LocalStorageService } from '../core/services/local-storage.service';
import { Member } from '../user/models/member';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public isAdmin: boolean = true
  public currentUser!: Member;

  private _envKey: string = `${environment.storage.member.key}`;
  private _localStorageService = LocalStorageService.getInstance();

  constructor(
    private _router: Router,
    private _matDialog: MatDialog,
    private _location: Location
  ) { }

  ngOnInit(): void {
    this.getUserDatas()
  }

  getUserDatas() {
    this.currentUser = this._localStorageService.getMemberFromStorage()
  }

  showRole(currentUser: Member): string {
    return currentUser.getRoleName();
  }

  goToMediaAdd() {
    this._router.navigate(['dashboard/conceptor/media/add']);
  }

  goToModuleAdd() {
    this._router.navigate(['dashboard/conceptor/module/add']);
  }

  goToCourseAdd() {
    sessionStorage.removeItem('ModifiedCourse');
    this._router.navigate(['dashboard/conceptor/course/add']);
  }

  greetings(currentUser: Member): string {
    const username = currentUser.firstName;
    const greetingsMSG = [`Good morning ${username} 🎉 !`, `Good afternoon ${username} 🎉 !`, `Good evening ${username} 🎉 !`];
    const hour = new Date().getHours();

    if (hour < 12) return greetingsMSG[0];
    else if (hour < 18) return greetingsMSG[1];
    else return greetingsMSG[2];
  }

  goBack() {
    this._location.back();
  }

  isOnDashboard(): boolean {
    const currentUserRole = this.currentUser.getRoleName().toLowerCase()
    return this._router.url === `/dashboard/${currentUserRole}`;
  }

}
