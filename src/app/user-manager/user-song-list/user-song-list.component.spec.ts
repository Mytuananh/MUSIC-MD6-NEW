import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserSongListComponent } from './user-song-list.component';

describe('UserSongListComponent', () => {
  let component: UserSongListComponent;
  let fixture: ComponentFixture<UserSongListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserSongListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserSongListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
