import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsDesProjectsComponent } from './details-des-projects.component';

describe('DetailsDesProjectsComponent', () => {
  let component: DetailsDesProjectsComponent;
  let fixture: ComponentFixture<DetailsDesProjectsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailsDesProjectsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailsDesProjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
