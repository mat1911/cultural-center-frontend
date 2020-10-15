import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/core/auth.service';
import { NotificationService } from 'src/app/core/notification.service';
import { ValidatorsService } from 'src/app/core/validators.service';
import { IArticle } from '../shared/article';
import { ArticleService } from '../shared/article.service';

@Component({
  selector: 'app-articles-editor',
  templateUrl: './articles-editor.component.html',
  styleUrls: ['./articles-editor.component.css']
})
export class ArticlesEditorComponent implements OnInit {

  articleId: number;
  articleFormGroup: FormGroup;
  currentArticle: IArticle;

  constructor(private route: ActivatedRoute, private articleService: ArticleService, private formBuilder: FormBuilder, private router: Router,
    private modalService: NgbModal, private validatorsService: ValidatorsService, private authService: AuthService, private notificationService: NotificationService) {
    this.articleFormGroup = this.formBuilder.group({
      title: new FormControl('', [Validators.minLength(3)]),
      content: new FormControl('', [Validators.required]),
      picture: new FormControl(null, [this.validatorsService.fileValidator(['png', 'jpg', 'jpeg'], 90000)])
    });
  }

  ngOnInit(): void {
    if (this.route.snapshot.paramMap.get('id') == null) { return; }
    this.articleId = +this.route.snapshot.paramMap.get('id');
    this.loadArticleData();
  }

  get articleForm() { return this.articleFormGroup.controls; }

  loadArticleData(): void{
    this.articleService.getArticleById(this.articleId).subscribe({
      next: responseData => {
        this.currentArticle = responseData;
        this.articleFormGroup.patchValue({
          title: this.currentArticle.title,
          content: this.currentArticle.content,
        });
      },
      error: err => console.log(err)
    });
  }

  onFileChange(event): void {
    const file = (event.target as HTMLInputElement).files[0];
    const reader = new FileReader();
    reader.onload = () => this.articleFormGroup.get('picture').setValue(file);
    reader.readAsDataURL(file);
  }

  onSubmit(): void{
    const dataToSend: FormData = new FormData();
    if (this.articleFormGroup.invalid) {
      this.modalService.dismissAll();
      this.articleFormGroup.markAllAsTouched();
      return;
    }
    
    if (this.articleFormGroup.get('picture').value != null) { dataToSend.append('picture', this.articleFormGroup.get('picture').value); }
    dataToSend.append('title', this.articleFormGroup.get('title').value);
    dataToSend.append('content', this.articleFormGroup.get('content').value);

    this.articleService.createOrUpdateArticleById(dataToSend, this.articleId, this.authService.getAuthenticatedUserId()).subscribe(
      (response) => {
        this.modalService.dismissAll();
        this.router.navigate(['/articles']);
        this.notificationService.dispatch({message: 'Twój artykuł będzie widoczny po zaakceptowaniu przez administratora!', dismissible: true, type: 'success'})
      },
      (error) => { 
        console.log(error)
        this.modalService.dismissAll(); }
    );
  }

  deleteArticle(): void{
      this.articleService.deleteArticle(this.articleId, this.authService.getAuthenticatedUserId()).subscribe(
        (response) => {
          this.router.navigate(['/articles'])
          this.notificationService.dispatch({message: 'Usunięto artykuł!', dismissible: true, type: 'success'})
      })
  }
}
