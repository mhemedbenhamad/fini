import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeDesProjectsComponent } from './liste-des-projects.component';

describe('ListeDesProjectsComponent', () => {
  let component: ListeDesProjectsComponent;
  let fixture: ComponentFixture<ListeDesProjectsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListeDesProjectsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListeDesProjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
