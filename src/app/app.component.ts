import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  seats: any[][] = [];
  numSeats: number = 0;
  bookingMessage: string = '';

  constructor() {
    this.initializeSeats();
  }

  initializeSeats() {
    for (let i = 0; i < 11; i++) {
      this.seats[i] = [];
      for (let j = 0; j < (i === 10 ? 3 : 7); j++) {
        this.seats[i][j] = { row: i + 1, seat: j + 1, status: 'available' };
      }
    }
  }

  bookSeats(numSeats: number): string {
    let bookedSeats: any[] = [];

    for (let row of this.seats) {
      let availableSeats = row.filter((seat: any) => seat.status === 'available');

      if (availableSeats.length >= numSeats) {
        bookedSeats = availableSeats.slice(0, numSeats);
        bookedSeats.forEach(seat => seat.status = 'booked');
        break;
      }
    }

    if (bookedSeats.length < numSeats) {
      let remainingSeats = numSeats - bookedSeats.length;
      for (let row of this.seats) {
        let availableSeats = row.filter(seat => seat.status === 'available');
        if (availableSeats.length > 0) {
          bookedSeats.push(...availableSeats.slice(0, remainingSeats));
          remainingSeats -= availableSeats.length;
          if (remainingSeats <= 0) break;
        }
      }
    }

    if (bookedSeats.length === numSeats) {
      return `Seats booked: ${bookedSeats.map(seat => `Row ${seat.row}, Seat ${seat.seat}`).join(', ')}`;
    } else {
      return 'Not enough seats available.';
    }
  }
}
