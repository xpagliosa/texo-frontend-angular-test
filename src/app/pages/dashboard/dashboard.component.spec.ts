import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardComponent } from './dashboard.component';
import { Component } from "@angular/core";
import { By } from "@angular/platform-browser";


fdescribe('DashboardComponent', () => {
  @Component({selector: 'app-winners-by-year', template: ''})
  class WinnersByYearStubComponent {
  }
  @Component({selector: 'app-top-winners-studios', template: ''})
  class TopWinnersStudiosStubComponent {
  }

  @Component({selector: 'app-producers-longest-shortest', template: ''})
  class ProducersLongestShortestStubComponent {
  }

  @Component({selector: 'app-years-multiple-winners', template: ''})
  class YearsMultipleWinnersStubComponent {
  }


  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        DashboardComponent,
        WinnersByYearStubComponent,
        TopWinnersStudiosStubComponent,
        ProducersLongestShortestStubComponent,
        YearsMultipleWinnersStubComponent
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render app-years-multiple-winners', () => {
    const element = fixture.debugElement.query(By.css('app-years-multiple-winners'));
    expect(element).toBeTruthy();
  });

  it('should render app-top-winners-studios', () => {
    const element = fixture.debugElement.query(By.css('app-top-winners-studios'));
    expect(element).toBeTruthy();
  });

  it('should render app-producers-longest-shortest', () => {
    const element = fixture.debugElement.query(By.css('app-producers-longest-shortest'));
    expect(element).toBeTruthy();
  });

  it('should render app-winners-by-year', () => {
    const element = fixture.debugElement.query(By.css('app-winners-by-year'));
    expect(element).toBeTruthy();
  });

});
