import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { GuestApiService } from 'src/app/services/api/guest-api/guest-api.service';
import { ConfirmationDialogComponent } from 'src/app/shared/confirmation-dialog/confirmation-dialog.component';

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
    plusses: new FormArray([]),
  });

  constructor(
    private guestApi: GuestApiService,
    private dialogRef: MatDialogRef<EditGuestComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialog: MatDialog
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
    this.populateGuest(this.data.plusses || []);
  }

  onClickUpdateGuestDetails() {
    var { name, allowedPlusses, plusses, id } = this.guestForm.getRawValue();
    name = name.toUpperCase();
    this.guestApi
      .editGuest(id, name, allowedPlusses, plusses)
      .subscribe((res) => {
        this.dialogRef.close();
      });
  }

  onClickDelete() {
    var { name, id } = this.guestForm.getRawValue();
    this.dialog
      .open(ConfirmationDialogComponent, {
        data: {
          title: 'Delete ' + name + ' from your list?',
          message:
            'Are you sure? This action is irreversible so please proceed with caution',
          positiveText: 'Proceed on deleting',
          negativeText: 'Cancel',
        },
      })
      .afterClosed()
      .subscribe((res) => {
        if (res) this.delete();
      });
  }

  delete() {
    var { id, name } = this.guestForm.getRawValue();
    this.guestApi.deleteGuest(id).subscribe((res) => {
      alert(name + ' successfully removed from the list!');
      this.dialogRef.close();
    });
  }

  populateGuest(plusses: Array<any>) {
    console.log(plusses);
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

  get allowedPlusses() {
    return this.guestForm?.get('allowedPlusses')?.value;
  }
}
