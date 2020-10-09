import { Component, OnInit } from '@angular/core';
import { IAffair } from '../shared/affair';
import { AffairService } from '../shared/affair.service';

@Component({
  selector: 'app-admin-affairs-list',
  templateUrl: './admin-affairs-list.component.html',
  styleUrls: ['./admin-affairs-list.component.css']
})
export class AdminAffairsListComponent implements OnInit {

  affairList: IAffair[];
  collectionSize: number;
  page: number = 1;
  pageSize: number = 10;

  constructor(private affairService: AffairService) { }

  ngOnInit(): void {
    this.loadAffairPage();
  }

  onPageChanged(): void {
    this.loadAffairPage();
  }

  private loadAffairPage(): void{
    this.affairService.getAffairs(this.page, this.pageSize).subscribe({
      next: responseData => {
        this.affairList = responseData.data;
        this.collectionSize = responseData.fullContentSize;
      },
      error: err => console.log(err)
    });
  }

}
