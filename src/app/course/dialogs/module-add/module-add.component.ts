import { Component, Inject, OnInit } from "@angular/core";
import { AbstractControl, Form, FormGroup } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { FormModuleBuilderService } from "../../services/course-handler/form-module-builder.service";
import { ModuleType } from "../../types/module-type";

@Component({
  selector: "app-module-add",
  templateUrl: "./module-add.component.html",
  styleUrls: ["./module-add.component.scss"],
})
export class ModuleAddComponent implements OnInit {
  public form: FormGroup;
  public addOrUpdate: boolean = false;

  constructor(
    private _formBuilder: FormModuleBuilderService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<ModuleAddComponent>
  ) {
    console.log(data);
    this.addOrUpdate = data == null;
    this.form =
      data == null ? this._formBuilder.form : this._formBuilder.buildForm(data);
    this.c["name"].setValue(!this.addOrUpdate ? data.name : "");
    this.c["objective"].setValue(!this.addOrUpdate ? data.objective : "");
  }

  ngOnInit(): void {}

  get c(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    let module: ModuleType = {
      id: undefined,
      name: this.c["name"].value,
      objective: this.c["objective"].value,
      selected: false,
      medias: this.data ? this.data.medias : [],
    };
    this.dialogRef.close(module);
  }
}
