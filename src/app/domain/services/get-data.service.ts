import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CategoryModel } from '../models/category.model';
import { DocumentModel } from '../models/document.model';

@Injectable({
  providedIn: 'root'
})
export class GetDataService {

  categoriesUrl = 'http://localhost:3000/categories'
  documentsUrl = 'http://localhost:3000/documents'

  constructor(private http: HttpClient) {}

  getCategories() {
    return this.http.get<CategoryModel[]>(this.categoriesUrl)
  }

  getDocuments() {
    return this.http.get<DocumentModel[]>(this.documentsUrl)
  }
}
