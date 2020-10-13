import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/auth.service';
import { IArticle } from '../shared/article';
import { ArticleService } from '../shared/article.service';

@Component({
  selector: 'app-admin-not-accepted-articles-list',
  templateUrl: './admin-not-accepted-articles-list.component.html',
  styleUrls: ['./admin-not-accepted-articles-list.component.css']
})
export class AdminNotAcceptedArticlesListComponent implements OnInit {

  selectedArticleId: number;
  notAcceptedArticles: IArticle[];

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
    this.articleService.getNotAcceptedArticles(this.page, this.pageSize).subscribe({
      next: responseData => {
        this.notAcceptedArticles = responseData.data;
        this.collectionSize = responseData.fullContentSize;
      },
      error: err => console.log(err)
    });
  }

  acceptArticle(): void{
    this.articleService.changeArticleAcceptance(this.selectedArticleId, true).subscribe({
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
