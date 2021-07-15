import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelgroupComponent } from './modelgroup.component';

describe('ModelgroupComponent', () => {
  let component: ModelgroupComponent;
  let fixture: ComponentFixture<ModelgroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModelgroupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModelgroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
