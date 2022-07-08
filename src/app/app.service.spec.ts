import { HttpClient } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { lastValueFrom, of } from 'rxjs';
import { AppService } from './app.service';
import { dataJson } from './interface/dataJson';

describe('AppService', () => {
  let service: AppService;
  const expectedResult: dataJson[] = [{
    volume: 26586,
    date: '2022'
  }];
  const httpMock = { get: jest.fn(() => of(expectedResult)) };
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

  beforeEach(() => {
    service = new AppService(provide(httpMock));
  });

  it('Init test : should create', () => {
    expect(service).toBeTruthy();
  });

  it('API test : should get assets', async () => {
    const volumes$ = service.getVolumes('250162.json');
    expect(await lastValueFrom(volumes$)).toMatchObject(expectedResult);
  });
});
