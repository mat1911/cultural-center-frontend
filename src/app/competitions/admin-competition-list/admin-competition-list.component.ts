import { Component, OnInit } from '@angular/core';
import { ICompetition } from '../shared/competition';
import { CompetitionsService } from '../shared/competitions.service';

@Component({
  selector: 'app-admin-competition-list',
  templateUrl: './admin-competition-list.component.html',
  styleUrls: ['./admin-competition-list.component.css']
})
export class AdminCompetitionListComponent implements OnInit {

  competitionList: ICompetition[];
  collectionSize: number;
  page: number = 1;
  pageSize: number = 10;

  constructor(private competitonService: CompetitionsService) { }

  ngOnInit(): void {
    this.loadCompetitionPage();
  }

  onPageChanged(): void {
    this.loadCompetitionPage();
  }

  private loadCompetitionPage(): void{
    this.competitonService.getCompetitions(this.page, this.pageSize).subscribe({
      next: responseData => {
        this.competitionList = responseData.data;
        this.collectionSize = responseData.fullContentSize;
      },
      error: err => console.log(err)
    });
  }

}
