import { Component, Inject, OnInit } from "@angular/core";
import { AbstractControl, Form, FormGroup } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { FormModuleBuilderService } from "../../services/course-handler/form-module-builder.service";

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
    this.addOrUpdate = data == null;
    this.form =
      data == null ? this._formBuilder.form : this._formBuilder.buildForm(data);
    this.c["name"].setValue("");
    this.c["objective"].setValue("");
  }

  ngOnInit(): void {}

  get c(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    this.dialogRef.close(this.form.value);
  }
}
