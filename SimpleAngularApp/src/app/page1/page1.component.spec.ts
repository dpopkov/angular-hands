import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Page1Component } from './page1.component';
import {Book} from "../model/Book";
import {DataService} from "../data.service";

describe('Page1Component', () => {
  let component: Page1Component;
  let fixture: ComponentFixture<Page1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Page1Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Page1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('number of books is incremented correctly', () => {
    const startValue = component.books.length;
    const book = new Book();
    book.author = 'Angular';
    /*
      The structure you need to use to reference a dependency
      injected service in a test method:
      const service = fixture.debugElement.injector.get(ClassOfService)
    */
    const dataService = fixture.debugElement.injector.get(DataService);
    dataService.addBook(book);
    const expectedUpdatedValue = startValue + 1;
    expect(component.books.length).toEqual(expectedUpdatedValue);
  });

  it('number of books is incremented correctly (version 2)', () => {
    const startValue = component.books.length;
    const book = new Book();
    book.author = 'Angular';
    const dataService = new DataService();
    component = new Page1Component(dataService);
    component.ngOnInit();
    dataService.addBook(book);
    const expectedUpdatedValue = startValue + 1;
    expect(component.books.length).toEqual(expectedUpdatedValue);
  })
});
