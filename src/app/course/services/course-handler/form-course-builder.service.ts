import { Injectable } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { CourseType } from "../../types/course-type";

@Injectable({
  providedIn: "root",
})
export class FormCourseBuilderService {
  private _form: FormGroup | null = null;
  private _course: any = { title: "", objective: "" };

  public constructor(private _formBuilder: FormBuilder) {}

  public get form(): FormGroup {
    if (this._form === null) {
      this._buildForm();
    }
    return this._form!;
  }
  public buildForm(course: CourseType) {
    if (course != null) {
      this._course = course;
    } else {
      this._course = { title: "", objective: "" };
    }
    this._buildForm();
  }

  private _buildForm(): void {
    this._form = this._formBuilder.group({
      title: [this._course.title, [Validators.required]],
      objective: [this._course.objective],
    });
  }
}
