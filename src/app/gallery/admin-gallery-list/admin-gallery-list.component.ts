import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ValidatorsService } from 'src/app/core/validators.service';
import { IGallery } from '../shared/gallery';
import { GalleryService } from '../shared/gallery.service';

@Component({
  selector: 'app-admin-gallery-list',
  templateUrl: './admin-gallery-list.component.html',
  styleUrls: ['./admin-gallery-list.component.css']
})
export class AdminGalleryListComponent implements OnInit {

  galleryFormGroup: FormGroup;
  selectedPictureId: number;

  galleryList: IGallery[];
  collectionSize: number;
  page: number = 1;
  pageSize: number = 10;

  constructor(private galleryService: GalleryService, private formBuilder: FormBuilder, private validatorsService: ValidatorsService, 
    private modalService: NgbModal, private router: Router) { 
    this.galleryFormGroup = this.formBuilder.group({
      picture: new FormControl(null, [this.validatorsService.fileValidator(['png', 'jpg', 'jpeg'], 90000), Validators.required])
    });
  }

  ngOnInit(): void {
    this.loadGalleryList();
  }

  loadGalleryList(): void{
    this.galleryService.getGallery(this.page, this.pageSize).subscribe({
      next: responseData => {
        this.galleryList = responseData.data;
        this.collectionSize = responseData.fullContentSize;
      },
      error: err => console.log(err)
    });
  }

  
  get galleryForm() { return this.galleryFormGroup.controls; }

  onFileChange(event): void {
    const file = (event.target as HTMLInputElement).files[0];
    const reader = new FileReader();
    reader.onload = () => this.galleryFormGroup.get('picture').setValue(file);
    reader.readAsDataURL(file);
  }

  onSubmit(): void {
    if (this.galleryFormGroup.invalid) {
      this.modalService.dismissAll();
      this.galleryFormGroup.markAllAsTouched();
      return;
    }

    console.log("TAK");

    const dataToSend: FormData = new FormData();
    dataToSend.append('picture', this.galleryFormGroup.get('picture').value);

    this.galleryService.addPicture(dataToSend).subscribe(
      (response) => {
        this.modalService.dismissAll()
        this.ngOnInit()
      },
      (error) => { 
        console.log(error)
        this.modalService.dismissAll(); }
    );
  }

  deletePicture(): void{
    this.galleryService.deletePicture(this.selectedPictureId).subscribe(
      (response) => this.ngOnInit(),
      (error) => console.log(error)
    );
  }

}
