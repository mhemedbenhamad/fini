import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionnaireProjetDashboardComponent } from './gestionnaire-projet-dashboard.component';

describe('GestionnaireProjetDashboardComponent', () => {
  let component: GestionnaireProjetDashboardComponent;
  let fixture: ComponentFixture<GestionnaireProjetDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestionnaireProjetDashboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestionnaireProjetDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
