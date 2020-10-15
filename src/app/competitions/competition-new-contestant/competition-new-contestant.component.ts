import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth.service';
import { NotificationService } from 'src/app/core/notification.service';
import { ValidatorsService } from 'src/app/core/validators.service';
import { CompetitionsService } from '../shared/competitions.service';

@Component({
  selector: 'app-competition-new-contestant',
  templateUrl: './competition-new-contestant.component.html',
  styleUrls: ['./competition-new-contestant.component.css']
})
export class CompetitionNewContestantComponent implements OnInit {

  competitionId: number;
  competitionFormGroup: FormGroup;

  constructor(private route: ActivatedRoute, private competitionService: CompetitionsService, private formBuilder: FormBuilder, private router: Router,
    private validatorsService: ValidatorsService, private authService: AuthService, private notificationService: NotificationService) {
    this.competitionFormGroup = this.formBuilder.group({
      userComment: new FormControl('', [Validators.required]),
      userFile: new FormControl(null, [this.validatorsService.fileValidator(['docx', 'pdf'], 1000000)])
    });
  }

  ngOnInit(): void {
    this.competitionId = +this.route.snapshot.paramMap.get('id');
  }

  get competitionForm() { return this.competitionFormGroup.controls; }

  onFileChange(event): void {
    const file = (event.target as HTMLInputElement).files[0];
    const reader = new FileReader();
    reader.onload = () => this.competitionFormGroup.get('userFile').setValue(file);
    reader.readAsDataURL(file);
  }

  onSubmit(): void{
    const dataToSend: FormData = new FormData();
    if (this.competitionFormGroup.invalid) {
      this.notificationService.dispatch({message: 'Uzupełnij poprawnie pola!', dismissible: true, type: 'danger'})
      this.competitionFormGroup.markAllAsTouched();
      return;
    }
    
    if (this.competitionFormGroup.get('userFile').value != null) { dataToSend.append('userFile', this.competitionFormGroup.get('userFile').value); }
    dataToSend.append('userComment', this.competitionFormGroup.get('userComment').value);

    this.competitionService.createContestant(dataToSend, this.competitionId, this.authService.getAuthenticatedUserId()).subscribe(
      (response) => {
        this.router.navigate(['/competitions']);
        this.notificationService.dispatch({message: 'Twoja praca będzie widoczna po zaakceptowaniu przez administratora!', dismissible: true, type: 'success'})
      },
      (error) => console.log(error));
  }
}
