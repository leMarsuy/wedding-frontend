import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RsvpLinkComponent } from './rsvp-link.component';

describe('RsvpLinkComponent', () => {
  let component: RsvpLinkComponent;
  let fixture: ComponentFixture<RsvpLinkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RsvpLinkComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RsvpLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
