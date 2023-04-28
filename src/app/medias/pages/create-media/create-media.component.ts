import {
  Component,
  EventEmitter,
  Inject,
  Input,
  OnInit,
  Optional,
  Output,
} from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Observable, lastValueFrom, take } from 'rxjs';
import { FileUploadService } from 'src/app/core/services/file-upload.service';
import { LocalStorageService } from 'src/app/core/services/local-storage.service';
import { MediaType } from 'src/app/course/types/media-type';
import { ModuleService } from 'src/app/modules/services/module.service';
import { Member } from 'src/app/user/models/member';
import { MediaModel } from '../../models/media-model';
import { MediaService } from '../../services/media.service';

@Component({
  selector: 'app-create-media',
  templateUrl: './create-media.component.html',
  styleUrls: ['./create-media.component.scss'],
})
export class CreateMediaComponent implements OnInit {
  @Input() visibility: boolean = false;
  @Output() newItemEvent = new EventEmitter<boolean>();

  public actionTitle: string = 'Create';

  // Need this to wait display the form
  public media: MediaModel = new MediaModel({
    _title: 'My Title',
    _summary: 'My Summary',
    _duration: 120,
    _typeMedia: { id: 1, title: 'Video' },
  });

  public mediaForm: FormGroup = new FormGroup({});
  public selectedOption: string = '';

  public options = new Map<string, number>([
    ['Video', 1],
    ['Slide', 2],
    ['Document', 3],
    ['Audio', 4],
    ['Image', 5],
    ['Animation', 6],
    ['Interactive', 7],
    ['PDF', 8],
  ]);

  selectedFiles?: FileList;
  currentFile?: File;
  progress = 0;
  message = '';
  fileInfos?: Observable<any>;

  constructor(
    private _formBuilder: FormBuilder,
    private _mediaService: MediaService,
    private _moduleService: ModuleService,
    private _router: Router,
    private _localStorageService: LocalStorageService,
    private _snackBar: MatSnackBar,
    private _fileUpload: FileUploadService,
    @Optional() @Inject(MAT_DIALOG_DATA) public onModal: boolean,
    @Optional() public dialogRef: MatDialogRef<CreateMediaComponent>
  ) {}

  ngOnInit(): void {
    this.mediaForm = this._formBuilder.group({
      title: ['', [Validators.required]],
      summary: [''],
      duration: ['', [Validators.required, Validators.min(0)]],
      url: [''],
      typeMedia: [this.optionsMethod[2], [Validators.required]],
      file: [null],
    });
    this.fileInfos = this._fileUpload.getFiles();
  }

  updateValue() {
    this.mediaForm.updateValueAndValidity();
  }

  get c(): { [key: string]: AbstractControl } {
    return this.mediaForm.controls;
  }

  get optionsMethod() {
    return Array.from(this.options.keys());
  }

  onSubmit(): void {
    const typeMediaValue = this.mediaForm.get('typeMedia')?.value;
    if (
      typeMediaValue &&
      ['Document', 'Image', 'Slide', 'PDF'].includes(typeMediaValue)
    ) {
      this.submitMediaWithFile();
    } else {
      this.submitMediaWithURL();
    }
    // this.mediaForm.reset();
  }

  onNoClick() {
    this.onModal ? this.dialogRef.close() : this.newItemEvent.emit(false);
  }

  selectFile(event: any): void {
    this.selectedFiles = event.target.files;
    // console.log(this.selectedFiles);
    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);
      if (file) {
        this.mediaForm.controls['file'].setValue(file);
      }
    }
  }

  private submitMediaWithURL() {
    const typeMediaID = this.options.get(this.mediaForm.value.typeMedia);
    const conceptor: Member = this._localStorageService.getMemberFromStorage();
    const newConceptor: any = { id: conceptor.id };
    const typeMedia: any = {
      id: typeMediaID,
      title: this.mediaForm.value.typeMedia,
    };
    const media: MediaType = {
      title: this.c['title'].value,
      summary: this.c['summary'].value,
      duration: this.c['duration'].value,
      url: this.c['url'].value,
      typeMedia: typeMedia,
      creator: newConceptor,
    };
    this.onModal
      ? this.dialogRef.close(media)
      : this._mediaService
          .add(media)
          .pipe(take(1))
          .subscribe({
            next: (response: any) => {
              // TODO Display Success Message
              // console.log(response);
              this._snackBar.open(`"${media.title}" was created.`, 'Close');
              this._router.navigate(['dashboard/conceptor/media']);
            },
            complete: () => {
              this.mediaForm.reset();
            },
          });
  }
  onBack() {
    this.onModal
      ? this.dialogRef.close(this.mediaForm.value)
      : this._router.navigate(['../']);
  }
  private async submitMediaWithFile(): Promise<void> {
    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);

      if (file) {
        this.currentFile = file;

        try {
          const response = await lastValueFrom(
            this._fileUpload.uploadFile(this.currentFile)
          );
          // console.log(response);
          const mediaUrl = response.toString();
          const typeMediaID = this.options.get(this.mediaForm.value.typeMedia);
          const conceptor: Member =
            this._localStorageService.getMemberFromStorage();
          const newConceptor: any = { id: conceptor.id };
          const typeMedia: any = {
            id: typeMediaID,
            title: this.mediaForm.value.typeMedia,
          };
          const media: MediaType = {
            title: this.c['title'].value,
            summary: this.c['summary'].value,
            duration: this.c['duration'].value,
            url: mediaUrl,
            typeMedia: typeMedia,
            creator: newConceptor,
          };
          this.onModal
            ? this.dialogRef.close(media)
            : this._mediaService
                .add(media)
                .pipe(take(1))
                .subscribe({
                  next: (response: any) => {
                    // TODO Display Success Message
                    // console.log(response);

                    this._snackBar.open(
                      `"${media.title}" was created.`,
                      'Close'
                    );
                    this._router.navigate(['/']);
                  },
                  complete: () => {
                    this.mediaForm.reset();
                  },
                });
          this.fileInfos = this._fileUpload.getFiles();
        } catch (error) {
          this.message = 'Could not upload the file!';
          this._snackBar.open(`${this.message}`, 'Close');

          this.currentFile = undefined;
        }
      }

      this.selectedFiles = undefined;
    }
  }
}
