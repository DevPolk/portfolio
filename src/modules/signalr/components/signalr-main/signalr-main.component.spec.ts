import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignalrMainComponent } from './signalr-main.component';

describe('SignalrMainComponent', () => {
  let component: SignalrMainComponent;
  let fixture: ComponentFixture<SignalrMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignalrMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignalrMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
