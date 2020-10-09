import { Component, OnInit } from '@angular/core';
import { INews } from '../shared/news';
import { NewsService } from '../shared/news.service';

@Component({
  selector: 'app-news-list',
  templateUrl: './news-list.component.html',
  styleUrls: ['./news-list.component.css']
})
export class NewsListComponent implements OnInit {

  maxCarouselSlides: number = 4;
  pageSize: number = 5;
  page: number = 1;
  collectionSize: number = 0;

  newsListForCarousel: INews[] = []
  newsList: INews[] = [];
  errorMessage: string;

  constructor(private newsService: NewsService) { }

  ngOnInit(): void {
    this.loadNewsPage();
  }

  onPageChanged(): void {
    this.loadNewsPage();
    console.log(this.page);
  }

  private loadNewsPage(): void{
    this.newsService.getNews(this.page, this.pageSize).subscribe({
      next: responseData => {
        this.newsList = responseData.data;
        this.collectionSize = responseData.fullContentSize;
        this.newsListForCarousel = this.newsListForCarousel.length == 0 ? this.newsList.slice(0, this.maxCarouselSlides) : this.newsListForCarousel;

      },
      error: err => console.log(err)
    });
  }
}