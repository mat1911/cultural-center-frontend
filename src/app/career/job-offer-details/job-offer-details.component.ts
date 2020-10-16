import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth.service';
import { NotificationService } from 'src/app/core/notification.service';
import { CareerService } from '../shared/career.service';
import { IJobOffer } from '../shared/job-offer';

@Component({
  selector: 'app-job-offer-details',
  templateUrl: './job-offer-details.component.html',
  styleUrls: ['./job-offer-details.component.css']
})
export class JobOfferDetailsComponent implements OnInit {

  jobOfferId: number;
  currentJobOffer: IJobOffer;
  collectionSize: number;
  page: number = 1;
  pageSize: number = 10;

  constructor(private activatedRoute: ActivatedRoute, private careerService: CareerService, private authService: AuthService, private router: Router,
    private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.jobOfferId = +this.activatedRoute.snapshot.paramMap.get('id');

    this.careerService.getJobOfferById(this.jobOfferId).subscribe({
      next: responseData => this.currentJobOffer = responseData,
      error: err => console.log(err)
    });
  }

  showNewApplicantPage(): void{
    if(this.authService.isLoggedIn()){
      this.router.navigateByUrl(`/careers/${this.jobOfferId}/applicant/new`)
    }else{
      this.notificationService.dispatch({message: "Aplikować mogą tylko zalogowaniu użytkownicy!", type: 'warning', dismissable: true})
    }
  }
}
