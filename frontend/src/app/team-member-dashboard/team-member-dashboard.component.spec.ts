import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamMemberDashboardComponent } from './team-member-dashboard.component';

describe('TeamMemberDashboardComponent', () => {
  let component: TeamMemberDashboardComponent;
  let fixture: ComponentFixture<TeamMemberDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeamMemberDashboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeamMemberDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
