import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MusicCountComponent } from './music-count.component';

describe('MusicCountComponent', () => {
  let component: MusicCountComponent;
  let fixture: ComponentFixture<MusicCountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MusicCountComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MusicCountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
