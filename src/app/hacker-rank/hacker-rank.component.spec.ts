import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HackerRankComponent } from './hacker-rank.component';

describe('HackerRankComponent', () => {
  let component: HackerRankComponent;
  let fixture: ComponentFixture<HackerRankComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HackerRankComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HackerRankComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
