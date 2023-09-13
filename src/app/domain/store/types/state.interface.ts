import { CategoryModel } from "../../models/category.model";
import { DocumentModel } from "../../models/document.model";

export interface State {
    documents: DocumentModel[],
    categories: CategoryModel[],
}