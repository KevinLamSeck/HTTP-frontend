import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModuleType } from 'src/app/course/types/module-type';
import { ModuleService } from '../../services/module.service';

@Component({
  selector: 'app-view-module',
  templateUrl: './view-module.component.html',
  styleUrls: ['./view-module.component.scss']
})
export class ViewModuleComponent implements OnInit {

  public module: any;
  public medias: any;
  public conceptor: any;

  public isDataAvailable: boolean = false;

  constructor(private _route: ActivatedRoute,
    private _moduleService: ModuleService) { }

  ngOnInit(): void {
    const id: number = +this._route.snapshot.paramMap.get('id')!
    this._moduleService.findOne(id)
      .subscribe({
        next: (module: ModuleType) => {
          this.module = module
          this.medias = module.medias
          this.conceptor = module.creator
          // console.log(this.module)
          this.isDataAvailable = true
        },
        error: (error: any) => {
          // console.log('Something went wrong')
        }
      })
  }

}
