import { HttpResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastService } from 'src/app/core/toast.service';

@Component({
  selector: 'app-recovery-password',
  templateUrl: './recovery-password.component.html',
  styleUrls: ['./recovery-password.component.scss']
})
export class RecoveryPasswordComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: HttpResponse<any>,
    public dialogRef: MatDialogRef<RecoveryPasswordComponent>,
    private _toastService: ToastService) { }

  ngOnInit(): void {
  }

  onClose(): void {
    this.dialogRef.close()
  }

  copyToClipboard(text: string) {
    navigator.clipboard.writeText(text).then(() => {
      this._toastService.show('Password copied to clipboard', 'Close');
    }).catch((err) => {
      console.error('Failed to copy text:', err);
    });
  }

}
