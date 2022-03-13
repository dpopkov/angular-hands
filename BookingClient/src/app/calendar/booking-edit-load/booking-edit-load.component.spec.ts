import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingEditLoadComponent } from './booking-edit-load.component';

describe('BookingEditLoadComponent', () => {
  let component: BookingEditLoadComponent;
  let fixture: ComponentFixture<BookingEditLoadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookingEditLoadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookingEditLoadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
