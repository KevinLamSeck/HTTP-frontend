import { Component, OnInit } from '@angular/core';
import { MediaService } from '../../services/media.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss'],
})
export class PlayerComponent implements OnInit {
  public medias: any;

  constructor(
    private _route: ActivatedRoute,
    private _mediaService: MediaService
  ) {}

  ngOnInit(): void {
    const id: number = +this._route.snapshot.paramMap.get('id')!;
    this._mediaService.findOne(id).subscribe({
      next: (media: any) => {
        this.medias = media;
      },
      error: (error: any) => {
        console.log('Something went wrong');
      },
    });
  }
}
