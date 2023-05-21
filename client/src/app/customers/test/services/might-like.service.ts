import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MightLikeService {

  constructor(private http: HttpClient) { }

  get(product: string): Observable<string> {
    const url = `https://localhost:3000/test/might-like/${product}`;
    return this.http.get<string>(url);
  }
}
