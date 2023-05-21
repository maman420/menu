import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import Category from '../models/category';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<Category[]>('https://localhost:3000/test/categories');
  } 
}
