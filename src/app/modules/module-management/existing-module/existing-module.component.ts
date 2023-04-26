import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { take } from 'rxjs';
import { ModuleType } from 'src/app/course/types/module-type';
import { ModuleService } from '../../services/module.service';

@Component({
  selector: 'app-existing-module',
  templateUrl: './existing-module.component.html',
  styleUrls: ['./existing-module.component.scss']
})
export class ExistingModuleComponent implements OnInit {

  public modules: ModuleType[] = []
  public searchText: string = ''

  constructor(private _service: ModuleService,
    @Inject(MAT_DIALOG_DATA) public onModal: boolean,
    public dialogRef: MatDialogRef<ExistingModuleComponent>) { }

  ngOnInit(): void {
    this._service.findAll()
      .pipe(
        take(1)
      ).subscribe((modules: ModuleType[]) => {
        this.modules = modules
        this.modules.sort((s1: ModuleType, s2: ModuleType) => s1.id! - s2.id!)
      })
  }
  public addMedia(id: number) {
    this._service.findOne(id)
      .pipe(
        take(1)
      ).subscribe((module: ModuleType) => {
        this.dialogRef.close(module)
      })
  }

  public onSearchTextEntered(searchValue: string) {
    this.searchText = searchValue
    // // console.log(this.searchText)
  }

}
