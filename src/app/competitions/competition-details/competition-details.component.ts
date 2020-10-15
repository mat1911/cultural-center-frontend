import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth.service';
import { NotificationService } from 'src/app/core/notification.service';
import { ICompetition } from '../shared/competition';
import { CompetitionsService } from '../shared/competitions.service';

@Component({
  selector: 'app-competition-details',
  templateUrl: './competition-details.component.html',
  styleUrls: ['./competition-details.component.css']
})
export class CompetitionDetailsComponent implements OnInit {

  competitionId: number;
  currentCompetition: ICompetition;
  errorMessage: string;

  constructor(private route: ActivatedRoute, private competitionsService: CompetitionsService, 
    private authService: AuthService, private router: Router, private notificationService: NotificationService) {}

  ngOnInit(): void {
    this.competitionId = +this.route.snapshot.paramMap.get('id');
    this.loadCompetitionData();
  }

  loadCompetitionData(): void{
    this.competitionsService.getCompetitionById(this.competitionId).subscribe({
      next: responseData => this.currentCompetition = responseData,
      error: err => this.errorMessage = err
    });
  }

  showNewContestantForm(): void{
    if(this.authService.isLoggedIn()){
      this.router.navigate(['/competitions/contestant/new', this.competitionId]);
    }else{
      this.notificationService.dispatch({dismissible: true, type: 'warning', message: 'Prace mogą zgłaszać tylko zalogowani użytkownicy!'});
      window.scroll(0, 0);
    }
  }
}