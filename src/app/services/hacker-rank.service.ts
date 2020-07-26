import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class HackerRankService {

  hackerUrl = "http://hn.algolia.com/api/";
  hhtpOptions ={
    headers :new HttpHeaders(
      {'Content-Type': 'application-json'

    }
      )
  };
  constructor(
    private http: HttpClient ) { }

    getStories(page): Observable<any> {
     let pageNo:number=0;
     if(page!=0){
       pageNo =page-1;
     }  
     return this.http.get<any>(this.hackerUrl+'v1/search?tags=front_page&page='+pageNo,this.hhtpOptions)
    }
}