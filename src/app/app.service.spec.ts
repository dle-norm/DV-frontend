import { HttpClient } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { lastValueFrom, of } from 'rxjs';
import { AppService } from './app.service';
import { dataCategory } from './interface/dataCategories';
import { dataJson } from './interface/dataJson';

describe('AppService', () => {
  let service: AppService;
  const expectedResult: dataJson[] = [{
    volume: 26586,
    date: '2022'
  }];
  const expectedResult2: dataCategory[] = [{
    id: 26586,
    name: '2022',
    nbKeywords: 2000,
    depth: 2,
    ancestors: []
  }];
  const provide = (mock: any): any => mock;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppService],
      providers: [
        HttpClient
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  });

  it('Init test : should create', () => {
    const httpMock = { get: jest.fn(() => of(expectedResult)) };
    service = new AppService(provide(httpMock));
    expect(service).toBeTruthy();
  });

  it('API test : should get assets volumes', async () => {
    const httpMock = { get: jest.fn(() => of(expectedResult)) };
    service = new AppService(provide(httpMock));
    const volumes$ = service.getVolumes('250162.json');
    expect(await lastValueFrom(volumes$)).toMatchObject(expectedResult);
  });

  it('API test : should get assets categories', async () => {
    const httpMock = { get: jest.fn(() => of(expectedResult2)) };
    service = new AppService(provide(httpMock));
    const categories$ = service.getCategories();
    expect(await lastValueFrom(categories$)).toMatchObject(expectedResult2);
  });
});
