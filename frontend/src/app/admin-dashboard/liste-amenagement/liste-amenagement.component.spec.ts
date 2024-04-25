import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeAmenagementComponent } from './liste-amenagement.component';

describe('ListeAmenagementComponent', () => {
  let component: ListeAmenagementComponent;
  let fixture: ComponentFixture<ListeAmenagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListeAmenagementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListeAmenagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
