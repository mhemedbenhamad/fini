import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeBatimentAdminComponent } from './liste-batiment-admin.component';

describe('ListeBatimentAdminComponent', () => {
  let component: ListeBatimentAdminComponent;
  let fixture: ComponentFixture<ListeBatimentAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListeBatimentAdminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListeBatimentAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
