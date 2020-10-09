import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { NewsService } from '../shared/news.service';
import { INews } from '../shared/news';

@Component({
  selector: 'app-news-details',
  templateUrl: './news-details.component.html',
  styleUrls: ['./news-details.component.css']
})
export class NewsDetailsComponent implements OnInit {

  currentNews: INews;
  errorMessage: string;

  constructor(private route: ActivatedRoute, private newsService: NewsService) {}

  ngOnInit(): void {
    let newsId = +this.route.snapshot.paramMap.get('id');

    this.newsService.getNewsById(newsId).subscribe({
      next: responseData => this.currentNews = responseData,
      error: err => this.errorMessage = err
    });
  }

}
