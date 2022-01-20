import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAddSongComponent } from './list-add-song.component';

describe('ListAddSongComponent', () => {
  let component: ListAddSongComponent;
  let fixture: ComponentFixture<ListAddSongComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListAddSongComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListAddSongComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
