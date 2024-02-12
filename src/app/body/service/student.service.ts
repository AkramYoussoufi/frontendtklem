import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Student } from '../domain/Student';
import { Environement } from 'src/Environement';

@Injectable({
  providedIn:'root'
})
export class StudentService {
    constructor(private http: HttpClient) {
    }
    
    getAllStudents(){
      
      const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', 'Bearer ' + Environement.token);
      
      return this.http.get<Student[]>(Environement.URL_API + 'api/admin/student/all',{
        headers:headers
      })
    }
}
