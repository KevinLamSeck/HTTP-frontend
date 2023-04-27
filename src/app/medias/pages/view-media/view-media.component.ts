import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-media',
  templateUrl: './view-media.component.html',
  styleUrls: ['./view-media.component.scss'],
})
export class ViewMediaComponent implements OnInit {
  public medias: any;

  constructor() {
    this.medias = JSON.parse(sessionStorage.getItem('ViewMedia') + '');
  }

  ngOnInit(): void {}
}
