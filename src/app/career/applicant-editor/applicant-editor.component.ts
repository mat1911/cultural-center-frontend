import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/core/auth.service';
import { NotificationService } from 'src/app/core/notification.service';
import { ValidatorsService } from 'src/app/core/validators.service';
import { CareerService } from '../shared/career.service';

@Component({
  selector: 'app-applicant-editor',
  templateUrl: './applicant-editor.component.html',
  styleUrls: ['./applicant-editor.component.css']
})
export class ApplicantEditorComponent implements OnInit {

  jobOfferId: number;
  applicationFormGroup: FormGroup;

  constructor(private route: ActivatedRoute, private careerService: CareerService, private formBuilder: FormBuilder, private router: Router,
    private modalService: NgbModal, private validatorsService: ValidatorsService, private authService: AuthService, private notificationService: NotificationService) {
    this.applicationFormGroup = this.formBuilder.group({
      userComment: new FormControl('', []),
      userFile: new FormControl(null, [this.validatorsService.fileValidator(['docx', 'pdf'], 1000000), Validators.required])
    });
  }

  ngOnInit(): void {
    this.jobOfferId = +this.route.snapshot.paramMap.get('id');
  }

  get applicationForm() { return this.applicationFormGroup.controls; }

  onFileChange(event): void {
    const file = (event.target as HTMLInputElement).files[0];
    const reader = new FileReader();
    reader.onload = () => this.applicationFormGroup.get('userFile').setValue(file);
    reader.readAsDataURL(file);
  }

  onSubmit(): void{
    const dataToSend: FormData = new FormData();
    if (this.applicationFormGroup.invalid) {
      this.modalService.dismissAll();
      this.applicationFormGroup.markAllAsTouched();
      return;
    }

    dataToSend.append('userComment', this.applicationFormGroup.get('userComment').value);
    dataToSend.append('userFile', this.applicationFormGroup.get('userFile').value);

    this.careerService.createApplicant(dataToSend, this.jobOfferId, this.authService.getAuthenticatedUserId()).subscribe(
      (response) => {
        this.modalService.dismissAll();
        this.router.navigate(['/careers']);
        this.notificationService.dispatch({message: 'Aplikacja przebiegła pomyślnie!', dismissible: true, type: 'success'})
      },
      (error) => { 
        console.log(error)
        this.modalService.dismissAll(); }
    );
  }
}
