import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CategoryModel } from '../domain/models/category.model';
import { DocumentModel } from '../domain/models/document.model';
import { GetDataPort } from '../domain/ports/get-data.interface';

@Injectable({
  providedIn: 'root'
})
export class GetDataService implements GetDataPort {

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
