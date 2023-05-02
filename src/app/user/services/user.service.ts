import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, take, tap } from 'rxjs';
import { LocalStorageService } from 'src/app/core/services/local-storage.service';
import { ToastService } from 'src/app/core/toast.service';
import { environment } from './../../../environments/environment';
import { IStorageStrategy } from './../../core/store/i-storage-strategy';
import { LocalStorageStrategy } from './../../core/store/local-storage-strategy';
import { SessionStorageStrategy } from './../../core/store/session-storage-strategy';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private _user: any = undefined;
  private _user$: BehaviorSubject<any | undefined> = new BehaviorSubject(
    undefined
  );

  private _storageStrategy: IStorageStrategy;
  private _localStorageService: LocalStorageService =
    LocalStorageService.getInstance();

  constructor(
    private _httpClient: HttpClient,
    private _router: Router,
    private _toastService: ToastService
  ) {
    this._storageStrategy =
      environment.storage.auth.strategy === 'session'
        ? new SessionStorageStrategy()
        : new LocalStorageStrategy();

    this._user = this._storageStrategy.retrieve();
    this._user$.next(this._user);
  }

  public set storageStrategy(strategy: IStorageStrategy) {
    this._storageStrategy = strategy;
  }

  public get user(): any {
    if (this._user === undefined) {
      this._user = this._storageStrategy.retrieve();
    }

    return this._user;
  }

  public get user$() {
    return this._user$;
  }

  public authenticate(credentials: any): Observable<HttpResponse<any>> {
    const endPoint: string = `${environment.apiRootUri}students/byLoginAndPassword`;
    return this._httpClient
      .post<any>(endPoint, credentials, {
        observe: 'response',
      })
      .pipe(
        take(1),
        tap((response: HttpResponse<any>) => {
          if (response.status === 200) {
            this._user = response.body;
            // ? Store the user data in local storage
            this._localStorageService.setItem(
              `${environment.storage.member.key}`,
              this._user
            );
            this._storageStrategy.store(credentials);
            this._user$.next(this._user);
          }
        })
      );
  }

  public recovery(credentials: any): Observable<HttpResponse<string>> {
    const endPoint: string = `${environment.apiRootUri}students/recovery`;
    return this._httpClient
      .post<string>(endPoint, credentials, {
        observe: 'response',
      })
      .pipe(
        take(1),
        tap((u: HttpResponse<any>) => {
          // console.log(u.body);
        })
      );
  }

  public logout(): void {
    this._localStorageService.removeItem(`${environment.storage.member.key}`);
    this._storageStrategy.remove();
    this._user = undefined;
    this._user$.next(this._user);
    // Fallback to default strategy
    this._storageStrategy =
      environment.storage.auth.strategy === 'session'
        ? new SessionStorageStrategy()
        : new LocalStorageStrategy();
    this._router.navigate(['/', 'user']);

    const messageSucessLogin: string = `You have been successfully logged out. See you again soon!`;
    this._toastService.show(messageSucessLogin);
  }
}
