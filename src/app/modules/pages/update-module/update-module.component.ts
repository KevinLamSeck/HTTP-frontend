import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { MediaType } from 'src/app/course/types/media-type';
import { ModuleType } from 'src/app/course/types/module-type';
import { MediaService } from 'src/app/medias/services/media.service';
import { ModuleService } from '../../services/module.service';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-update-module',
  templateUrl: './update-module.component.html',
  styleUrls: ['./update-module.component.scss']
})
export class UpdateModuleComponent implements OnInit {

  public moduleForm: FormGroup = new FormGroup({})
  public module: ModuleType | null = null
  public medias: Array<MediaType> = new Array<MediaType>()
  public conceptor: any;
  public addMediaVisible: boolean = false
  public createMediaVisible: boolean = false
  public isDataAvailable: boolean = false;

  constructor(private _formBuilder: FormBuilder,
    private _moduleService: ModuleService,
    private _mediaService: MediaService,
    private _snackBar: MatSnackBar,
    private _route: ActivatedRoute,
    private _router: Router) {
  }

  /** FORM METHODS */

  ngOnInit(): void {
    const id: number = +this._route.snapshot.paramMap.get('id')!
    this._moduleService.findOne(id)
      .subscribe({
        next: (module: ModuleType) => {
          this.module = module
          this.medias = module.medias
          this.conceptor = module.creator
          this.buildForm()
          // console.log(this.module)
          this.isDataAvailable = true
        },
        error: (error: any) => {
          // console.log('Something went wrong')
        }
      })

  }

  get c(): { [key: string]: AbstractControl } {
    return this.moduleForm.controls
  }

  public buildForm() {
    this.moduleForm = this._formBuilder.group({
      name: [
        this.module?.name,
        [
          Validators.required
        ]
      ],
      objective: [
        this.module?.objective
      ]

    })
  }

  onNoClick(): void {
    this._router.navigate(['/'])
  }

  onSubmit(): void {
    const module: ModuleType = {
      id: this.module?.id,
      name: this.c['name'].value,
      objective: this.c['objective'].value,
      selected: false,
      medias: this.medias,
      creator: this.conceptor
    }
    this._moduleService.update(module)
      .subscribe((response: HttpResponse<any>) => {
        // console.log(response)
        this._snackBar.open(`"${module.name}" was updated.`, "Close", { duration: 2000 });
        this._router.navigate(['/'])
      })
  }



  /** ADD MEDIA METHOD */
  public showAddMedia(): void {
    if (this.createMediaVisible) {
      this.createMediaVisible = false
      this.addMediaVisible = !this.addMediaVisible
    } else {
      this.addMediaVisible = !this.addMediaVisible
    }
  }

  public addMedia(id: number): void {
    this._mediaService.findOne(id)
      .subscribe({
        next: (media: MediaType) => {
          this.medias.push(media)
          this._snackBar.open(`"${media.title}" was added.`, "Close", { duration: 2000 });
        },
        error: (error: any) => {
          // console.log('Something went wrong')
        }
      })
  }

  public removeMedia(media: MediaType): void {
    this.medias.splice(
      this.medias.indexOf(media),
      1
    )
  }


  /** CREATE MEDIA METHOD */
  public showCreateMedia(): void {
    if (this.addMediaVisible) {
      this.addMediaVisible = false
      this.createMediaVisible = !this.createMediaVisible
    } else {
      this.createMediaVisible = !this.createMediaVisible
    }
  }

  public addNewMedia(id: number): void {
    this._mediaService.findOne(id)
      .subscribe({
        next: (media: MediaType) => {
          this.medias.push(media)
          this._snackBar.open(`"${media.title}" was created.`, "Close", { duration: 2000 });
        },
        error: (error: any) => {
          // console.log('Something went wrong')
        }
      })
  }

  public closeCreate(value: boolean) {
    this.createMediaVisible = value
  }


  //DRAG AND DROP FEATURE
  public drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.medias, event.previousIndex, event.currentIndex)
  }



}
