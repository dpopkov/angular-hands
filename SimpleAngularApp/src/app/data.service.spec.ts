import { TestBed } from '@angular/core/testing';

import { DataService } from './data.service';
import {Book} from "./model/Book";

describe('DataService', () => {
  let service: DataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('addBook increases the size of the books array', () => {
    const book = new Book();
    const oldLength = service.books.length;
    service.addBook(book);
    // fail();
    expect(service.books.length).toBeGreaterThan(oldLength);
  });
});
