import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { GuestApiService } from 'src/app/services/api/guest-api/guest-api.service';

@Component({
  selector: 'app-edit-guest',
  templateUrl: './edit-guest.component.html',
  styleUrls: ['./edit-guest.component.scss'],
})
export class EditGuestComponent implements OnInit {
  guestForm = new FormGroup({
    id: new FormControl({ value: '', disabled: true }, [Validators.required]),
    name: new FormControl('', [Validators.required]),
    allowedPlusses: new FormControl('', [Validators.required]),
  });

  constructor(
    private guestApi: GuestApiService,
    private dialogRef: MatDialogRef<EditGuestComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any
  ) {}

  ngOnInit(): void {
    this.fillForm();
  }

  fillForm() {
    this.guestForm.patchValue({
      id: this.data._id,
      name: this.data.name,
      allowedPlusses: this.data.allowedPlusses,
    });
  }

  onClickUpdateGuestDetails() {
    var { name, allowedPlusses, id } = this.guestForm.getRawValue();
    name = name.toUpperCase();
    this.guestApi.editGuest(id, name, allowedPlusses).subscribe((res) => {
      this.dialogRef.close();
    });
  }

  onClickDelete() {
    var { id } = this.guestForm.getRawValue();
    this.guestApi.deleteGuest(id).subscribe((res) => {
      this.dialogRef.close();
    });
  }
}
