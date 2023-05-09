import { Component, EventEmitter, Inject, Input, OnInit, Optional, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { take } from 'rxjs';
import { MediaType } from 'src/app/course/types/media-type';
import { MediaService } from 'src/app/medias/services/media.service';
import { fadeInOut } from 'src/app/shared/animations/fadeInOut';

@Component({
  selector: 'app-add-media',
  templateUrl: './add-media.component.html',
  styleUrls: ['./add-media.component.scss'],
  animations: [fadeInOut]
})
export class AddMediaComponent implements OnInit {

  public medias: MediaType[] = []
  public mediasFiltered: MediaType[] = []
  public searchText: string = ''

  @Input()
  public mediasInModule: Array<MediaType> = new Array<MediaType>()

  @Output()
  public idMedia: EventEmitter<number> = new EventEmitter<number>()


  constructor(private _service: MediaService,
    @Optional() @Inject(MAT_DIALOG_DATA) public onModal: boolean,
    @Optional() public dialogRef: MatDialogRef<AddMediaComponent>) { }

  ngOnInit(): void {
    this._service.findAll()
      .pipe(
        take(1)
      ).subscribe((medias: MediaType[]) => {
        this.mediasFiltered = medias
        this.mediasInModule.forEach(media => {
          this.mediasFiltered = this.mediasFiltered.filter((m) => (media.id !== m.id))
        })
        this.medias = this.mediasFiltered
        this.medias.sort((s1: MediaType, s2: MediaType) => s1.id! - s2.id!)
      })

  }

  public addMedia(id: number) {
    if (this.onModal) {
      this._service.findOne(id)
        .pipe(
          take(1)
        ).subscribe((media: MediaType) => {

          this.dialogRef.close(media)
        })

    } else {
      this.idMedia.emit(id)
      let removeIndex = this.medias.map(item => item.id).indexOf(id);
      (removeIndex >= 0) && this.medias.splice(removeIndex, 1);
    }

  }


  public onSearchTextEntered(searchValue: string) {
    this.searchText = searchValue
  }

}
