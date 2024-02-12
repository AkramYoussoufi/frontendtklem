import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Student } from './domain/Student';
import { StudentService } from './service/student.service';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.scss']
})
export class BodyComponent implements OnInit,AfterViewInit {
  
  students: Student[] | any;
  cols: any[] | undefined;

  constructor(private studentService:StudentService) {
    
  }

  ngOnInit() {
    this.cols = [
      { field: 'name', header: 'Name' },
      { field: 'codeMassar', header: 'Code Massar' },
      { field: 'formation', header: 'Formation' },
      { field: 'created', header: 'Created' }
  ];
    this.studentService.getAllStudents().subscribe(
      data => { 
        console.log(data);
        this.students = data;
      },
      error=>{ console.error(error) });
  }

  ngAfterViewInit() {
    console.log(this.students[0]);
  }

}
