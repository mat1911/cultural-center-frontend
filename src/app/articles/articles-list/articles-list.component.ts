import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth.service';
import { NotificationService } from 'src/app/core/notification.service';
import { IArticle } from '../shared/article';
import { ArticleService } from '../shared/article.service';

@Component({
  selector: 'app-articles-list',
  templateUrl: './articles-list.component.html',
  styleUrls: ['./articles-list.component.css']
})
export class ArticlesListComponent implements OnInit {

  articleList: IArticle[] = [];

  collectionSize: number;
  page: number = 1;
  pageSize: number = 10;
  maxCarouselSlides: number = 4;

  constructor(private articleService: ArticleService, private notificationService: NotificationService, public authService: AuthService,
    private router: Router) { }

  ngOnInit(): void {
    this.loadArticlesPage();
  }

  onPageChanged(): void {
    this.loadArticlesPage();
  }

  addNewArticleRate(rate: number, articleId: number): void{
    if (this.authService.isLoggedIn()){
      this.articleService.updateArticleRating(articleId, this.authService.getAuthenticatedUserId(), rate).subscribe({
        next: responseData => {
          window.scroll(0,0);
          this.notificationService.dispatch({message: 'Dziękujemy za oddanie głosu! Ocena zostanie wkrótce zmodyfikowana.', dismissible: true, type: 'success'})},
        error: err => console.log(err)
      })
    }else{
      this.notificationService.dispatch({message: 'Głosować mogą tylko zalogowani użytkownicy!', dismissible: true, type: 'warning'})
      window.scroll(0,0);
    }
  }

  loadArticlesPage(filterKeyword: string = ''): void{
    this.articleService.getArticles(this.page, this.pageSize, filterKeyword).subscribe({
      next: responseData => {
        this.articleList = responseData.data;
        this.collectionSize = responseData.fullContentSize;
      },
      error: err => console.log(err)
    });
  }

  showArticleEditor(): void{
    if (this.authService.isLoggedIn()){
      this.router.navigate(['articles/new']);
    }else{
      this.notificationService.dispatch({message: 'Artykuły mogą pisać tylko zalogowani użytkownicy!', dismissible: true, type: 'warning'})
      window.scroll(0,0);
    }
  }

}
