import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'floating-action-conceptor',
  templateUrl: './mobile-actions-conceptor.component.html',
  styleUrls: ['./mobile-actions-conceptor.component.scss']
})
export class MobileActionsConceptorComponent implements OnInit {

  constructor(private _router: Router) { }

  ngOnInit(): void {
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

}
