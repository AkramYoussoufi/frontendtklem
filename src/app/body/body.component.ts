import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Student } from '../domain/Student';
import { StudentService } from '../service/student.service';
import { Table } from 'primeng/table/table';
import {
  MessageService,
  ConfirmationService,
  LazyLoadEvent,
} from 'primeng/api';
import { FormationService } from '../service/formation.service';
import { Formation } from '../domain/Formation';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.scss'],
  providers: [MessageService, ConfirmationService],
})
export class BodyComponent implements OnInit, AfterViewInit {
  students!: Student[];
  student!: Student;
  selectedStudents!: Student[] | null;
  cols!: any[];
  formations: any[] = [];
  loading: boolean = true;
  submitted: boolean = false;
  entityDialog: boolean = false;
  first = 0;
  rows = 10;

  constructor(
    private studentService: StudentService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private formationService: FormationService
  ) {}

  ngOnInit() {
    this.cols = [
      { field: 'name', header: 'Name', filter: true },
      { field: 'codeMassar', header: 'Code Massar', filter: true },
      { field: 'formation', header: 'Formation', filter: true },
    ];
    this.studentService.getAllStudents().subscribe(
      (data) => {
        this.students = data;
        this.loading = false;
      },
      (error) => {
        console.error(error);
      }
    );
    this.formationService.getAllFormations().subscribe(
      (data) => {
        data.forEach((type: Formation) => {
          console.log(type.name);
          this.formations.push(type.name);
        });
        console.log(this.formations);
      },
      (error) => {
        console.error(error);
      }
    );
  }

  ngAfterViewInit() {}

  next() {
    this.first = this.first + this.rows;
  }

  prev() {
    this.first = this.first - this.rows;
  }

  reset() {
    this.first = 0;
  }

  pageChange(event: any) {
    this.first = event.first;
    this.rows = event.rows;
  }

  isLastPage(): boolean {
    return this.students
      ? this.first === this.students.length - this.rows
      : true;
  }

  isFirstPage(): boolean {
    return this.students ? this.first === 0 : true;
  }

  deleteSelectedStudents() {
    this.confirmationService.confirm({
      message: 'Êtes-vous sûr de vouloir supprimer les étudiants sélectionnés?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.students = this.students.filter(
          (val) => !this.selectedStudents?.includes(val)
        );
        this.selectedStudents = null;
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Selected Student Deleted',
          life: 3000,
        });
      },
    });
  }

  openNew() {
    this.student = {};
    this.submitted = false;
    this.entityDialog = true;
  }

  editStudent(student: Student) {
    this.student = { ...student };
    this.entityDialog = true;
  }

  deleteStudent(student: Student) {
    this.confirmationService.confirm({
      message: 'Etes-vous sûr que vous voulez supprimer ' + student.name + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.students = this.students.filter((val) => val.id !== student.id);
        this.student = {};
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Student Deleted',
          life: 3000,
        });
      },
    });
  }

  hideDialog() {
    this.entityDialog = false;
    this.submitted = false;
  }

  findIndexById(id: number): number {
    let index = -1;
    for (let i = 0; i < this.students.length; i++) {
      if (this.students[i].id === id) {
        index = i;
        break;
      }
    }

    return index;
  }

  saveProduct() {
    this.submitted = true;

    if (this.student.name?.trim()) {
      if (this.student.id) {
        this.students[this.findIndexById(this.student.id)] = this.student;
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Student Updated',
          life: 3000,
        });
      } else {
        this.students.push(this.student);
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Student Created',
          life: 3000,
        });
      }

      this.students = [...this.students];
      this.entityDialog = false;
      this.student = {};
    }
  }

  clear(table: Table) {
    table.clear();
  }
}
