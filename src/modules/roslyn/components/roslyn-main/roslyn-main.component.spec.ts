import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoslynMainComponent } from './roslyn-main.component';

describe('RoslynMainComponent', () => {
  let component: RoslynMainComponent;
  let fixture: ComponentFixture<RoslynMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoslynMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoslynMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
