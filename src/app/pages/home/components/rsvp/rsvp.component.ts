import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
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
  searchSubscription!: Subscription;

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
    this.searchSubscription = this.guestApi
      .searchGuestByName(name)
      .subscribe((res: any) => {
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
          this.populateGuest(plusses || []);
          console.log(this.rsvpForm);
        } else {
          this.showError = true;
        }
      });
  }

  cancelSearching() {
    this.searchSubscription.unsubscribe();
  }

  populateGuest(plusses: Array<any>) {
    for (let i = 0; i < plusses?.length; i++)
      this.plusses.push(
        new FormGroup({
          name: new FormControl(plusses && plusses[i] ? plusses[i].name : '', [
            Validators.required,
          ]),
          age: new FormControl(plusses && plusses[i] ? plusses[i].age : '', [
            Validators.required,
          ]),
        })
      );
  }

  pushGuestFields() {
    this.plusses.push(
      new FormGroup({
        name: new FormControl('', [Validators.required]),
        age: new FormControl('', [Validators.required]),
      })
    );
  }

  removeGuestFields(i: number) {
    this.plusses.removeAt(i);
  }

  get plusses() {
    return this.rsvpForm.get('plusses') as FormArray;
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
}
