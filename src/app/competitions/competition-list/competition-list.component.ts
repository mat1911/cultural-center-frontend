import { Component, OnInit } from '@angular/core';
import { ICompetition } from '../shared/competition';
import { CompetitionsService } from '../shared/competitions.service';

@Component({
  selector: 'app-competition-list',
  templateUrl: './competition-list.component.html',
  styleUrls: ['./competition-list.component.css']
})
export class CompetitionListComponent implements OnInit {

  competitionList: ICompetition[];

  collectionSize: number;
  page: number = 1;
  pageSize: number = 10;
  maxCarouselSlides: number = 4;

  constructor(private competitionService: CompetitionsService) { }

  ngOnInit(): void {
    this.loadCompetitionsPage();
  }

  loadCompetitionsPage(): void{
    this.competitionService.getCompetitions(this.page, this.pageSize).subscribe({
      next: responseData => {
        this.competitionList = responseData.data;
        this.collectionSize = responseData.fullContentSize;
      },
      error: err => console.log(err)
    });
  }

}
