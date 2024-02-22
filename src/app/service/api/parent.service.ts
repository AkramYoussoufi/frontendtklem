import { Injectable } from '@angular/core';
import { Environement } from 'src/Environement';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Parent } from '../../util/domain/Parent';

@Injectable({
  providedIn: 'root',
})
export class ParentService {
  headers: HttpHeaders = new HttpHeaders();
  constructor(private http: HttpClient) {
    this.headers = this.headers
      .set('Content-Type', 'application/json')
      .set('Authorization', 'Bearer ' + Environement.token);
  }

  getAllParents() {
    return this.http.get<Parent[]>(
      Environement.URL_API + 'api/admin/parent/all',
      {
        headers: this.headers,
      }
    );
  }
  addParent(data: any) {
    return this.http.post(Environement.URL_API + 'api/admin/parent/add', data, {
      headers: this.headers,
    });
  }
  deleteParent(data: any) {
    return this.http.post(
      Environement.URL_API + 'api/admin/parent/delete',
      data,
      {
        headers: this.headers,
      }
    );
  }

  deleteAllParents(data: any) {
    return this.http.post(
      Environement.URL_API + 'api/admin/parent/deleteall',
      data,
      {
        headers: this.headers,
      }
    );
  }

  editParent(data: any) {
    return this.http.post(
      Environement.URL_API + 'api/admin/parent/edit',
      data,
      {
        headers: this.headers,
      }
    );
  }
}
