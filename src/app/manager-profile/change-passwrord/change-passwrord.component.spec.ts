import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangePasswrordComponent } from './change-passwrord.component';

describe('ChangePasswrordComponent', () => {
  let component: ChangePasswrordComponent;
  let fixture: ComponentFixture<ChangePasswrordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangePasswrordComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangePasswrordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
