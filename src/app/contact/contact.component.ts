import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NotificationService } from '../core/notification.service';
import { UserService } from '../core/user.service';
import { IMessage } from './message';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  contactFormGroup: FormGroup;

  constructor(private formBuilder: FormBuilder, private modalService: NgbModal, private userService: UserService,
    private notificationService: NotificationService) {
    this.contactFormGroup = this.formBuilder.group({
      userEmail: new FormControl('', [Validators.email]),
      message: new FormControl('', [Validators.required]),
      subject: new FormControl('', [Validators.required])
    });
  }

  get contactForm() { return this.contactFormGroup.controls; }

  ngOnInit(): void {
  }

  onSubmit(): void {

    if (this.contactFormGroup.invalid) {
      this.contactFormGroup.markAllAsTouched();
      return;
    }

    const dataToSend: IMessage = {
      userEmail: this.contactFormGroup.get('userEmail').value,
      message: this.contactFormGroup.get('message').value,
      subject: this.contactFormGroup.get('subject').value
    }
    this.userService.sendUserMessage(dataToSend).subscribe(
      (response) => { 
        this.contactFormGroup.reset();
        this.notificationService.dispatch({ message: 'Twoja wiadomość została wysłana!', dismissible: true, type: 'success' });
      },
      (error) => console.log(error)
    );
  }

}
