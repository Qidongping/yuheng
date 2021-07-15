import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModulegroupComponent } from './modulegroup.component';

describe('ModulegroupComponent', () => {
  let component: ModulegroupComponent;
  let fixture: ComponentFixture<ModulegroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModulegroupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModulegroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
