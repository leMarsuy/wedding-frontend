import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { GuestApiService } from 'src/app/services/api/guest-api/guest-api.service';

@Component({
  selector: 'app-rsvp',
  templateUrl: './rsvp.component.html',
  styleUrls: ['./rsvp.component.scss'],
})
export class RsvpComponent implements OnInit {
  found = false;
  yesNo = ['Yes', 'No'];
  showError = false;
  searching = false;
  allowedPlusses = 0;
  sendingRSPV = false;

  rsvpForm = new FormGroup({
    id: new FormControl({ value: '', disabled: true }, [Validators.required]),
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
    mobileNumber: new FormControl('', [Validators.required]),
    plusses: new FormArray([]),
    isAttending: new FormControl('', [Validators.required]),
    notes: new FormControl(''),
  });

  constructor(private guestApi: GuestApiService) {}

  ngOnInit(): void {}

  onClickSearch() {
    var { name } = this.rsvpForm.value;

    if (!name) return;
    this.searching = true;
    name = name.toUpperCase();
    this.guestApi.searchGuestByName(name).subscribe((res: any) => {
      console.log(res);
      this.searching = false;
      if (res.env.guest) {
        this.showError = false;
        var {
          _id,
          name,
          email,
          mobileNumber,
          allowedPlusses,
          isAttending,
          notes,
          plusses,
        } = res.env.guest;
        this.allowedPlusses = allowedPlusses;
        this.rsvpForm.patchValue({
          id: _id,
          name,
          email,
          mobileNumber,
          notes,
          isAttending,
        });
        this.rsvpForm.get('name')?.disable();
        this.populateGuest(allowedPlusses, plusses);
        // loop plusses here
      } else {
        this.showError = true;
      }
    });
  }

  populateGuest(allowedPlusses: number, plusses?: Array<any>) {
    for (let i = 0; i < allowedPlusses; i++)
      this.plusses.push(
        new FormGroup({
          name: new FormControl(plusses && plusses[i] ? plusses[i].name : ''),
          age: new FormControl(plusses && plusses[i] ? plusses[i].age : ''),
        })
      );
  }

  onClickSubmitRSVP() {
    this.sendingRSPV = true;
    var { id, mobileNumber, email, plusses, notes, isAttending } =
      this.rsvpForm.getRawValue();
    this.guestApi
      .rsvp(id, plusses, isAttending, email, mobileNumber, notes)
      .subscribe((res: any) => {
        this.sendingRSPV = false;
        alert(`Your RSVP has been sent`);
        window.location.reload();
      });
  }

  onClickClearDetails() {
    this.rsvpForm.reset();
    this.plusses.clear();
    this.rsvpForm.get('name')?.enable();
  }

  get plusses() {
    return this.rsvpForm.get('plusses') as FormArray;
  }
}
