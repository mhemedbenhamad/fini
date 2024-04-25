import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupprimerMembreComponent } from './supprimer-membre.component';

describe('SupprimerMembreComponent', () => {
  let component: SupprimerMembreComponent;
  let fixture: ComponentFixture<SupprimerMembreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SupprimerMembreComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SupprimerMembreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
