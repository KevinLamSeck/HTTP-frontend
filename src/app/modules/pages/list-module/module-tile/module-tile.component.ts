import { HttpResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { ModuleType } from 'src/app/course/types/module-type';
import { ModuleService } from 'src/app/modules/services/module.service';

@Component({
  selector: 'app-module-tile',
  templateUrl: './module-tile.component.html',
  styleUrls: ['./module-tile.component.scss']
})
export class ModuleTileComponent implements OnInit {

  @Input() public moduleInfo: ModuleType | undefined;
  @Output() public moduleInfoChange = new EventEmitter<ModuleType>();

  public mediasLength: any;


  constructor(private _moduleService: ModuleService,
    private _router: Router) { }

  ngOnInit(): void {

    this.mediasLength = this.moduleInfo?.medias.length
  }


  deleteModule(moduleID: number | undefined): void {
    const data: ModuleType | undefined = this.moduleInfo;
    // console.log("delte!")
    this._moduleService
      .delete(moduleID!)
      .pipe(take(1))
      .subscribe({
        next: (response: HttpResponse<any>) => {
          this.moduleInfoChange.emit(data);
        },
      });
  }

  editModule(moduleID: number | undefined) {
    this._router.navigate([`dashboard/conceptor/module/${moduleID}/update`])
  }
  viewModule(moduleID: number | undefined) {
    this._router.navigate([`dashboard/conceptor/module/${moduleID}/view`])
  }
}
