import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {


  public enteredSearchValue: string = ''

  @Output()
  public searchTextChange: EventEmitter<string> = new EventEmitter<string>()

  constructor() { }

  ngOnInit(): void {
  }

  public onSearchTextChanged(): void {
    this.searchTextChange.emit(this.enteredSearchValue)
  }


}
