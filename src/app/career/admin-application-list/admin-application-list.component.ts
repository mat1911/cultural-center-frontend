import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IApplication } from '../shared/application';
import { CareerService } from '../shared/career.service';

@Component({
  selector: 'app-admin-application-list',
  templateUrl: './admin-application-list.component.html',
  styleUrls: ['./admin-application-list.component.css']
})
export class AdminApplicationListComponent implements OnInit {

  jobOfferId: number;

  applicationList: IApplication[];
  collectionSize: number;
  page: number = 1;
  pageSize: number = 10;

  constructor(private activatedRoute: ActivatedRoute, private careerService: CareerService) { }

  ngOnInit(): void {
    this.jobOfferId = +this.activatedRoute.snapshot.paramMap.get('id');
    this.loadApplicaitonsPage();
  }

  onPageChanged(): void {
    this.loadApplicaitonsPage();
  }

  loadApplicaitonsPage(keyword: string = ''): void{
    this.careerService.getAllApplications(this.jobOfferId, this.page, this.pageSize, keyword).subscribe({
      next: responseData => {
        this.applicationList = responseData.data;
        this.collectionSize = responseData.fullContentSize;
      },
      error: err => console.log(err)
    });
  }

  removeApplication(userId: number): void{
    this.careerService.deleteApplication(this.jobOfferId, userId).subscribe({
      next: repsonse => this.ngOnInit()})
  }
}
