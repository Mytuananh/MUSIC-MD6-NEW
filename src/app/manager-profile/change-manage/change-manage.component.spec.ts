import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeManageComponent } from './change-manage.component';

describe('ChangeManageComponent', () => {
  let component: ChangeManageComponent;
  let fixture: ComponentFixture<ChangeManageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangeManageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
