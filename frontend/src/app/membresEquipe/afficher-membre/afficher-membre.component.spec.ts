import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AfficherMembreComponent } from './afficher-membre.component';

describe('AfficherMembreComponent', () => {
  let component: AfficherMembreComponent;
  let fixture: ComponentFixture<AfficherMembreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AfficherMembreComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AfficherMembreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
