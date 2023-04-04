import { Injectable } from '@angular/core';

const users: Array<any> = [
  {
    login: 'bond',
    password: '007'
  },
  {
    login: 'bonissel',
    password: 'oss117'
  }
]
@Injectable({
  providedIn: 'root'
})
export class UserService {

  private _user: any = undefined

  constructor() { }

  public get user(): any {
    return this._user
  }

  public authenticate(credentials: any): boolean {
    this._user = users.find((user: any) =>
      user.login === credentials.login && user.password === credentials.password)

    return this._user !== undefined
  }
}
