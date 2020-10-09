import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/core/auth.service';
import { NotificationService } from 'src/app/core/notification.service';
import { IAffair } from '../shared/affair';
import { AffairService } from '../shared/affair.service';

@Component({
  selector: 'app-affairs-list',
  templateUrl: './affairs-list.component.html',
  styleUrls: ['./affairs-list.component.css']
})
export class AffairsListComponent implements OnInit {

  affairList: IAffair[] = [];
  affairsListForCarousel: IAffair[] = [];

  collectionSize: number;
  page: number = 1;
  pageSize: number = 10;
  maxCarouselSlides: number = 4;

  selectedAffair: number;

  constructor(private affairsService: AffairService, private notificationService: NotificationService, public authService: AuthService) { }

  ngOnInit(): void {
    this.loadAffairsPage();
  }

  onPageChanged(): void {
    this.loadAffairsPage();
  }

  addNewAffairRate(rate: number, id: number): void{
    if (this.authService.isLoggedIn()){
      this.affairsService.updateAffairRating(id, this.authService.getAuthenticatedUserId(), rate).subscribe({
        next: responseData => {
          window.scroll(0,0);
          this.notificationService.dispatch({message: 'Dziękujemy za oddanie głosu! Ocena zostanie wkrótce zmodyfikowana.', dismissible: true, type: 'success'})},
        error: err => console.log(err)
      })
    }else{
      this.notificationService.dispatch({message: 'Głosować mogą tylko zalogowani użytkownicy!', dismissible: true, type: 'warning'})
      window.scroll(0,0);
    }
  }

  enrollToAffair(): void{
    if(this.authService.isLoggedIn() && this.selectedAffair != null){
      this.affairsService.enrollUsers(this.selectedAffair, [this.authService.getAuthenticatedUserId()]).subscribe({
        next: responseData => {
          window.scroll(0,0);
          this.notificationService.dispatch({message: 'Zostałeś pomyślnie zapisany na wybrane wydarzenie!', dismissible: true, type: 'success'})},
        error: err => console.log(err)
      })
    }
  }

  private loadAffairsPage(): void{

    this.affairsService.getAffairs(this.page, this.pageSize).subscribe({
      next: responseData => {
        this.affairList = responseData.data;
        this.collectionSize = responseData.fullContentSize;
        this.affairsListForCarousel = this.affairsListForCarousel.length == 0 ? this.affairList.slice(0, this.maxCarouselSlides) : this.affairsListForCarousel;
      },
      error: err => console.log(err)
    })

  }

}
