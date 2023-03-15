import { Component, Input, OnInit } from '@angular/core';
import { ModuleType } from '../../types/module-type';

@Component({
  selector: 'app-module-list',
  templateUrl: './module-list.component.html',
  styleUrls: ['./module-list.component.scss']
})
export class ModuleListComponent implements OnInit {

  @Input() modules: ModuleType[] = []

  constructor() { }

  ngOnInit(): void {
  }

}
