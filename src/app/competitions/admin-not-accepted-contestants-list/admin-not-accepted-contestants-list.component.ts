import { Component, Input, OnInit } from '@angular/core';
import { CompetitionsService } from '../shared/competitions.service';
import { IContestant } from '../shared/contestant';

@Component({
  selector: 'app-admin-not-accepted-contestants-list',
  templateUrl: './admin-not-accepted-contestants-list.component.html',
  styleUrls: ['./admin-not-accepted-contestants-list.component.css']
})
export class AdminNotAcceptedContestantsListComponent implements OnInit {

  @Input() competitionId: number;
  selectedContestantId: number;
  notAcceptedContestants: IContestant[];

  collectionSize: number;
  page: number = 1;
  pageSize: number = 10;

  constructor(private competitionService: CompetitionsService) { }

  ngOnInit(): void {
    this.loadNotAcceptedContestants();
  }

  onPageChanged(): void{
    this.loadNotAcceptedContestants();
  }

  loadNotAcceptedContestants(): void{
    this.competitionService.getNotAcceptedCompetitionContestants(this.competitionId, this.page, this.pageSize).subscribe({
      next: responseData => {
        this.notAcceptedContestants = responseData.data;
        this.collectionSize = responseData.fullContentSize;
      },
      error: err => console.log(err)
    });
  }

  acceptContestant(): void{
    this.competitionService.changeContestantAcceptance(this.competitionId, this.selectedContestantId, true).subscribe({
      next: responseData => this.ngOnInit(),
      error: err => console.log(err)
    });;
  }

  removeContestant(): void{
    this.competitionService.deleteContestant(this.competitionId, this.selectedContestantId).subscribe(
      (response) => this.ngOnInit()
    );
  }
}
