import { Injectable } from '@angular/core';
import { Member } from 'src/app/user/models/member';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  private static instance: LocalStorageService;

  constructor() { }

  public static getInstance(): LocalStorageService {
    if (!LocalStorageService.instance) {
      LocalStorageService.instance = new LocalStorageService();
    }

    return LocalStorageService.instance;
  }

  public getItem(key: string): any {
    const item = localStorage.getItem(key);
    if (item !== null) {
      return JSON.parse(item);
    }
    return null;
  }

  public setItem(key: string, value: any): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  public removeItem(key: string): void {
    localStorage.removeItem(key);
  }

  public clear(): void {
    localStorage.clear();
  }

  public key(index: number): string | null {
    return localStorage.key(index);
  }

  public getMemberFromStorage(): Member {
    const user = new Member(this.getItem(`${environment.storage.member.key}`));
    return user;
  }


}
