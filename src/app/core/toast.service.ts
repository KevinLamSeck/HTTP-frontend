import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private _duration: number = 3;
  private _cssClass: string = 'success';

  constructor(private _snackBar: MatSnackBar) {}

  set duration(val: number) {
    this._duration = val;
  }

  set cssClass(val: string) {
    this._cssClass = val;
  }

  public show(message: string, action?: string): void {
    const _snackConfig: MatSnackBarConfig = {
      duration: this._duration * 1000,
      panelClass: this._cssClass,
    };

    this._snackBar.open(message, action, _snackConfig);

    this._cssClass = 'success';
  }
}
