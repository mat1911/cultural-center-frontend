import { Component, OnInit } from '@angular/core';
import { INews } from '../shared/news';
import { NewsService } from 'src/app/news/shared/news.service';

@Component({
  selector: 'app-admin-news-list',
  templateUrl: './admin-news-list.component.html',
  styleUrls: ['./admin-news-list.component.css']
})
export class AdminNewsListComponent implements OnInit {

  newsList: INews[];
  collectionSize: number;
  page: number = 1;
  pageSize: number = 10;

  constructor(private newsService: NewsService) { }

  ngOnInit(): void {
    this.loadNewsPage();
  }

  onPageChanged(): void {
    this.loadNewsPage();
  }

  private loadNewsPage(): void{
    this.newsService.getNews(this.page, this.pageSize).subscribe({
      next: responseData => {
        this.newsList = responseData.data;
        this.collectionSize = responseData.fullContentSize;
      },
      error: err => console.log(err)
    });
  }

}
