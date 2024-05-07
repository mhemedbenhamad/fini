import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BatimentAdminComponent } from './batiment-admin.component';

describe('BatimentAdminComponent', () => {
  let component: BatimentAdminComponent;
  let fixture: ComponentFixture<BatimentAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BatimentAdminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BatimentAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
