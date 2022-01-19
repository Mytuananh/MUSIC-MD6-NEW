import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MusicSuggestComponent } from './music-suggest.component';

describe('MusicSuggestComponent', () => {
  let component: MusicSuggestComponent;
  let fixture: ComponentFixture<MusicSuggestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MusicSuggestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MusicSuggestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
