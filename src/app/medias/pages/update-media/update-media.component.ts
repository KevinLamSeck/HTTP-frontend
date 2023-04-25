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
import { Observable, lastValueFrom, take } from "rxjs";
import { FileUploadService } from "src/app/core/services/file-upload.service";
import { LocalStorageService } from "src/app/core/services/local-storage.service";
import { MediaType } from "src/app/course/types/media-type";
import { ModuleService } from "src/app/modules/services/module.service";
import { Member } from "src/app/user/models/member";
import { MediaFormService } from "../../services/media-form.service";
import { MediaService } from "../../services/media.service";
import { CreateMediaComponent } from "../create-media/create-media.component";

@Component({
  selector: "app-update-media",
  templateUrl: "../create-media/create-media.component.html",
  styleUrls: ["./update-media.component.scss"],
})
export class UpdateMediaComponent implements OnInit {
  @Input() visibility: boolean = false;
  @Output() newItemEvent = new EventEmitter<boolean>();

  public actionTitle: string = "Update";
  public media!: MediaType;

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
  ) {}

  ngOnInit(): void {
    // Retrive the ID from th query params
    this._activatedRoute.queryParams.subscribe((params) => {
      this._mediaID = params["id"];
    });

    // Find the media to update in the service
    this._mediaService.findOne(this._mediaID).subscribe({
      next: (media: MediaType) => {
        this.media = media;
        this._mediaFormService.buildForm(this.media);
        this.mediaForm = this._mediaFormService.form;
      },
      error: (error) => {
        console.log("Something went wrong");
      },
    });
  }

  get c(): { [key: string]: AbstractControl } {
    return this.mediaForm.controls;
  }

  get optionsMethod() {
    return Array.from(this.options.keys());
  }
  onBack() {
    this.onModal
      ? this.dialogRef.close(this.mediaForm.value)
      : this._router.navigate(["../"]);
  }

  onSubmit(): void {
    console.log("update");
    console.log(this.mediaForm.value);
    const typeMediaValue = this.mediaForm.get("typeMedia")?.value;
    if (
      typeMediaValue &&
      ["Document", "Image", "Slide", "PDF"].includes(typeMediaValue)
    ) {
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
    console.log(this.selectedFiles);
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
              this._snackBar.open(`"${media.title}" was created.`, "Close");
            },
            complete: () => {
              this.mediaForm.reset();
            },
          });
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
          console.log(response);
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
            id: this._mediaID,
            title: this.c["title"].value,
            summary: this.c["summary"].value,
            duration: this.c["duration"].value,
            url: mediaUrl,
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
                    this._snackBar.open(
                      `"${media.title}" was updated.`,
                      "Close"
                    );
                  },
                  complete: () => {
                    this.mediaForm.reset();
                  },
                });
          this.fileInfos = this._fileUpload.getFiles();
        } catch (error) {
          this.message = "Could not upload the file!";
          this._snackBar.open(`${this.message}`, "Close");

          this.currentFile = undefined;
        }
      }

      this.selectedFiles = undefined;
    }
  }
}
