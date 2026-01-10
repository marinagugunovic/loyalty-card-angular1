import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TestApiService {
  constructor(private http: HttpClient) {}

  ping(): Observable<any> {
    // koristimo javni endpoint koji uvek radi
    return this.http.get('https://jsonplaceholder.typicode.com/todos/1');
  }
}
