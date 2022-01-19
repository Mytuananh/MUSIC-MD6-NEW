import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MusicNewComponent } from './music-new.component';

describe('MusicNewComponent', () => {
  let component: MusicNewComponent;
  let fixture: ComponentFixture<MusicNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MusicNewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MusicNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
