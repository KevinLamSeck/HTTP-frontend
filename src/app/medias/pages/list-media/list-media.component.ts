import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { take } from 'rxjs';
import { LocalStorageService } from 'src/app/core/services/local-storage.service';
import { ToastService } from 'src/app/core/toast.service';
import { MediaType } from 'src/app/course/types/media-type';
import { Member } from 'src/app/user/models/member';
import { MediaService } from '../../services/media.service';

@Component({
  selector: 'app-list-media',
  templateUrl: './list-media.component.html',
  styleUrls: ['./list-media.component.scss'],
})
export class ListMediaComponent implements OnInit {
  public medias: MediaType[] = [];
  public toggleFilter: boolean = false;
  public mediasFiltered: MediaType[] = [];
  public selectedType: string | null = null;

  public typeMediasChips: string[] = [
    'Video',
    'Slide',
    'Document',
    'Image',
    'Audio',
    'Animation',
    'Interactive ',
    'PDF',
  ];

  private _localStorageService: LocalStorageService =
    LocalStorageService.getInstance();
  private _currentUser: Member =
    this._localStorageService.getMemberFromStorage();

  constructor(
    private _mediaService: MediaService,
    private _toastService: ToastService,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this._mediaService
      .findByCreator(this._currentUser.id!)
      .pipe(take(1))
      .subscribe((response: MediaType[]) => {
        this.medias = response;
        this.mediasFiltered = [...this.medias];
      });
  }

  allMedias(): void {
    this.mediasFiltered = this.medias;
  }

  filterByType(type: string): void {
    if (this.selectedType === type) {
      // If the clicked type is already selected, toggle the selection off
      this.selectedType = null;
      this.mediasFiltered = this.medias;
    } else {
      // Otherwise, set the clicked type as selected and filter the medias by type
      this.selectedType = type;
      this.mediasFiltered = this.medias.filter(
        (media) => media.typeMedia.title.toLowerCase() === type.toLowerCase()
      );
    }
  }

  handleMediaInfoChange(mediaDeleted: MediaType): void {
    this.medias = this.medias.filter((media) => media.id !== mediaDeleted.id);
    this._snackBar.open(`"${mediaDeleted!.title}" was deleted.`, 'Close');
  }
}
