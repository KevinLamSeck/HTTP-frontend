import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { fadeInOut } from 'src/app/shared/animations/fadeInOut';
import { MediaService } from '../../services/media.service';

@Component({
  selector: 'app-view-media',
  templateUrl: './view-media.component.html',
  styleUrls: ['./view-media.component.scss'],
  animations: [fadeInOut]
})
export class ViewMediaComponent implements OnInit {
  public medias: any;

  constructor(
    private _mediaService: MediaService,
    private _route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const id: number = +this._route.snapshot.paramMap.get('id')!;
    this._mediaService.findOne(id).subscribe({
      next: (media: any) => {
        this.medias = media;
        // console.log(this.medias);
      },
      error: (error: any) => {
        console.log('Something went wrong');
      },
    });
  }
}
