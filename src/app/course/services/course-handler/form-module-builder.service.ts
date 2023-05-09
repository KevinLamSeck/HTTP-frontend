import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModuleType } from '../../types/module-type';

@Injectable({
  providedIn: 'root'
})
export class FormModuleBuilderService {
  private _form: FormGroup | null = null
  private _module:ModuleType = {name:"",objective:"",selected:false,medias:[]};

  constructor(
    private _formBuilder: FormBuilder
  ) { }

  get form(): FormGroup {
    if (this._form === null) {
      this._buildForm()
    }
    return this._form!
  }
  public buildForm(module:ModuleType):FormGroup{
    this._module=module;
    this._buildForm();
    return this._form!;
  }

  private _buildForm(): void {
    this._form = this._formBuilder.group({
        name: [
            this._module.name,
            [Validators.required]
        ],
        objective: [
            this._module.objective
        ]
    })
}
}
