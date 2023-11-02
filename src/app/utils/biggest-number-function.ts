import { DocumentModel } from '../domain/models/document.model';

export function biggestNumber(array: DocumentModel[]) {
  const arrayOfNumbers: number[] = [];

  array.forEach((document) => {
    arrayOfNumbers.push(document.categoryId);
  });

  arrayOfNumbers.sort((a, b) => a - b);

  return arrayOfNumbers[arrayOfNumbers.length - 1];
}
