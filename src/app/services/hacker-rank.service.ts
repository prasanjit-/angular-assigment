import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class HackerRankService {

  hackerUrl = "https://cors-anywhere.herokuapp.com/https://hn.algolia.com/api/";
  hhtpOptions ={
    headers :new HttpHeaders(
      {'Content-Type': 'application-json',
    'X-Requested-With': 'XMLHttpRequest'
    }
      )
  };
  constructor(
    private http: HttpClient ) { }

    getStories(): Observable<any> {
           //      return this.http.get<any>(this.hackerUrl+'v1/search_by_date?tags=story&page='+page+'&hitsPerPage='+pageSize,this.hhtpOptions)

     return this.http.get<any>(this.hackerUrl+'v1/search_by_date?tags=story',this.hhtpOptions)
    }
}
