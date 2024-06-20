import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservationConfirmModalComponent } from './reservation-confirm-modal.component';

describe('ReservationConfirmModalComponent', () => {
  let component: ReservationConfirmModalComponent;
  let fixture: ComponentFixture<ReservationConfirmModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReservationConfirmModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReservationConfirmModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
