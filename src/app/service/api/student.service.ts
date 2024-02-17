import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Student } from '../../util/domain/Student';
import { Environement } from 'src/Environement';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  headers: HttpHeaders = new HttpHeaders();
  constructor(private http: HttpClient) {
    this.headers = this.headers
      .set('Content-Type', 'application/json')
      .set('Authorization', 'Bearer ' + Environement.token);
  }

  getAllStudents() {
    return this.http.get<Student[]>(
      Environement.URL_API + 'api/admin/student/all',
      {
        headers: this.headers,
      }
    );
  }
  addStudent(data: any) {
    return this.http.post(
      Environement.URL_API + 'api/admin/student/add',
      data,
      {
        headers: this.headers,
      }
    );
  }
  deleteStudent(data: any) {
    return this.http.post(
      Environement.URL_API + 'api/admin/student/delete',
      data,
      {
        headers: this.headers,
      }
    );
  }
  deleteAllStudent(data: any) {
    return this.http.post(
      Environement.URL_API + 'api/admin/student/deleteall',
      data,
      {
        headers: this.headers,
      }
    );
  }
  editStudent(data: any) {
    return this.http.post(
      Environement.URL_API + 'api/admin/student/edit',
      data,
      {
        headers: this.headers,
      }
    );
  }
}
