import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { NavigationComponent } from './navigation.component';
import { provideRouter, Router, RouterLink } from "@angular/router";
import { DebugElement } from "@angular/core";
import { By } from "@angular/platform-browser";

describe('NavigationComponent', () => {
  let component: NavigationComponent;
  let fixture: ComponentFixture<NavigationComponent>;
  let linkDes: DebugElement[];
  let routerLinks: RouterLink[];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterLink],
      providers: [provideRouter([])],
      declarations: [ NavigationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    linkDes = fixture.debugElement.queryAll(By.directive(RouterLink));
    routerLinks = linkDes.map(de => de.injector.get(RouterLink));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('can get RouterLinks from template', () => {
    component.routes = [ ...component.routes ];
    fixture.detectChanges();
    expect(routerLinks.length).withContext('should have 2 routerLinks').toBe(2);
  });

  it('can click Dashboard link in template', fakeAsync(() => {
    const listLinkDe = linkDes[0];

    TestBed.inject(Router).resetConfig([{path: '**', children: []}]);
    listLinkDe.triggerEventHandler('click', {button: 0});
    tick();
    fixture.detectChanges();

    expect(TestBed.inject(Router).url).toBe('/dashboard');
  }));

  it('can click List link in template', fakeAsync(() => {
    const listLinkDe = linkDes[1];

    TestBed.inject(Router).resetConfig([{path: '**', children: []}]);
    listLinkDe.triggerEventHandler('click', {button: 0});
    tick();
    fixture.detectChanges();

    expect(TestBed.inject(Router).url).toBe('/list');
  }));
});
