import { Component, OnInit } from '@angular/core';
import { CareerService } from '../shared/career.service';
import { IJobOffer } from '../shared/job-offer';

@Component({
  selector: 'app-job-offers-list',
  templateUrl: './job-offers-list.component.html',
  styleUrls: ['./job-offers-list.component.css']
})
export class JobOffersListComponent implements OnInit {


  jobOffersList: IJobOffer[];
  collectionSize: number;
  page: number = 1;
  pageSize: number = 10;

  constructor(private careerService: CareerService) { }

  ngOnInit(): void {
    this.loadJobOffersPage();
  }

  onPageChanged(): void {
    this.loadJobOffersPage();
  }

  loadJobOffersPage(keyword: string = ''): void{
    this.careerService.getAllJobOffers(this.page, this.pageSize, keyword).subscribe({
      next: responseData => {
        this.jobOffersList = responseData.data;
        this.collectionSize = responseData.fullContentSize;
      },
      error: err => console.log(err)
    });
  }
}
