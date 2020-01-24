import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  newsUrl = 'http://localhost:3000/post/';
  // testArticle = {title: 'Hello World', body: 'Hello world article description'};

  postArticle(article: object) {
    return this.http.post(this.newsUrl, article);
  }

  constructor(private http: HttpClient) { }
}
