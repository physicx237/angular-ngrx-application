import { Observable } from "rxjs";
import { DocumentModel } from "../models/document.model";
import { CategoryModel } from "../models/category.model";

export interface GetDataPort {
    categoriesUrl: string;
    documentsUrl: string;

    getDocuments(): Observable<DocumentModel[]>;
    getCategories(): Observable<CategoryModel[]>;
}