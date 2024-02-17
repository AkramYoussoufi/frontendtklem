import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Admin } from '../../util/domain/Admin';
import { Environement } from 'src/Environement';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  headers: HttpHeaders = new HttpHeaders();
  constructor(private http: HttpClient) {
    this.headers = this.headers
      .set('Content-Type', 'application/json')
      .set('Authorization', 'Bearer ' + Environement.token);
  }

  getCurrentLoggedUser() {
    return this.http.get<Admin>(Environement.URL_API + 'api/currentuser', {
      headers: this.headers,
    });
  }

  getAllAdmins() {
    return this.http.get<Admin[]>(Environement.URL_API + 'api/admin/user/all', {
      headers: this.headers,
    });
  }
  addAdmin(data: any) {
    return this.http.post(Environement.URL_API + 'api/admin/user/add', data, {
      headers: this.headers,
    });
  }
  deleteAdmin(data: any) {
    return this.http.post(
      Environement.URL_API + 'api/admin/user/delete',
      data,
      {
        headers: this.headers,
      }
    );
  }

  editAdmin(data: any) {
    return this.http.post(Environement.URL_API + 'api/admin/Admin/edit', data, {
      headers: this.headers,
    });
  }
}
