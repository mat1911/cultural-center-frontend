import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {

  @Output() search: EventEmitter<string> = new EventEmitter<string>();
  keyword: string = ''; 

  constructor() { }

  ngOnInit(): void {
  }

  keywordSubmitted(): void{
    this.search.emit(this.keyword);
  }

}
