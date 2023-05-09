import { HttpClient, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, map, take, tap } from "rxjs";
import { IStudent } from "../interfaces/i-student";
import { StudentModel } from "../models/student-model";
import { SimpleStudent } from "../types/simple-student-type";

import { environment } from "./../../../environments/environment";
@Injectable({
  providedIn: "root",
})
export class StudentService {
  private readonly endpoint: string = `${environment.apiRootUri}students`;

  constructor(
    private _httpClient: HttpClient // DI Angular
  ) {}

  /**
   * Send a GET request to http://127.0.0.1:5000/api/v1/students
   * @returns Observable<IStudent>
   */
  public findAll(): Observable<IStudent[]> {
    return this._httpClient.get<IStudent[]>(this.endpoint);
  }

  public findSimpleStudents(): Observable<SimpleStudent[]> {
    return this._httpClient.get<SimpleStudent[]>(this.endpoint + "/dto");
  }

  public findOne(id: number): Observable<StudentModel> {
    return this._httpClient.get<any>(this.endpoint + "/" + id).pipe(
      tap((response: any) => {
        // console.log(JSON.stringify(response))
      }),
      take(1),
      map((student: any) => student)
    );
  }

  public findByEmail(email: string): void {}

  public findByLoginOrEmail(email: string, login: string): void {}

  public add(student: IStudent): Observable<any> {
    return this._httpClient.post<IStudent>(this.endpoint, student);
  }

  public update(student: StudentModel): Observable<HttpResponse<any>> {
    return this._httpClient.put<StudentModel>(this.endpoint, student, {
      observe: "response",
    });
  }

  public remove(id: number): Observable<HttpResponse<any>> {
    return this._httpClient.delete<StudentModel>(`${this.endpoint}/${id}`, {
      observe: "response",
    });
  }

  public removeStudents(
    students: Array<SimpleStudent>
  ): Observable<Array<number>> {
    return this._httpClient.request<Array<number>>(
      "delete",
      `${this.endpoint}`,
      {
        body: students
          .filter((s: SimpleStudent) => s.isSelected)
          .map((s: SimpleStudent) => s.id),
      }
    );
  }
}
