import { APP_INITIALIZER, Injectable } from "@angular/core";
import { UserService } from "./../../user/services/user.service";
import { environment } from "./../../../environments/environment";
import { LocalStorageStrategy } from "../store/local-storage-strategy";
@Injectable()
export class AppInitializerService {
  constructor(private _userService: UserService) {}

  init(): Promise<void> {
    return new Promise((resolve) => {
      const jsonUser: string | null = localStorage.getItem(
        environment.storage.auth.key
      );
      if (jsonUser) {
        this._userService.storageStrategy = new LocalStorageStrategy();
        this._userService.authenticate(JSON.parse(jsonUser)).subscribe();
      }
      resolve();
    });
  }

  public static initializeApp(
    _appInitializerService: AppInitializerService
  ): any {
    return (): Promise<any> => {
      return _appInitializerService.init();
    };
  }
}

export const appInitializer = {
  provide: APP_INITIALIZER,
  useFactory: AppInitializerService.initializeApp,
  deps: [AppInitializerService],
  multi: true,
};
