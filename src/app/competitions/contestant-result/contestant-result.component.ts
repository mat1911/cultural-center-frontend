import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth.service';
import { NotificationService } from 'src/app/core/notification.service';
import { CompetitionsService } from '../shared/competitions.service';
import { IContestant } from '../shared/contestant';

@Component({
  selector: 'app-contestant-result',
  templateUrl: './contestant-result.component.html',
  styleUrls: ['./contestant-result.component.css']
})
export class ContestantResultComponent implements OnInit {

  userId: number;
  competitionId: number;

  currentContestant: IContestant;

  constructor(private activatedRoute: ActivatedRoute, private competitionService: CompetitionsService,
    private authService: AuthService, private notificationService: NotificationService, private router: Router) { }

  ngOnInit(): void {
    this.competitionId = +this.activatedRoute.snapshot.paramMap.get('competitionId');
    this.userId = +this.activatedRoute.snapshot.paramMap.get('userId');

    console.log(this.userId);

    this.loadUserResult();
  }

  loadUserResult(): void {
    this.competitionService.getContestantResult(this.competitionId, this.userId).subscribe({
      next: response => this.currentContestant = response,
      error: err => console.log(err)
    })
  }

  voteForContestant(): void {
    if (this.authService.isLoggedIn()) {
      this.competitionService.voteForContestant(this.competitionId, this.userId, this.authService.getAuthenticatedUserId()).subscribe({
        next: response => {
          this.notificationService.dispatch({ dismissible: true, type: 'success', message: 'Dziękujemy za oddanie głosu!' });
          this.router.navigate(['/competitions']);
        },
        error: err => console.log(err)
      })
    }else{
      this.notificationService.dispatch({ dismissible: true, type: 'warning', message: 'Głosować mogą tylko zalogowani użytkownicy!' });
      window.scroll(0, 0);
    }
  }

}
