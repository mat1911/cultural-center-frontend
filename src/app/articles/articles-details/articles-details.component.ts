import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/core/auth.service';
import { NotificationService } from 'src/app/core/notification.service';
import { IArticle } from '../shared/article';
import { ArticleService } from '../shared/article.service';

@Component({
  selector: 'app-articles-details',
  templateUrl: './articles-details.component.html',
  styleUrls: ['./articles-details.component.css']
})
export class ArticlesDetailsComponent implements OnInit {

  currentArticle: IArticle;

  constructor(public authService: AuthService, private articleService: ArticleService, private route: ActivatedRoute, private notificationService: NotificationService) {}

  ngOnInit(): void {
    let articleId = +this.route.snapshot.paramMap.get('id');
    
    this.articleService.getArticleById(articleId).subscribe({
      next: responseData => this.currentArticle = responseData,
      error: err => console.log(err)
    });
  }

  addNewArticleRate(rate: number): void{
    if (this.authService.isLoggedIn()){
      this.articleService.updateArticleRating(this.currentArticle.id, this.authService.getAuthenticatedUserId(), rate).subscribe({
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

}
