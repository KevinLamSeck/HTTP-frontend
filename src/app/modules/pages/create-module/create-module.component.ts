import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LocalStorageService } from 'src/app/core/services/local-storage.service';
import { MediaType } from 'src/app/course/types/media-type';
import { ModuleType } from 'src/app/course/types/module-type';
import { MediaService } from 'src/app/medias/services/media.service';
import { ModuleService } from '../../services/module.service';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-create-module',
  templateUrl: './create-module.component.html',
  styleUrls: ['./create-module.component.scss']
})
export class CreateModuleComponent implements OnInit {

  public moduleForm: FormGroup = new FormGroup({})
  public addMediaVisible: boolean = false
  public createMediaVisible: boolean = false
  public medias: Array<MediaType> = new Array<MediaType>()

  constructor(private _formBuilder: FormBuilder,
    private _mediaService: MediaService,
    private _moduleService: ModuleService,
    private _router: Router,
    private _localStorageService: LocalStorageService,
    private _snackBar: MatSnackBar) { }


  /** FORM METHODS */
  ngOnInit(): void {
    this.moduleForm = this._formBuilder.group({
      name: [
        '',
        [
          Validators.required
        ]
      ],
      objective: [
        ''
      ]
    })
  }

  get c(): { [key: string]: AbstractControl } {
    return this.moduleForm.controls
  }

  onNoClick(): void {
    this._router.navigate(['/'])
  }

  onSubmit(): void {
    const conceptor: any = this._localStorageService.getMemberFromStorage()
    const newConceptor: any = {
      id: conceptor.id
    }
    const module: ModuleType = {
      name: this.c['name'].value,
      objective: this.c['objective'].value,
      selected: false,
      medias: this.medias,
      creator: newConceptor
    }
    this._moduleService.add(module)
      .subscribe((moduleType: ModuleType) => {
        this._snackBar.open(`"${module.name}" was created.`, "Close", { duration: 2000 });
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
