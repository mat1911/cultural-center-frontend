import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NotificationService } from 'src/app/core/notification.service';
import { UserService } from 'src/app/core/user.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  forgotFormGroup: FormGroup;

  constructor(private formBuilder: FormBuilder, private userService: UserService, private notificationService: NotificationService) {
    this.forgotFormGroup = formBuilder.group({
      email: new FormControl("", [Validators.email])
    });
  }

  ngOnInit(): void {
  }


  get forgotForm() {
    return this.forgotFormGroup.controls;
  }

  onSubmit(): void {
    if (this.forgotFormGroup.invalid) {
      this.forgotFormGroup.markAllAsTouched();
      return;
    }

    this.userService.remindPassword(this.forgotForm.email.value).subscribe({
      next: response => {
        this.notificationService.dispatch({
          message: 'Jeśli wskazany email znajduje się w naszej bazie - wkrótce otrzymasz wiadomość z linkiem do resetu hasła',
          type: 'success',
          dismissible: true 
        })},

      error: err => console.log(err)
    })

  }
}
