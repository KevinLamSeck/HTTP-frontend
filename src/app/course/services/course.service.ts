import { HttpClient, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { CourseListType } from "../types/course-list-type";
import { CourseType } from "../types/course-type";
import { environment } from "./../../../environments/environment";
@Injectable({
  providedIn: "root",
})
export class CourseService {
  public readonly endPoint: string = `${environment.apiRootUri}course`;

  constructor(private _httpClient: HttpClient) {}

  public findFullCourses(): Observable<CourseListType[]> {
    return this._httpClient.get<CourseListType[]>(this.endPoint);
  }

  add(value: any): Observable<CourseType> {
    // console.log(value);
    return this._httpClient.post<any>(this.endPoint, value);
  }
  update(value: any): Observable<CourseType> {
    return this._httpClient.post<any>(this.endPoint + "/update", value);
  }

  copyCourse(course: CourseListType): Observable<CourseType> {
    // console.log(course);
    return this._httpClient.post<any>(this.endPoint, course);
  }

  public remove(id: number): Observable<HttpResponse<any>> {
    return this._httpClient.delete<CourseListType>(`${this.endPoint}/${id}`, {
      observe: "response",
    });
  }
}
