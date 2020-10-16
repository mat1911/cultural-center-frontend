import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CareerService } from '../shared/career.service';
import { IJobOffer } from '../shared/job-offer';

@Component({
  selector: 'app-admin-job-offer-editor',
  templateUrl: './admin-job-offer-editor.component.html',
  styleUrls: ['./admin-job-offer-editor.component.css']
})
export class AdminJobOfferEditorComponent implements OnInit {

  jobOfferId: number;
  jobOfferFormGroup: FormGroup;
  currentJobOffer: IJobOffer;

  constructor(private route: ActivatedRoute, private careerService: CareerService, private formBuilder: FormBuilder, private router: Router,
    private modalService: NgbModal) {
    this.jobOfferFormGroup = this.formBuilder.group({
      name: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      workingHours: new FormControl('', [Validators.required])
    });
  }

  ngOnInit(): void {
    if (Number.isNaN(+this.route.snapshot.paramMap.get('id'))) { return; }
    this.jobOfferId = +this.route.snapshot.paramMap.get('id');
    this.loadJobOfferData();
  }

  get jobOfferForm() { return this.jobOfferFormGroup.controls; }

  loadJobOfferData(): void{
    this.careerService.getJobOfferById(this.jobOfferId).subscribe({
      next: responseData => {
        this.currentJobOffer = responseData;
        this.jobOfferFormGroup.patchValue({
          name: this.currentJobOffer.name,
          description: this.currentJobOffer.description,
          workingHours: this.currentJobOffer.workingHours
        });
      },
      error: err => console.log(err)
    });
  }

  onSubmit(): void{
    const dataToSend: FormData = new FormData();
    if (this.jobOfferFormGroup.invalid) {
      this.modalService.dismissAll();
      this.jobOfferFormGroup.markAllAsTouched();
      return;
    }
    
    dataToSend.append('name', this.jobOfferFormGroup.get('name').value);
    dataToSend.append('description', this.jobOfferFormGroup.get('description').value);
    dataToSend.append('workingHours', this.jobOfferFormGroup.get('workingHours').value);

    this.careerService.createOrUpdateJobOfferById(dataToSend, this.jobOfferId).subscribe(
      (response) => {
        this.modalService.dismissAll();
        this.router.navigate(['/admin/careers']);
      },
      (error) => { 
        console.log(error)
        this.modalService.dismissAll(); }
    );
  }

  deleteJobOffer(): void{
      this.careerService.deleteJobOffer(this.jobOfferId).subscribe(
        (response) => {
          this.router.navigate(['/admin/careers'])
      })
  }
}
