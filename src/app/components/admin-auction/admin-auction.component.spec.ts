import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAuctionComponent } from './admin-auction.component';

describe('AdminAuctionComponent', () => {
  let component: AdminAuctionComponent;
  let fixture: ComponentFixture<AdminAuctionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminAuctionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAuctionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
