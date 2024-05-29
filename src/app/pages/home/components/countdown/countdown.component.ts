import { Component, OnInit } from '@angular/core';
import { WeddingApiService } from 'src/app/services/api/wedding-api/wedding-api.service';

@Component({
  selector: 'app-countdown',
  templateUrl: './countdown.component.html',
  styleUrls: ['./countdown.component.scss'],
})
export class CountdownComponent implements OnInit {
  weddingDate = new Date(
    'Wed Feb 26 2025 15:30:00 GMT+0800 (Philippine Standard Time)'
  );
  diffInMs = 0;
  cd = { days: 0, hours: 0, mins: 0, secs: 0 };

  constructor(private weddingApi: WeddingApiService) {}

  ngOnInit(): void {
    this.getWeddingDate();
  }

  getWeddingDate() {
    var currentDate = new Date();
    // this.weddingApi.getWeddingDate().subscribe((res: any) => {
    // console.log(res);
    // this.weddingDate = new Date(res.env.weddingDate);
    this.diffInMs =
      Math.abs(currentDate.getTime() - this.weddingDate.getTime()) / 1000;
    this.timerSet();
    // });
  }

  timerSet() {
    let timer = setInterval(() => {
      var currentDate = new Date();
      this.diffInMs =
        Math.abs(currentDate.getTime() - this.weddingDate.getTime()) / 1000;
      this.cd.days = Math.floor(this.diffInMs / 86400);
      this.cd.hours = Math.floor((this.diffInMs / 3600) % 24);
      this.cd.mins = Math.floor((this.diffInMs % 3600) / 60);
      this.cd.secs = Math.floor((this.diffInMs % 3600) % 60);

      if (this.diffInMs < 0) {
        clearInterval(timer);
      }
    }, 1000);
  }
}
