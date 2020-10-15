import { Component, Input, OnInit } from '@angular/core';
import { CompetitionsService } from '../shared/competitions.service';
import { IContestant } from '../shared/contestant';

@Component({
  selector: 'app-competition-contestants-list',
  templateUrl: './competition-contestants-list.component.html',
  styleUrls: ['./competition-contestants-list.component.css']
})
export class CompetitionContestantsListComponent implements OnInit {

  @Input() competitionId: number;

  contestantList: IContestant[];

  collectionSize: number;
  page: number = 1;
  pageSize: number = 10;
  maxCarouselSlides: number = 4;

  constructor(private competitionService: CompetitionsService) { }

  ngOnInit(): void {
    this.loadContestantsData();
  }

  loadContestantsData(keyword: string = ''): void{
    this.competitionService.getCompetitionContestants(this.competitionId, this.page, this.pageSize, keyword).subscribe({
      next: responseData => {
        this.contestantList = responseData.data;
        this.collectionSize = responseData.fullContentSize;
      },
      error: err => console.log(err)
    });
  }

}
