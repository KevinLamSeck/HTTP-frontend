import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, take, tap } from 'rxjs';
import { MediaType } from 'src/app/course/types/media-type';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class MediaService {
  public readonly endpoint: string = `${environment.apiRootUri}medias`;

  constructor(private _httpClient: HttpClient) { }

  public findAll(): Observable<MediaType[]> {
    return this._httpClient.get<MediaType[]>(this.endpoint);
  }

  // http://localhost:5000/api/v1/medias/creator/{id}
  public findByCreator(creatorId: number): Observable<MediaType[]> {
    return this._httpClient.get<MediaType[]>(
      `${this.endpoint}/creator/${creatorId}`
    );
  }

  public findOne(id: number): Observable<MediaType> {
    return this._httpClient.get<any>(this.endpoint + '/' + id).pipe(
      tap((response: any) => {
        // // console.log(JSON.stringify(response))
      }),
      take(1),
      map((media: any) => media)
    );
  }

  public add(media: MediaType): Observable<any> {
    return this._httpClient.post<MediaType>(this.endpoint, media);
  }

  public update(media: MediaType): Observable<any> {
    return this._httpClient.put<MediaType>(
      this.endpoint + '/' + media.id,
      media,
      {
        observe: 'response',
      }
    );
  }

  public remove(id: number): Observable<HttpResponse<any>> {
    return this._httpClient.delete<MediaType>(this.endpoint + '/' + id, {
      observe: 'response',
    });
  }
}
