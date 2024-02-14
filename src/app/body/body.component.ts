import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Student } from './domain/Student';
import { StudentService } from './service/student.service';
import { Table } from 'primeng/table/table';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.scss'],
})
export class BodyComponent implements OnInit, AfterViewInit {
  students!: Student[];
  selectedStudents!: Student;
  cols!: any[];
  loading: boolean = true;

  constructor(private studentService: StudentService) {}

  ngOnInit() {
    this.cols = [
      { field: 'name', header: 'Name', filter: true },
      { field: 'codeMassar', header: 'Code Massar', filter: true },
      { field: 'formation', header: 'Formation', filter: true },
    ];
    this.studentService.getAllStudents().subscribe(
      (data) => {
        console.log(data);
        this.students = data;
        this.loading = false;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  ngAfterViewInit() {
    console.log(this.students);
  }

  clear(table: Table) {
    table.clear();
  }
}
