import { Component, OnInit } from '@angular/core';
import { MediaService } from '../../services/media.service';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss'],
})
export class PlayerComponent implements OnInit {
  public medias: any;
  public safeSrc: SafeResourceUrl | undefined;

  constructor(
    private _route: ActivatedRoute,
    private _mediaService: MediaService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    const id: number = +this._route.snapshot.paramMap.get('id')!;
    this._mediaService.findOne(id).subscribe({
      next: (media: any) => {
        this.medias = media;
        this.safeSrc = this.sanitizer.bypassSecurityTrustResourceUrl(
          'https://w.soundcloud.com/player/?url=' + this.medias?.url
        );
        console.log('https://w.soundcloud.com/player/?url=' + this.medias?.url);
      },
      error: (error: any) => {
        console.log('Something went wrong');
      },
    });
    console.log(this.medias?.url);
  }
}
