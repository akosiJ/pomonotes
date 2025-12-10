import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Dashboard } from './dashboard';

describe('Dashboard', () => {
  let component: Dashboard;
  let fixture: ComponentFixture<Dashboard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Dashboard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Dashboard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('has left and right panels open by default (signals)', () => {
    // signals are functions, call them to read current state
    expect(component.leftOpen()).toBeTrue();
    expect(component.rightExpanded()).toBeTrue();
  });

  it('toggleLeft toggles leftOpen signal', () => {
    const before = component.leftOpen();
    component.toggleLeft();
    expect(component.leftOpen()).toBe(!before);
    component.toggleLeft();
    expect(component.leftOpen()).toBe(before);
  });

  it('toggleRight toggles rightExpanded signal', () => {
    const before = component.rightExpanded();
    component.toggleRight();
    expect(component.rightExpanded()).toBe(!before);
    component.toggleRight();
    expect(component.rightExpanded()).toBe(before);
  });
});
