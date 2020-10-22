import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/core/auth.service';
import { NotificationService } from 'src/app/core/notification.service';
import { IUser } from 'src/app/shared/User';
import { UserService } from 'src/app/core/user.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { createHostListener } from '@angular/compiler/src/core';

@Component({
  selector: 'app-user-options',
  templateUrl: './user-options.component.html',
  styleUrls: ['./user-options.component.css']
})
export class UserOptionsComponent implements OnInit{

  currentUser: IUser;

  userProfileGroup: FormGroup;

  constructor(private formBuilder: FormBuilder, private router: Router, private modalService: NgbModal, private userService: UserService, private authService: AuthService,
    private notificationService: NotificationService) {
      this.userProfileGroup = this.formBuilder.group({
        password: [],
        profile: []
      });
  }

  ngOnInit(): void {
    this.loadUserProfileData();
  }

  loadUserProfileData(): void{
    this.userService.getUserById(this.authService.getAuthenticatedUserId()).subscribe({
      next: response => {
        this.currentUser = response;
        this.userProfileGroup.controls.profile.setValue({
          'username': this.currentUser.username,
          'name': this.currentUser.name,
          'surname': this.currentUser.surname,
          'age': this.currentUser.age,
          'email': this.currentUser.email,
          'phoneNumber': this.currentUser.phoneNumber
        })
      },
      error: err => console.log(err)
    })
  }

  updateUserProfile(): void{
    if(this.userProfileGroup.controls.profile.invalid) {
      this.modalService.dismissAll();
      return;
    }

    this.userService.updateUserProfile(this.userProfileGroup.controls.profile.value, this.authService.getAuthenticatedUserId()).subscribe({
      next: response => {
        this.notificationService.dispatch({message: "Dane do konta zostały zaktualizowane!", type: 'success', dismissible: true})
        this.ngOnInit();
      },
      error: err => console.log(err)
    })
  }


  changePassword(): void{
    if(this.userProfileGroup.controls.password.invalid) {
      this.modalService.dismissAll();
      return;
    }

    console.log(this.userProfileGroup.controls.profile.value);

    this.userService.changeUserPassword(this.userProfileGroup.controls.password.value, this.authService.getAuthenticatedUserId()).subscribe({
      next: response => {
        this.notificationService.dispatch({message: "Hasło zostało zmienione!", type: 'success', dismissible: true})
        this.ngOnInit();
      },
      error: err => console.log(err)
    })
  }

}
