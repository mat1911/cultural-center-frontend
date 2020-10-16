import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IApplication } from '../shared/application';
import { CareerService } from '../shared/career.service';

@Component({
  selector: 'app-admin-applicant-details',
  templateUrl: './admin-applicant-details.component.html',
  styleUrls: ['./admin-applicant-details.component.css']
})
export class AdminApplicantDetailsComponent implements OnInit {

  jobOfferId: number;
  applicantId: number;
  currentApplication: IApplication;

  constructor(private activatedRoute: ActivatedRoute, private careerService: CareerService) { }

  ngOnInit(): void {
    this.jobOfferId = +this.activatedRoute.snapshot.paramMap.get('jobOfferId');
    this.applicantId = +this.activatedRoute.snapshot.paramMap.get('applicantId');

    this.careerService.getApplicant(this.jobOfferId, this.applicantId).subscribe({
      next: responseData => this.currentApplication = responseData,
      error: err => console.log(err)
    });
  }
}
