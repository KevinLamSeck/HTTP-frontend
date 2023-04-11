import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { IBreadcrumb } from 'src/app/core/interfaces/i-breadcrumb';
import { BreadcrumbService } from 'src/app/core/services/breadcrumb.service';

@Component({
  selector: 'nav[dashboard-breadcrumb]',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss'],
})
export class BreadcrumbComponent {
  public breadcrumbs$: Observable<IBreadcrumb[]>;

  constructor(private _breadcrumbService: BreadcrumbService) {
    this.breadcrumbs$ = this._breadcrumbService.breadcrumbs$;
  }
}
