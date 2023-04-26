import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { take } from 'rxjs';
import { StudentFormComponent } from '../dialogs/student-form/student-form.component';
import { StudentModel } from '../models/student-model';
import { StudentService } from '../services/student.service';
import { SimpleStudent } from '../types/simple-student-type';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  public students: SimpleStudent[] = []
  public byIdSortOrder: number = -1
  public byLastNameSortOrder: number = 1
  public sortDefault: string = 'id'
  public checkUncheckAll: boolean = false
  public checkedStudents: Array<SimpleStudent> = []

  constructor(
    private _studentService: StudentService,
    private _matDialog: MatDialog
  ) { }

  ngOnInit(): void {
    this._studentService.findSimpleStudents()
      .pipe(
        take(1)
      ).subscribe((students: SimpleStudent[]) => {
        this.students = students
        this.students.sort((s1: SimpleStudent, s2: SimpleStudent) => s1.id! - s2.id!)
      })
  }

  /**
   * Open a dialog with a form
   * if a SimpleStudent was passed, get whole student from service before open dialog
   * @todo Keep dialogRef instance avoiding open multiple dialogs
   */
  public openForm(student: SimpleStudent | null = null): void {
    if (!student) {
      this._openDialog(new StudentModel())
    } else {
      this._studentService.findOne(student.id)
        .subscribe((completeStudent: StudentModel) => {
          this._openDialog(completeStudent)
        })
    }
  }

  public delete(student: SimpleStudent): void {
    this._studentService.remove(student.id)
      .subscribe({
        next: (response: HttpResponse<any>) => {
          this.students.splice(
            this.students.indexOf(student),
            1
          )
        }
      })
  }

  public multipleDelete(): void {
    this._studentService.removeStudents(this.checkedStudents)
      .pipe(
        take(1)
      ).subscribe((nonDeletedIds: Array<number>) => {
        this.checkedStudents.forEach((student: SimpleStudent) => {
          if (nonDeletedIds.filter((id: number) => id === student.id).length === 0) {
            this.students.splice(
              this.students.indexOf(student),
              1
            )
          }
        })
        this.checkedStudents = []
        this.checkUncheckAll = false
        this.onCheckUncheckAll()
      })
  }

  public byId(): void {
    this.students.sort((s1: SimpleStudent, s2: SimpleStudent) => (s1.id! - s2.id!) * this.byIdSortOrder)
    this.byIdSortOrder = this.byIdSortOrder * -1
    this.sortDefault = 'id'
  }

  public byLastname(): void {
    this.students.sort((s1: SimpleStudent, s2: SimpleStudent) => s1.lastName.localeCompare(s2.lastName) * this.byLastNameSortOrder)
    this.byLastNameSortOrder = this.byLastNameSortOrder * -1
    this.sortDefault = 'lastName'
  }

  public onSelectStudent(student: SimpleStudent): void {
    this.checkUncheckAll = this.students.filter((s: SimpleStudent) => s.isSelected).length === this.students.length

    this.checkedStudents = this.students.filter((s: SimpleStudent) => s.isSelected);
  }

  public onCheckUncheckAll(): void {
    this.students = this.students.map((s) => {
      return { ...s, isSelected: this.checkUncheckAll }
    })

    this.checkedStudents = this.students.filter((s: SimpleStudent) => s.isSelected);
  }

  private _openDialog(student: StudentModel): void {
    const dialogRef = this._matDialog.open(StudentFormComponent, {
      panelClass: "modalDialog",
      hasBackdrop: false,
      data: { student } // student is passed to dialog => {student: student}
    })

    dialogRef.afterClosed().subscribe((result: any) => { // student was received from dialog
      if (result) {
        // Convert StudentModel to SimpleStudent (or IStudent)
        const simpleStudent: SimpleStudent = {
          id: result.id,
          lastName: result.lastName,
          firstName: result.firstName,
          email: result.email,
          isSelected: false
        }
        // if student already exists in students : replace it
        const index: number = this.students.findIndex((student: SimpleStudent) => student.id === simpleStudent.id)
        if (index > -1) {
          this.students.splice(
            index,
            1,
            simpleStudent
          )
        } else {
          this.students.push(simpleStudent)
        }
        // else add it (and re sort table)
        this.students.sort((s1: SimpleStudent, s2: SimpleStudent) => s1.id - s2.id)
      } else {
        // console.log(`No result, lunch time`)
      }
    })
  }
}
