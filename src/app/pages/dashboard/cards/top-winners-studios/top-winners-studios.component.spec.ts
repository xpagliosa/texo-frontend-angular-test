import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopWinnersStudiosComponent } from './top-winners-studios.component';

describe('TopWinnersStudiosComponent', () => {
  let component: TopWinnersStudiosComponent;
  let fixture: ComponentFixture<TopWinnersStudiosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopWinnersStudiosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TopWinnersStudiosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
