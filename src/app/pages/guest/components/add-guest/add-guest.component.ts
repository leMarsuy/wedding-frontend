import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { GuestApiService } from 'src/app/services/api/guest-api/guest-api.service';

@Component({
  selector: 'app-add-guest',
  templateUrl: './add-guest.component.html',
  styleUrls: ['./add-guest.component.scss'],
})
export class AddGuestComponent implements OnInit {
  guestForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    allowedPlusses: new FormControl('', [Validators.required]),
    plusses: new FormArray([]),
  });

  constructor(
    private guestApi: GuestApiService,
    private dialogRef: MatDialogRef<AddGuestComponent>
  ) {}

  ngOnInit(): void {}

  onClickAddToGuestList() {
    var { name, allowedPlusses } = this.guestForm.value;
    name = name.toUpperCase();
    this.guestApi.addGuest(name, allowedPlusses).subscribe((res) => {
      this.dialogRef.close();
    });
  }

  pushGuestFields() {
    this.plusses.push(
      new FormGroup({
        name: new FormControl('', [Validators.required]),
        age: new FormControl('', []),
      })
    );
  }

  removeGuestFields(i: number) {
    this.plusses.removeAt(i);
  }

  get plusses() {
    return this.guestForm.get('plusses') as FormArray;
  }

  get allowedPlusses(): number {
    return Number(this.guestForm.get('allowedPlusses')) || 0;
  }
}
