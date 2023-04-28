import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, take, tap } from 'rxjs';
import { ModuleType } from 'src/app/course/types/module-type';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ModuleService {

  public readonly endpoint: string = `${environment.apiRootUri}modules`

  constructor(private _httpClient: HttpClient) { }

  public findAll(): Observable<ModuleType[]> {
    return this._httpClient.get<ModuleType[]>(
      this.endpoint
    )
  }

  public findByCreator(creatorId: number): Observable<ModuleType[]> {
    return this._httpClient.get<ModuleType[]>(
      `${this.endpoint}/creator/${creatorId}`
    )
  }

  public add(module: ModuleType): Observable<any> {
    return this._httpClient.post<ModuleType>(
      this.endpoint,
      module
    )
  }

  public findOne(id: number): Observable<ModuleType> {
    return this._httpClient.get<any>(
      this.endpoint + '/' + id
    )
      .pipe(
        tap((response: any) => {
          // // console.log(JSON.stringify(response))
        }),
        take(1),
        map((module: any) => module)
      )
  }

  public update(module: ModuleType): Observable<HttpResponse<any>> {
    return this._httpClient.put<ModuleType>(
      this.endpoint,
      module,
      {
        observe: 'response'
      }
    )
  }

  public delete(id: number): Observable<HttpResponse<any>> {
    return this._httpClient.delete<ModuleType>(
      this.endpoint + '/' + id,
      {
        observe: 'response'
      }
    )
  }
}
