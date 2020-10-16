import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ValidatorsService } from 'src/app/core/validators.service';
import { ICompetition } from '../shared/competition';
import { CompetitionsService } from '../shared/competitions.service';

@Component({
  selector: 'app-admin-competition-editor',
  templateUrl: './admin-competition-editor.component.html',
  styleUrls: ['./admin-competition-editor.component.css']
})
export class AdminCompetitionEditorComponent implements OnInit {

  competitionId: number;
  competitionFormGroup: FormGroup;
  currentCompetition: ICompetition;

  constructor(private route: ActivatedRoute, private competitionService: CompetitionsService, private formBuilder: FormBuilder, private router: Router,
    private modalService: NgbModal, private validatorsService: ValidatorsService) {
    this.competitionFormGroup = this.formBuilder.group({
      title: new FormControl('', [Validators.minLength(3)]),
      description: new FormControl('', [Validators.minLength(3)]),
      picture: new FormControl(null, [this.validatorsService.fileValidator(['png', 'jpg', 'jpeg'], 90000)])
    });
  }

  ngOnInit(): void {
    if (Number.isNaN(+this.route.snapshot.paramMap.get('id'))) { return; }

    this.competitionId = +this.route.snapshot.paramMap.get('id');
    this.loadCompetitionData();
  }

  get competitionForm() { return this.competitionFormGroup.controls; }

  loadCompetitionData(): void{
    this.competitionService.getCompetitionById(this.competitionId).subscribe({
      next: responseData => {
        this.currentCompetition = responseData;
        this.competitionFormGroup.patchValue({
          title: this.currentCompetition.title,
          description: this.currentCompetition.description});
      },
      error: err => console.log(err)
    });
  }

  onSubmit(): void{
    const dataToSend: FormData = new FormData();
    if (this.competitionFormGroup.invalid) {
      this.modalService.dismissAll();
      this.competitionFormGroup.markAllAsTouched();
      return;
    }
    
    if (this.competitionFormGroup.get('picture').value != null) { dataToSend.append('picture', this.competitionFormGroup.get('picture').value); }
    dataToSend.append('title', this.competitionFormGroup.get('title').value);
    dataToSend.append('description', this.competitionFormGroup.get('description').value);

    this.competitionService.createOrUpdateCompetitionById(dataToSend, this.competitionId).subscribe(
      (response) => {
        this.modalService.dismissAll();
        this.router.navigate(['/admin/competitions']);
      },
      (error) => { 
        console.log(error)
        this.modalService.dismissAll(); }
    );
  }

  onFileChange(event): void {
    const file = (event.target as HTMLInputElement).files[0];
    const reader = new FileReader();
    reader.onload = () => this.competitionFormGroup.get('picture').setValue(file);
    reader.readAsDataURL(file);
  }

  deleteCompetition(): void{
    this.competitionService.deleteCompetition(this.competitionId).subscribe(
      (response) => this.router.navigate(['/admin/competitions'])
    )
  }
}
