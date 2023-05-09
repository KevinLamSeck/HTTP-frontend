import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { fadeInOut } from 'src/app/shared/animations/fadeInOut';
import { Tile } from '../../models/tile';

@Component({
  selector: 'app-tile',
  templateUrl: './tile.component.html',
  styleUrls: ['./tile.component.scss'],
  animations: [fadeInOut]
})
export class TileComponent implements OnInit {
  @Input() public tileInfo!: Tile;

  constructor(private _router: Router) { }

  ngOnInit(): void {
    // // console.log(this.tileInfo.svg);
  }

  public onClick(object: any): void {
    this._router.navigate(object.action);
  }
}
