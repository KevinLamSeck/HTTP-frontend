import { Component, OnInit } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { take } from "rxjs";
import { LocalStorageService } from "src/app/core/services/local-storage.service";
import { ToastService } from "src/app/core/toast.service";
import { MediaType } from "src/app/course/types/media-type";
import { fadeInOut } from "src/app/shared/animations/fadeInOut";
import { Member } from "src/app/user/models/member";
import { MediaService } from "../../services/media.service";

@Component({
  selector: "app-list-media",
  templateUrl: "./list-media.component.html",
  styleUrls: ["./list-media.component.scss"],
  animations: [fadeInOut]
})
export class ListMediaComponent implements OnInit {
  public medias: MediaType[] = [];
  public toggleFilter: boolean = false;
  public mediasFiltered: MediaType[] = [];
  public selectedType: string | null = null;
  public nameOrder: boolean = true;

  public typeMediasChips: string[] = [
    "Video",
    "Slide",
    "Document",
    "Image",
    "Audio",
    "Animation",
    "Interactive ",
    "PDF",
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
    this._loadMediasFromService();
  }

  private _loadMediasFromService(): void {
    this._mediaService.findByCreator(this._currentUser.id!)
      .pipe(take(1))
      .subscribe((response: MediaType[]) => {
        this.medias = response;
        const mediaTypes = new Set<string>(this.medias.map(media => media.typeMedia.title));
        this.typeMediasChips = Array.from(mediaTypes);
        this.mediasFiltered = [...this.medias];
        this.mediasFiltered = this.mediasFiltered.sort(
          (a, b) => a.title.localeCompare(b.title) * 1
        );
      });
  }

  allMedias(): void {
    this.mediasFiltered = this.medias;
  }

  filterByType(type: string): void {
    if (this.selectedType === type) {
      this.selectedType = null;
      this.mediasFiltered = this.medias;
    } else {
      this.selectedType = type;
      this.mediasFiltered = this.medias.filter(
        (media) => media.typeMedia.title.toLowerCase() === type.toLowerCase()
      );
    }
  }

  isTypeMediaHasMedias(type: string): boolean {
    return this.medias.some(
      (media) => media.typeMedia.title.toLowerCase() === type.toLowerCase()
    );
  }

  handleMediaInfoChange(mediaDeleted: MediaType): void {
    this.mediasFiltered = this.mediasFiltered.filter(
      (media) => media.id !== mediaDeleted.id
    );
    this.medias = this.medias.filter(
      (media) => media.id !== mediaDeleted.id
    );
    const mediaTypes = new Set<string>(this.medias.map(media => media.typeMedia.title));
    this.typeMediasChips = Array.from(mediaTypes);
    this._snackBar.open(`"${mediaDeleted!.title}" was deleted.`, "Close", { duration: 2000 });
  }


}
