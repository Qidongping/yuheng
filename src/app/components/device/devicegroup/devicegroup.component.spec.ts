import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DevicegroupComponent } from './devicegroup.component';

describe('DevicegroupComponent', () => {
  let component: DevicegroupComponent;
  let fixture: ComponentFixture<DevicegroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DevicegroupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DevicegroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
