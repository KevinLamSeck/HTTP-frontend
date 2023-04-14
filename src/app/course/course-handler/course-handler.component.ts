import { Component, OnInit } from "@angular/core";
import { AbstractControl, FormGroup } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { ModuleAddComponent } from "../dialogs/module-add/module-add.component";
import { FormCourseBuilderService } from "../services/course-handler/form-course-builder.service";
import { CourseService } from "../services/course.service";
import { CourseType } from "../types/course-type";
import { ModuleType } from "../types/module-type";
import { CdkDragDrop, moveItemInArray } from "@angular/cdk/drag-drop";
import { LocalStorageService } from "src/app/core/services/local-storage.service";
import { CreateMediaComponent } from "src/app/medias/create-media/create-media.component";
import { MediaType } from "../types/media-type";
import { AddMediaComponent } from "src/app/modules/pages/medias-management/add-media/add-media.component";
import { ExistingModuleComponent } from "src/app/modules/module-management/existing-module/existing-module.component";

@Component({
  selector: "app-course-handler",
  templateUrl: "./course-handler.component.html",
  styleUrls: ["./course-handler.component.scss"],
})
export class CourseHandlerComponent implements OnInit {
  public form: FormGroup;
  public useModule: boolean = true;
  public modules: Array<ModuleType> = [];
  public course: CourseType;
  public updateCourse: boolean = false;
  public updateOrCreate: string = "Add";

  constructor(
    private _formBuilder: FormCourseBuilderService,
    private _courseService: CourseService,
    private _router: Router,
    private _dialog: MatDialog,
    private _localStorageService: LocalStorageService
  ) {
    this.course = JSON.parse(sessionStorage.getItem("ModifiedCourse") + "");
    this._formBuilder.buildForm(this.course);
    if (this.course) {
      this.updateOrCreate = "Update";
      this.updateCourse = true;
      this.course.modules?.forEach((m) => {
        this.modules.push(m);
      });
      console.log(this.modules);
      this.modules.sort(
        (s1: ModuleType, s2: ModuleType) => (s1.order! - s2.order!) * 1
      );
      //this.modules.sort((a,b)=>a.order > b.order)
    }
    this.form = this._formBuilder.form;
  }

  ngOnInit(): void {}

  get c(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  addModule(): void {
    this._dialog
      .open(ModuleAddComponent, {
        height: "flex",
        width: "flex",
      })
      .afterClosed()
      .subscribe((result: ModuleType | undefined) => {
        if (result !== undefined) {
          result.medias = [];
          this.modules.push(result);
        }
      });
  }
  



  addMedia(parent: ModuleType): void {
    this._dialog
      .open(CreateMediaComponent, {
        height: "flex",
        width: "flex",
        data: true,
      })
      .afterClosed()
      .subscribe((result: MediaType | undefined) => {
        if (result !== undefined) {
          console.log(result);
          let media: MediaType = {
            id:undefined,
            title: result.title,
            summary: result.summary,
            duration: result.duration,
            url: result.url,
            typeMedia: result.typeMedia,
          };
          let i: number = this.modules.indexOf(parent);
          this.modules[i].medias.push(media);

          // result.medias = [];
          // this.modules.push(result);
        }
      });
  }
  addExistingMedia(parent: ModuleType): void {
    this._dialog
      .open(AddMediaComponent, {
        height: "flex",
        width: "flex",
        data: true,
      })
      .afterClosed()
      .subscribe((result: MediaType | undefined) => {
        if (result !== undefined) {
          
          console.log(result);
          let media: MediaType = {
            id:undefined,
            title: result.title,
            summary: result.summary,
            duration: result.duration,
            url: result.url,
            typeMedia: result.typeMedia,
          };
          let i: number = this.modules.indexOf(parent);
          this.modules[i].medias.push(media);

          // result.medias = [];
          // this.modules.push(result);
        }
      });
  }

  updateModule(module: ModuleType): void {
    this._dialog
      .open(ModuleAddComponent, {
        height: "flex",
        width: "flex",
        data: module,
      })
      .afterClosed()
      .subscribe((result: ModuleType | undefined) => {
        if (result !== undefined) {
          
        }
      });
  }
  addExistingModule(): void {
    this._dialog
    .open(ExistingModuleComponent, {
      height: "flex",
      width: "flex",
      data: true,
    })
    .afterClosed()
    .subscribe((result: ModuleType | undefined) => {
      if (result !== undefined) {
        
        console.log(result);
        let module: ModuleType = {
          id:undefined,
          name: result.name,
          objective: result.objective,
          selected:false,
          medias:result.medias
        };
        this.modules.push(module);

        // result.medias = [];
        // this.modules.push(result);
      }
    });
  }

  removeModule(module: ModuleType): void {
    this.modules.splice(this.modules.indexOf(module), 1);
  }
  drop(event: CdkDragDrop<string[]>) {
    console.log(event);
    moveItemInArray(this.modules, event.previousIndex, event.currentIndex);
  }
  dropMedia(event: CdkDragDrop<string[]>, module: ModuleType) {
    console.log(event);

    let i: number = this.modules.indexOf(module);
    moveItemInArray(
      this.modules[i].medias,
      event.previousIndex,
      event.currentIndex
    );
  }
  removeMedia(module : ModuleType, media : MediaType):void{
    const i : number =this.modules.indexOf(module);
    
    this.modules[i].medias.splice(this.modules[i].medias.indexOf(media), 1);
  }

  onSubmit(): void {
    console.log(this.modules);

    let orderedModules: any[] = [];
    let i = 0;
    this.modules.forEach((m) => {
      m.order = i;
      orderedModules.push(m);
      i++;
    });

    const course: CourseType = {
      title: this.c["title"].value,
      objective: this.c["objective"].value,
      modules: orderedModules,
      creator: { id: this._localStorageService.getMemberFromStorage().id },
    };
    
    course.modules = course.modules?.sort(
      (s1: ModuleType, s2: ModuleType) => (s1.order! - s2.order!) * 1
    );
    console.log(course);
    

    if (this.updateCourse) {
      course.id = this.course.id;
      this._courseService.update(course).subscribe((courseType: CourseType) => {
        this._router.navigate(["/", "dashboard", "conceptor", "courses"]);
      });
    } else {
      this._courseService.add(course).subscribe((courseType: CourseType) => {
        this._router.navigate(["/", "dashboard", "conceptor", "courses"]);
      });
    }
  }
}
