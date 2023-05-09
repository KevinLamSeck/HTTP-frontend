import { HttpClient, HttpEvent, HttpEventType, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {
  private _endpoint = `${environment.uploadRootUri}`

  constructor(private _httpClient: HttpClient) { }

  uploadFile(file: File): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();
    formData.append('file', file);

    const request = new HttpRequest('POST', `${this._endpoint}upload`, formData, {
      reportProgress: true,
      responseType: 'json'
    });

    return this._httpClient.request(request).pipe(
      map((event: HttpEvent<any>) => {
        if (event.type === HttpEventType.Response) {
          return event.body.url;
        }
        return null;
      })
    );
  }

  getFiles(): Observable<any> {
    return this._httpClient.get(`${this._endpoint}/files`);
  }
}
