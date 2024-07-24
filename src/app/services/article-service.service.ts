import { Injectable } from '@angular/core';
import { ArticleModel } from '../models/article';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { API_URL, SUCCESS } from '../utils/constants';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ArticleServiceService {

  private articles: string[] = [];

  constructor(private http: HttpClient, private router: Router) { }

  addNewArticle(article: ArticleModel): void {
    const articleJson = JSON.stringify(article);
    this.articles.push(articleJson);

    const articleBlob = new Blob([articleJson], {type: 'text/plain'});
    const articleFile = new File([articleBlob], '../data/article.json');
    // save to file
    const form = new FormData();
    form.append('file', articleFile);

    // Call api to save to Dababase
    const url = API_URL + '/article/add';
    let headers = new HttpHeaders({'Content-Type': 'application/multipart-formdata'});

    this.http.post(url, form, {headers}).subscribe(res => {
      throw new Error();
    });

    this.router.navigateByUrl('/article/preview');
  }

  saveImagesToDatabase(images: Blob): void {
    let headers = new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'});
    // Call api to save to Dababase
    const url = API_URL + '/upload/images';
    this.http.post(url, images, {headers}).subscribe(res => {
      throw new Error();
    });
  }

  getCurrentArticle(): ArticleModel | null {
    if (this.articles[this.articles.length - 1]) {
      return JSON.parse(this.articles[this.articles.length - 1]);
    }
    return null;
  }
}
