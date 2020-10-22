import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from 'src/app/core/notification.service';
import { UserService } from 'src/app/core/user.service';
import { IUser } from 'src/app/shared/User';

@Component({
  selector: 'app-remind-password',
  templateUrl: './remind-password.component.html',
  styleUrls: ['./remind-password.component.css']
})
export class RemindPasswordComponent implements OnInit {

  currentUser: IUser;
  token: string;

  userPasswordGroup: FormGroup;

  constructor(private formBuilder: FormBuilder, private router: Router, private activatedRoute: ActivatedRoute,
    private userService: UserService,  private notificationService: NotificationService) {
      this.userPasswordGroup = this.formBuilder.group({
        password: [],
      });
  }

  ngOnInit(): void {
    this.token = this.activatedRoute.snapshot.queryParamMap.get('token');
  }

  changePassword(): void{
    if(this.userPasswordGroup.controls.password.invalid) {
      return;
    }

    this.userService.setNewUserPassword(this.userPasswordGroup.controls.password.value, this.token).subscribe({
      next: response => {
        this.notificationService.dispatch({message: 'Hasło zostało zmienione!', type: 'success', dismissible: true});
        this.router.navigate(['/login']);
      },
      error: err => console.log(err)
    })
  }
}
