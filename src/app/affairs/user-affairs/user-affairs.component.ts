import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/auth.service';
import { NotificationService } from 'src/app/core/notification.service';
import { IAffair } from '../shared/affair';
import { AffairService } from '../shared/affair.service';

@Component({
  selector: 'app-user-affairs',
  templateUrl: './user-affairs.component.html',
  styleUrls: ['./user-affairs.component.css']
})
export class UserAffairsComponent implements OnInit {

  selectedAffairId: number;
  affairList: IAffair[];

  constructor(private affairService: AffairService, private authService: AuthService, private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.loadAffairPage();
  }

  onPageChanged(): void {
    this.loadAffairPage();
  }

  delistFromAffair(): void{
    this.affairService.delistUserFromAffair(this.selectedAffairId, this.authService.getAuthenticatedUserId()).subscribe({
      next: response => {
        this.ngOnInit();
        this.notificationService.dispatch({message: "Wypisałeś się z wydarzenia", type: "success", dismissible: true});
      },
      error: err => console.log(err)
    })
  }

  loadAffairPage(): void{
    this.affairService.getUserAffairs(this.authService.getAuthenticatedUserId()).subscribe({
      next: responseData => {this.affairList = responseData;},
      error: err => console.log(err)
    });
  }

}
