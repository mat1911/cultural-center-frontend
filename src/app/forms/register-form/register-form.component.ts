import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup} from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/core/auth.service';
import { NotificationService } from 'src/app/core/notification.service';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent implements OnInit {
  registrationFormGroup: FormGroup;

  constructor(private formBuilder: FormBuilder, private router: Router, private modalService: NgbModal, private authService: AuthService,
    private notificationService: NotificationService) {
    this.registrationFormGroup = this.formBuilder.group({
      password: [],
      profile: []
    });
  }

  ngOnInit(): void {

  }

  onSubmit() : void{
    if(this.registrationFormGroup.invalid) {
      this.modalService.dismissAll();
      return;
    }

    this.authService.registerUser(Object.assign(this.registrationFormGroup.controls.password.value, this.registrationFormGroup.controls.profile.value))
      .subscribe({
        next: response => {
          this.modalService.dismissAll();
          this.router.navigate(['/login'])
          this.notificationService.dispatch({statusCode: 201, message: 'Utworzono nowe konto!', dismissible: true, type: 'success'})
        },
        error: err => {
          this.modalService.dismissAll();
          console.log(err)
        } 
      })
  }
  
}