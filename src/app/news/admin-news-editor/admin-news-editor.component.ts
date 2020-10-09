import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NewsService } from 'src/app/news/shared/news.service';
import { FormBuilder, FormGroup, FormControl, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { INews } from '../shared/news';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ValidatorsService } from 'src/app/core/validators.service';

@Component({
  selector: 'app-admin-news-editor',
  templateUrl: './admin-news-editor.component.html',
  styleUrls: ['./admin-news-editor.component.css']
})
export class AdminNewsEditorComponent implements OnInit {

  newsId: number;
  newsFormGroup: FormGroup;
  currentNews: INews;
  errorMessage: string;
  submitted: boolean = false;

  modalTitle: string;
  modalSubtitle: string;
  modalDescription: string;

  constructor(private route: ActivatedRoute, private newsService: NewsService, private formBuilder: FormBuilder, private router: Router,
    private modalService: NgbModal, private validatorService: ValidatorsService) {
    this.newsFormGroup = this.formBuilder.group({
      title: new FormControl('', [Validators.minLength(3)]),
      shortDescription: new FormControl('', [Validators.minLength(3)]),
      description: new FormControl('', [Validators.minLength(3)]),
      picture: new FormControl(null, [this.validatorService.fileValidator(['png', 'jpg', 'jpeg'], 90000)])
    });
  }

  ngOnInit(): void {
    if (Number.isNaN(+this.route.snapshot.paramMap.get('id'))) { return; }

    this.newsId = +this.route.snapshot.paramMap.get('id');
    this.newsService.getNewsToUpdateById(this.newsId).subscribe({
      next: responseData => {
        this.currentNews = responseData;
        this.newsFormGroup.patchValue({
          title: this.currentNews.title,
          shortDescription: this.currentNews.shortDescription,
          description: this.currentNews.description
        });
      },
      error: err => console.log(err)
    });
  }

  get newsForm() { return this.newsFormGroup.controls; }

  onSubmit(): void {
    this.submitted = true;
    const dataToSend: FormData = new FormData();
    if (this.newsFormGroup.invalid) {
      this.modalService.dismissAll();
      return;
    }
    
    if (this.newsFormGroup.get('picture').value != null) { dataToSend.append('picture', this.newsFormGroup.get('picture').value); }
    dataToSend.append('title', this.newsFormGroup.get('title').value);
    dataToSend.append('shortDescription', this.newsFormGroup.get('shortDescription').value);
    dataToSend.append('description', this.newsFormGroup.get('description').value);

    this.newsService.createOrUpdateNewsById(dataToSend, this.newsId).subscribe(
      (response) => {
        this.modalService.dismissAll();
        this.router.navigate(['/admin/news']);
      },
      (error) => { 
        console.log(error)
        this.modalService.dismissAll(); }
    );
  }

  onFileChange(event): void {
    const file = (event.target as HTMLInputElement).files[0];
    const reader = new FileReader();
    reader.onload = () => this.newsFormGroup.get('picture').setValue(file);
    reader.readAsDataURL(file);
  }

  deleteNews(): void {
    this.newsService.deleteNewsById(this.newsId).subscribe(
      (response) => this.router.navigate(['/admin/news'])
    );
  }
}
