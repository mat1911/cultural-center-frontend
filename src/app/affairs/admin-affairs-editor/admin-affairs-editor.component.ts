import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/core/auth.service';
import { ValidatorsService } from 'src/app/core/validators.service';
import { IEnrolledUser } from 'src/app/shared/enrolled-user';
import { IAffair } from '../shared/affair';
import { AffairService } from '../shared/affair.service';

@Component({
  selector: 'app-admin-affairs-editor',
  templateUrl: './admin-affairs-editor.component.html',
  styleUrls: ['./admin-affairs-editor.component.css']
})
export class AdminAffairsEditorComponent implements OnInit {

  affairId: number;
  affairFormGroup: FormGroup;
  currentAffair: IAffair;
  selectedUserId: number;
  enrolledUsers$: Observable<IEnrolledUser[]>;

  modalTitle: string;
  modalSubtitle: string;
  modalDescription: string;

  showUsersTable: boolean = false;

  constructor(private route: ActivatedRoute, private affairService: AffairService, private formBuilder: FormBuilder, private router: Router,
    private modalService: NgbModal, private validatorsService: ValidatorsService, private authService: AuthService) {
    this.affairFormGroup = this.formBuilder.group({
      title: new FormControl('', [Validators.minLength(3)]),
      shortDescription: new FormControl('', [Validators.minLength(3)]),
      availableSeats: new FormControl('', [Validators.required, Validators.min(1)]),
      picture: new FormControl(null, [this.validatorsService.fileValidator(['png', 'jpg', 'jpeg'], 90000)])
    });
  }

  ngOnInit(): void {
    if (Number.isNaN(+this.route.snapshot.paramMap.get('id'))) { return; }

    this.affairId = +this.route.snapshot.paramMap.get('id');
    this.loadAffairData();
    this.loadEnrolledForAffairUsers();
  }

  get affairForm() { return this.affairFormGroup.controls; }

  loadAffairData(): void{
    this.affairService.getAffairToUpdateById(this.affairId).subscribe({
      next: responseData => {
        this.currentAffair = responseData;
        this.affairFormGroup.patchValue({
          title: this.currentAffair.title,
          shortDescription: this.currentAffair.shortDescription,
          availableSeats: this.currentAffair.availableSeats
        });
      },
      error: err => console.log(err)
    });
  }

  loadEnrolledForAffairUsers(): void{
    this.enrolledUsers$ = this.affairService.getEnrolledForAffairUsers(this.affairId);
    // this.affairService.getEnrolledForAffairUsers(this.affairId).subscribe({
    //   next: responseData => this.enrolledUsers = responseData,
    //   error: err => console.log(err)
    // });
  }

  onSubmit(): void {
    const dataToSend: FormData = new FormData();
    if (this.affairFormGroup.invalid) {
      this.modalService.dismissAll();
      this.affairFormGroup.markAllAsTouched();
      return;
    }
    
    if (this.affairFormGroup.get('picture').value != null) { dataToSend.append('picture', this.affairFormGroup.get('picture').value); }
    dataToSend.append('title', this.affairFormGroup.get('title').value);
    dataToSend.append('shortDescription', this.affairFormGroup.get('shortDescription').value);
    dataToSend.append('availableSeats', this.affairFormGroup.get('availableSeats').value);

    this.affairService.createOrUpdateNewsById(dataToSend, this.affairId, this.authService.getAuthenticatedUserId()).subscribe(
      (response) => {
        this.modalService.dismissAll();
        this.router.navigate(['/admin/affairs']);
      },
      (error) => { 
        console.log(error)
        this.modalService.dismissAll(); }
    );
  }

  onFileChange(event): void {
    const file = (event.target as HTMLInputElement).files[0];
    const reader = new FileReader();
    reader.onload = () => this.affairFormGroup.get('picture').setValue(file);
    reader.readAsDataURL(file);
  }

  deleteAffair(): void{
    this.affairService.deleteAffairById(this.affairId).subscribe(
      (response) => this.router.navigate(['/admin/affairs'])
    );
  }

  delistUser(): void{
    this.affairService.delistUserFromAffair(this.affairId, this.selectedUserId).subscribe(
      (response) => this.ngOnInit()
    );
  }

  enrollUsers(usersToEnroll: number[]): void{
    if(usersToEnroll != null || usersToEnroll.length > 0){
      this.affairService.enrollUsers(this.affairId, usersToEnroll).subscribe(
        (response) => this.ngOnInit());
    }
    this.showUsersTable = false;
  }
}
