import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CourseType } from 'src/app/course/types/course-type';
import { MediaService } from '../../services/media.service';
import { MediaType } from 'src/app/course/types/media-type';

@Component({
  selector: 'app-view-media',
  templateUrl: './view-media.component.html',
  styleUrls: ['./view-media.component.scss'],
})
export class ViewMediaComponent implements OnInit {
  public user: any;
  public course: CourseType;
  public medias: any;

  constructor(
    private _route: ActivatedRoute,
    private _mediaService: MediaService
  ) {
    this.user = JSON.parse(localStorage.getItem('memberData') + '');
    this.course = JSON.parse(sessionStorage.getItem('ModifiedCourse') + '');
  }

  ngOnInit(): void {
    const id: number = +this._route.snapshot.paramMap.get('id')!;
    this._mediaService.findOne(id).subscribe({
      next: (media: any) => {
        console.log(media);
        this.medias = media;
      },
      error: (error: any) => {
        console.log('Something went wrong');
      },
    });
  }
}
