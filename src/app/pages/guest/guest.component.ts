import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { GuestApiService } from 'src/app/services/api/guest-api/guest-api.service';
import { AddGuestComponent } from './components/add-guest/add-guest.component';
import { EditGuestComponent } from './components/edit-guest/edit-guest.component';

interface GuestStats {
  totalInvitation: Number;
  totalNegativeResponse: Number;
  totalPositiveResponse: Number;
  totalPendingResponse: Number;
  totalAllocatedSeat: Number;
  totalConfirmedSeat: Number;
  totalConfirmedKids: Number;
  totalConfirmedAdults: Number;
}

@Component({
  selector: 'app-guest',
  templateUrl: './guest.component.html',
  styleUrls: ['./guest.component.scss'],
})
export class GuestComponent implements OnInit {
  displayedColumns: string[] = [
    'name',
    'isAttending',
    'email',
    'mobile',
    'notes',
    'allowedPlusses',
    'action',
  ];
  dataSource = [];
  stats!: GuestStats;

  constructor(private guestApi: GuestApiService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.fetchGuests();
    this.getStats();
  }

  statsAsOf = new Date();
  getStats() {
    this.guestApi.getGuestStats().subscribe((res: any) => {
      this.stats = res.env.stats;
      this.statsAsOf = new Date();
      setTimeout(() => {
        this.getStats();
      }, 15000);
    });
  }

  fetchGuests() {
    this.guestApi.getGuests().subscribe((res: any) => {
      this.dataSource = res.env.guests;
    });
  }

  onClickAddGuestBtn() {
    this.dialog
      .open(AddGuestComponent, { width: '100rem' })
      .afterClosed()
      .subscribe((o) => {
        this.fetchGuests();
      });
  }

  onClickEditGuestBtn(guestDetails: any) {
    this.dialog
      .open(EditGuestComponent, {
        width: '100rem',
        data: guestDetails,
      })
      .afterClosed()
      .subscribe((o) => {
        this.fetchGuests();
      });
  }
}
