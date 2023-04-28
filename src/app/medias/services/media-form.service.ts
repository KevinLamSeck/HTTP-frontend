import { Injectable } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, map } from 'rxjs';
import { LocalStorageService } from 'src/app/core/services/local-storage.service';
import { MediaType } from 'src/app/course/types/media-type';
import { Member } from 'src/app/user/models/member';
import { MediaService } from './media.service';

@Injectable({
  providedIn: 'root'
})
export class MediaFormService {
  private _form: FormGroup = new FormGroup({});
  public media!: MediaType;
  public filenameWithExtension!: string;

  private readonly conceptor: Member = this._localStorageService.getMemberFromStorage();
  private readonly conceptorID: any = { id: this.conceptor.id };

  private _options = new Map<string, number>([
    ["Video", 1],
    ["Slide", 2],
    ["Document", 3],
    ["Audio", 4],
    ["Image", 5],
    ["Animation", 6],
    ["Interactive", 7],
    ["PDF", 8],
  ]);

  private _defaultTypeMedia: any = {
    id: 3,
    title: 'Document',
  };

  private _media: MediaType = {
    title: '',
    summary: '',
    duration: 0,
    url: '',
    typeMedia: this._defaultTypeMedia,
    creator: this.conceptorID,
  };;


  constructor(
    private _formBuilder: FormBuilder,
    private _mediaService: MediaService,
    private _localStorageService: LocalStorageService,
  ) {
    this._buildForm();
  }

  public get c(): { [key: string]: AbstractControl } {
    return this._form.controls
  }

  public buildForm(media: MediaType): void {
    this._media = media
    this._buildForm()
  }

  get form(): FormGroup {
    return this._form
  }

  get optionsMethod() {
    return Array.from(this._options.keys());
  }

  getForm(): FormGroup {
    return this._form
  }

  public onSubmit(): Observable<any> {
    if (this._media.id) {
      // Set the form value to media
      this._form.setValue(this._media);
      return this._mediaService.update(this._media).pipe(
        map(_ => this._media)
      )
    }

    const typeMediaID = this._options.get(this.form.value.typeMedia);
    const typeMedia: any = {
      id: typeMediaID,
      title: this.form.value.typeMedia,
    };
    const media: MediaType = {
      title: this.c["title"].value,
      summary: this.c["summary"].value,
      duration: this.c["duration"].value,
      url: this.c["url"].value,
      typeMedia: typeMedia,
      creator: this.conceptorID,
    };

    return this._mediaService.update(this._media).pipe(
      map(_ => this._media)
    )

  }

  private _buildForm(): void {
    let file;

    // Check si dans l'URL si il commence par http://127.0.0.1:5000/files/ et load le file
    if (this._media.url.startsWith('http://127.0.0.1:5000/files/')) {
      const urlOfMedia = this._media.url
      this.filenameWithExtension = urlOfMedia.substring(urlOfMedia.lastIndexOf('/') + 1);
    }

    const optionsArray = Array.from(this._options.entries());
    const index = optionsArray.findIndex(([key, value]) => key === this._media.typeMedia.title);

    this._form = this._formBuilder.group({
      title: [this._media.title, [Validators.required, Validators.maxLength(50)]],
      summary: [this._media.summary],
      duration: [this._media.duration, [Validators.required]],
      url: [this._media.url],
      typeMedia: [this.optionsMethod[index], [Validators.required]],
      // file: [],
    })
  }
}
