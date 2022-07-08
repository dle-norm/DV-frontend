import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { dataJson } from './interface/dataJson';
import { dataCategory } from './interface/dataCategories';
import { dataChart } from './interface/dataChart';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AppService {
  public selectedCategorie: number = 250162;
  public data: dataChart[] = [];
  constructor (private httpClient: HttpClient) {}

  /**
   * Get volume by date.
   * @param idCategorie
   */
  getVolumes (idCategorie: string): Observable<dataJson[]> {
    return this.httpClient.get<dataJson[]>(`assets/api/volumes/${idCategorie}.json`).pipe(
      map(response => response)
    );
  }

  /**
   * Get categories of keyword.
   */
  getCategories (): Observable<dataCategory[]> {
    return this.httpClient.get<dataCategory[]>('assets/api/categories.json').pipe(
      map(response => response)
    );
  }
}
