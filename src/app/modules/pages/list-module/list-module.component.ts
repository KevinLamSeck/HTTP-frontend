import { Component, OnInit } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { take } from "rxjs";
import { LocalStorageService } from "src/app/core/services/local-storage.service";
import { ToastService } from "src/app/core/toast.service";
import { ModuleType } from "src/app/course/types/module-type";
import { Member } from "src/app/user/models/member";
import { ModuleService } from "../../services/module.service";

@Component({
  selector: "app-list-module",
  templateUrl: "./list-module.component.html",
  styleUrls: ["./list-module.component.scss"],
})
export class ListModuleComponent implements OnInit {
  public modules: ModuleType[] = [];
  public nameOrder: boolean = true;
  public modulesOrder: boolean = true;

  private _localStorageService: LocalStorageService =
    LocalStorageService.getInstance();
  private _currentUser: Member =
    this._localStorageService.getMemberFromStorage();

  constructor(
    private _moduleService: ModuleService,
    private _toastService: ToastService,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this._moduleService
      .findByCreator(this._currentUser.id!)
      .pipe(take(1))
      .subscribe((response: ModuleType[]) => {
        this.modules = response;
        // console.log(this.modules);
        this.sortByName(this.nameOrder);
        this.sortByModules(this.modulesOrder);
      });
  }
  sortByModules(ASC: boolean): void {
    console.log(this.modulesOrder + " // " + this.nameOrder);
    this.modulesOrder = ASC;
    const orderNumber: number = ASC ? -1 : 1;
    this.modules = this.modules.sort(
      (a, b) => (a.medias.length - b.medias.length) * orderNumber
    );
  }
  sortByName(ASC: boolean): void {
    this.nameOrder = ASC;
    const orderNumber: number = ASC ? 1 : -1;
    this.modules = this.modules.sort(
      (a, b) => a.name.localeCompare(b.name) * orderNumber
    );
  }

  handleModuleInfoChange(moduleDeleted: ModuleType) {
    this.modules = this.modules.filter(
      (module) => module.id !== moduleDeleted.id
    );
    this._snackBar.open(`"${moduleDeleted!.name}" was deleted.`, "Close");
  }
}
