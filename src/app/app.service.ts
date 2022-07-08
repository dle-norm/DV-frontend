import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { dataJson } from './interface/dataJson';

@Injectable({
  providedIn: 'root'
})

export class AppService {
  constructor (private httpClient: HttpClient) {}

  getVolumes (name: string): Observable<dataJson[]> {
    return this.httpClient.get<dataJson[]>(`assets/api/volumes/${name}`).pipe(
      map(response => response)
    );
  }
}
