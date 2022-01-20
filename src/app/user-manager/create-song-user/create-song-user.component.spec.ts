import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSongUserComponent } from './create-song-user.component';

describe('CreateSongUserComponent', () => {
  let component: CreateSongUserComponent;
  let fixture: ComponentFixture<CreateSongUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateSongUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateSongUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
