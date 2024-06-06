import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyprofilComponent } from './myprofil.component';

describe('MyprofilComponent', () => {
  let component: MyprofilComponent;
  let fixture: ComponentFixture<MyprofilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyprofilComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyprofilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
