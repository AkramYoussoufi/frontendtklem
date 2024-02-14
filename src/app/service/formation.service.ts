import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Environement } from 'src/Environement';
import { Formation } from '../domain/Formation';

@Injectable({
  providedIn: 'root',
})
export class FormationService {
  constructor(private http: HttpClient) {}

  getAllFormations() {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', 'Bearer ' + Environement.token);

    return this.http.get<Formation[]>(
      Environement.URL_API + 'api/admin/formation/all',
      {
        headers: headers,
      }
    );
  }
}
