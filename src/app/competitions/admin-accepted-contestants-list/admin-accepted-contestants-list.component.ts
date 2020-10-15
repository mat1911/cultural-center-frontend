import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/auth.service';
import { CompetitionsService } from '../shared/competitions.service';
import { IContestant } from '../shared/contestant';

@Component({
  selector: 'app-admin-accepted-contestants-list',
  templateUrl: './admin-accepted-contestants-list.component.html',
  styleUrls: ['./admin-accepted-contestants-list.component.css']
})
export class AdminAcceptedCompetitionsListComponent implements OnInit {

  
  @Input() competitionId: number;
  selectedContestantId: number;
  acceptedContestants: IContestant[];

  collectionSize: number;
  page: number = 1;
  pageSize: number = 10;

  constructor(private competitionService: CompetitionsService, private authService: AuthService) { }

  ngOnInit(): void {
    this.loadAcceptedContestants();
  }

  onPageChanged(): void{
    this.loadAcceptedContestants();
  }

  loadAcceptedContestants(keyword: string = ''): void{
    this.competitionService.getCompetitionContestants(this.competitionId, this.page, this.pageSize, keyword).subscribe({
      next: responseData => {
        this.acceptedContestants = responseData.data;
        this.collectionSize = responseData.fullContentSize;
      },
      error: err => console.log(err)
    });
  }

  cancelAcceptance(): void{
    this.competitionService.changeContestantAcceptance(this.competitionId, this.selectedContestantId, false).subscribe({
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
