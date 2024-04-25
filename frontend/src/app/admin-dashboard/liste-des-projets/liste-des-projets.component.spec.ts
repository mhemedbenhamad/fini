import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeDesProjetsComponent } from './liste-des-projets.component';

describe('ListeDesProjetsComponent', () => {
  let component: ListeDesProjetsComponent;
  let fixture: ComponentFixture<ListeDesProjetsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListeDesProjetsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListeDesProjetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
