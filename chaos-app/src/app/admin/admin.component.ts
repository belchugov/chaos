import { Component, OnInit } from '@angular/core';
import {NewsService} from '../news.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  constructor(private newsService: NewsService) { }

  ngOnInit() {
  }

  add(articleTitle: string, articleBody: string) {
    const article = {title: articleTitle, body: articleBody};
    this.newsService.postArticle(article)
      .subscribe();
  }
}
