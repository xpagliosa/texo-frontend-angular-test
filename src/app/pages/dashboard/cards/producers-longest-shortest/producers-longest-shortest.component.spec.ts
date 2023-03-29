import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProducersLongestShortestComponent } from './producers-longest-shortest.component';

describe('ProducersLongestShortestComponent', () => {
  let component: ProducersLongestShortestComponent;
  let fixture: ComponentFixture<ProducersLongestShortestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProducersLongestShortestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProducersLongestShortestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
