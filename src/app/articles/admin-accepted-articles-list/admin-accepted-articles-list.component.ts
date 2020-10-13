import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/auth.service';
import { IArticle } from '../shared/article';
import { ArticleService } from '../shared/article.service';

@Component({
  selector: 'app-admin-accepted-articles-list',
  templateUrl: './admin-accepted-articles-list.component.html',
  styleUrls: ['./admin-accepted-articles-list.component.css']
})
export class AdminAcceptedArticlesListComponent implements OnInit {

  selectedArticleId: number;
  acceptedArticles: IArticle[];

  collectionSize: number;
  page: number = 1;
  pageSize: number = 10;

  constructor(private articleService: ArticleService, private authService: AuthService) { }

  ngOnInit(): void {
    this.loadAcceptedArticles();
  }

  onPageChanged(): void{
    this.loadAcceptedArticles();
  }

  loadAcceptedArticles(): void{
    this.articleService.getArticles(this.page, this.pageSize).subscribe({
      next: responseData => {
        this.acceptedArticles = responseData.data;
        this.collectionSize = responseData.fullContentSize;
      },
      error: err => console.log(err)
    });
  }

  cancelAcceptance(): void{
    this.articleService.changeArticleAcceptance(this.selectedArticleId, false).subscribe({
      next: responseData => this.ngOnInit(),
      error: err => console.log(err)
    });;
  }

  removeArticle(): void{
    this.articleService.deleteArticle(this.selectedArticleId, this.authService.getAuthenticatedUserId()).subscribe(
      (response) => this.ngOnInit()
    );
  }
}
