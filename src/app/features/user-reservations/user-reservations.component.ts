import { Component } from '@angular/core';
import { ReservationService } from '../../core/services/reservation.service';
import { Reservation } from '../../models/reservation';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-reservations',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatCardModule, MatTableModule],
  templateUrl: './user-reservations.component.html',
  styleUrls: ['./user-reservations.component.scss'],
})
export class UserReservationsComponent {
  reservations: Reservation[] = [];
  dataSource = new MatTableDataSource<Reservation>();
  displayedColumns: string[] = ['bookTitle', 'reservationDate', 'actions'];

  subs$: Subscription = new Subscription();

  constructor(
    private reservationService: ReservationService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.loadReservations();
  }

  loadReservations(): void {
    this.dataSource.data = [];
    this.reservations = [];

    this.subs$.add(
      this.reservationService.getUserReservations().subscribe({
        next: (reservations) => {
          this.reservations = reservations;
          this.dataSource.data = reservations;
        },
        error: (error) => {
          this.toastr.error(error.error);
        },
      })
    );
  }

  cancelReservation(reservationId: string): void {
    this.subs$.add(
      this.reservationService.cancelReservation(reservationId).subscribe({
        error: (error) => {
          this.toastr.error(error.error);
        },
        complete: () => {
          this.toastr.success('Reservation cancelled');
          this.loadReservations();
        },
      })
    );
  }
}
