import {
  Component,
  EventEmitter,
  Inject,
  Input,
  OnInit,
  Optional,
  Output,
} from "@angular/core";
import { AbstractControl, FormBuilder, FormGroup } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ActivatedRoute, Router } from "@angular/router";
import { Observable, lastValueFrom, take, tap } from "rxjs";
import { FileUploadService } from "src/app/core/services/file-upload.service";
import { LocalStorageService } from "src/app/core/services/local-storage.service";
import { MediaType } from "src/app/course/types/media-type";
import { ModuleService } from "src/app/modules/services/module.service";
import { fadeInOut } from "src/app/shared/animations/fadeInOut";
import { Member } from "src/app/user/models/member";
import { MediaFormService } from "../../services/media-form.service";
import { MediaService } from "../../services/media.service";
import { CreateMediaComponent } from "../create-media/create-media.component";

@Component({
  selector: "app-update-media",
  templateUrl: "../create-media/create-media.component.html",
  styleUrls: ["./update-media.component.scss"],
  animations: [fadeInOut]
})
export class UpdateMediaComponent implements OnInit {
  @Input() visibility: boolean = false;
  @Output() newItemEvent = new EventEmitter<boolean>();

  public actionTitle: string = "Update";
  public media!: MediaType;
  public fileName!: string;

  public mediaForm: FormGroup = new FormGroup({});
  public mediaToUpdate: MediaType | undefined;
  private _mediaID: any;

  public selectedOption: string = "";

  public options = new Map<string, number>([
    ["Video", 1],
    ["Slide", 2],
    ["Document", 3],
    ["Audio", 4],
    ["Image", 5],
    ["Animation", 6],
    ["Interactive", 7],
    ["PDF", 8],
  ]);

  selectedFiles?: FileList;
  currentFile?: File;
  progress = 0;
  message = "";
  fileInfos?: Observable<any>;

  constructor(
    private _formBuilder: FormBuilder,
    private _mediaService: MediaService,
    private _moduleService: ModuleService,
    private _router: Router,
    private _mediaFormService: MediaFormService,
    private _activatedRoute: ActivatedRoute,
    private _localStorageService: LocalStorageService,
    private _snackBar: MatSnackBar,
    private _fileUpload: FileUploadService,
    @Optional() @Inject(MAT_DIALOG_DATA) public onModal: boolean,
    @Optional() public dialogRef: MatDialogRef<CreateMediaComponent>
  ) { }

  ngOnInit(): void {
    // Retrive the ID from th query params
    this._mediaID = this._activatedRoute.snapshot.queryParams["id"];

    // Find the media to update in the service
    this._mediaService.findOne(this._mediaID)
      .pipe(
        tap((media: MediaType) => {
          this.media = media;
          this._mediaFormService.buildForm(this.media);
          this.mediaForm = this._mediaFormService.form;

          if (this.hasFile()) {
            this.fileName = this._getFilenameWithoutUUID(this._mediaFormService.filenameWithExtension)
          }
        })
      )
      .subscribe(
        null,
        (error) => {
          this._snackBar.open("Something went wrong: " + error, 'Close', { duration: 1500 });
        }
      );

  }

  get c(): { [key: string]: AbstractControl } {
    return this.mediaForm.controls;
  }

  get optionsMethod() {
    return Array.from(this.options.keys());
  }

  hasFile(): boolean {
    return this.media.url.startsWith('http://127.0.0.1:5000/files/');
  }

  onBack() {
    this.onModal
      ? this.dialogRef.close(this.mediaForm.value)
      : this._router.navigate(['dashboard/conceptor/media']);
  }

  onSubmit(): void {
    const ALLOWED_MEDIA_TYPES = ["Document", "Image", "Slide", "PDF"];
    const typeMediaValue = this.mediaForm.get("typeMedia")?.value;
    if (typeMediaValue && ALLOWED_MEDIA_TYPES.includes(typeMediaValue)) {
      this.submitMediaWithFile();
    } else {
      this.submitMediaWithURL();
    }
  }

  onNoClick() {
    this.onModal
      ? this.dialogRef.close(this.mediaForm.value)
      : this.newItemEvent.emit(false);
  }

  selectFile(event: any): void {
    this.selectedFiles = event.target.files;
    // console.log(this.selectedFiles);
    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);
      if (file) {
        this.mediaForm.controls["file"].setValue(file);
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
      id: this._mediaID,
      title: this.c["title"].value,
      summary: this.c["summary"].value,
      duration: this.c["duration"].value,
      url: this.c["url"].value,
      typeMedia: typeMedia,
      creator: newConceptor,
    };
    this.onModal
      ? this.dialogRef.close(media)
      : this._mediaService
        .update(media)
        .pipe(take(1))
        .subscribe({
          next: (response: any) => {
            this._router.navigate(["dashboard/conceptor/media"]);
            this._snackBar.open(`"${media.title}" was created.`, "Close", { duration: 1500 });
          },
          complete: () => {
            this.mediaForm.reset();
          },
        });
  }

  private async submitMediaWithFile(): Promise<void> {
    const typeMediaID = this.options.get(this.mediaForm.value.typeMedia);
    const conceptor: Member = this._localStorageService.getMemberFromStorage();
    const newConceptor: any = { id: conceptor.id };
    const typeMedia: any = {
      id: typeMediaID,
      title: this.mediaForm.value.typeMedia,
    };
    const media: MediaType = {
      id: this._mediaID,
      title: this.c["title"].value,
      summary: this.c["summary"].value,
      duration: this.c["duration"].value,
      url: '',
      typeMedia: typeMedia,
      creator: newConceptor,
    };

    if (!this.selectedFiles) {
      media.url = this.media.url;
      const operation = this._mediaService.update(media).pipe(take(1)).subscribe({
        next: () => {
          this._router.navigate(["dashboard/conceptor/media"]);
          this._snackBar.open(`"${media.title}" a été mis à jour.`, "Fermer");
        },
        complete: () => {
          this.mediaForm.reset();
        },
      });
      await operation;
      return;
    }

    const file: File | null = this.selectedFiles.item(0);

    if (!file) {
      return;
    }

    this.currentFile = file;

    try {
      const response = await lastValueFrom(this._fileUpload.uploadFile(this.currentFile));
      const mediaUrl = response.toString();
      media.url = mediaUrl;

      const operation = this.onModal ? this.dialogRef.close(media) : this._mediaService.update(media).pipe(take(1)).subscribe({
        next: () => {
          this._router.navigate(["dashboard/conceptor/media"]);
          this._snackBar.open(`"${media.title}" a été mis à jour.`, "Fermer");
        },
        complete: () => {
          this.mediaForm.reset();
        },
      });
      await operation;
      this.fileInfos = this._fileUpload.getFiles();

    } catch (error) {
      this.message = "Impossible de téléverser le fichier !";
      this._snackBar.open(`${this.message}`, "Fermer");
      this.currentFile = undefined;
    }

    this.selectedFiles = undefined;
  }


  private _getFilenameWithoutUUID(filename: string): string {
    const [, name] = filename.split('_');
    return name;
  }

}
