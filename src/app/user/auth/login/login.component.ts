import { HttpResponse } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { LocalStorageStrategy } from "src/app/core/store/local-storage-strategy";
import { SessionStorageStrategy } from "src/app/core/store/session-storage-strategy";
import { ToastService } from "src/app/core/toast.service";
import { environment } from "../../../../environments/environment";
import { RecoveryPasswordComponent } from "../../dialogs/recovery-password/recovery-password.component";
import { RecoveryComponent } from "../../dialogs/recovery/recovery.component";
import { UserService } from "../../services/user.service";
@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  public form: FormGroup = new FormGroup({});
  public showPassword: boolean = false;

  public stayConnected: boolean =
    environment.storage.auth.strategy !== "session";

  constructor(
    private _userService: UserService,
    private _router: Router,
    private _dialog: MatDialog,
    private _toastService: ToastService
  ) { }

  ngOnInit(): void {
    const loginControl: AbstractControl = new FormControl("", [
      Validators.required,
    ]);
    const passwordControl: AbstractControl = new FormControl("", [
      Validators.required,
    ]);

    this.form.addControl("login", loginControl);
    this.form.addControl("password", passwordControl);
  }

  passwordToggle(): void {
    this.showPassword = !this.showPassword;
    if (this.showPassword) {
      setTimeout(() => (this.showPassword = false), 800);
    }
  }

  changeStrategy(): void {
    // console.log('stayConnected was changed');
    if (this.stayConnected) {
      this._userService.storageStrategy = new LocalStorageStrategy();
    } else {
      this._userService.storageStrategy = new SessionStorageStrategy();
    }
  }

  openRecovery(): void {
    this._dialog
      .open(RecoveryComponent, {
        height: "flex",
        width: "30vw",
      })
      .afterClosed()
      .subscribe((result: HttpResponse<any> | undefined) => {
        // console.log(result);
        if (result !== undefined) {
          this._dialog.open(RecoveryPasswordComponent, {
            height: "flex",
            width: "flex",
            data: result,
          });
        }
      });
  }

  onSubmit(): void {
    this._userService.authenticate(this.form.value).subscribe({
      next: (response: HttpResponse<any>) => {
        this._router.navigate(["/"]);
      },
      error: (error: any) => {
        const messageErrorLogin: string = `Sorry, the login credentials you entered were incorrect.`;
        this._toastService.show(messageErrorLogin);
      },
      complete: () => {
        this.form.controls["login"].setValue("");
        this.form.controls["password"].setValue("");
        const messageSucessLogin: string = `Welcome back! We're glad to see you again.`;
        this._toastService.show(messageSucessLogin);
      },
    });
  }
}
