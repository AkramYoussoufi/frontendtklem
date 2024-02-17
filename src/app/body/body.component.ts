import {
  AfterViewInit,
  Component,
  OnInit,
  ChangeDetectorRef,
} from '@angular/core';
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
    private formationService: FormationService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.cols = [
      { field: 'name', header: 'Nom', filter: true },
      { field: 'massarCode', header: 'Massar Code', filter: true },
      { field: 'formationName', header: 'Formation', filter: true },
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
          this.formations.push(type.name);
        });
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
    const extractedIds = this.selectedStudents?.map((student) => student.id);
    this.confirmationService.confirm({
      message: 'Êtes-vous sûr de vouloir supprimer les étudiants sélectionnés?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.studentService.deleteAllStudent(extractedIds).subscribe(
          (data: any) => {
            this.students = this.students.filter(
              (val) => !this.selectedStudents?.includes(val)
            );
            this.selectedStudents = null;
            this.messageService.add({
              severity: 'success',
              summary: 'Successful',
              detail: data.message,
              life: 3000,
            });
          },
          (error) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Failure',
              detail: "échec de la suppression de l'objet sélectionné",
              life: 3000,
            });
          }
        );
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
        this.studentService
          .deleteStudent({
            id: student.id,
          })
          .subscribe(
            (data: any) => {
              this.students = this.students.filter(
                (val) => val.id !== student.id
              );
              this.student = {};
              this.messageService.add({
                severity: 'success',
                summary: 'Successful',
                detail: data.message,
                life: 3000,
              });
            },
            (error) => {
              this.student = {};
              this.messageService.add({
                severity: 'error',
                summary: 'Failure',
                detail: error.message,
                life: 3000,
              });
            }
          );
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
      const index: any = this.student.id;
      if (this.student.id) {
        this.studentService.editStudent(this.student).subscribe(
          (data: any) => {
            this.messageService.add({
              severity: 'success',
              summary: 'Successful',
              detail: "L'Objet a été modifiée avec succès",
              life: 3000,
            });
            this.students[this.findIndexById(index)] = {
              id: data.id,
              name: data.name,
              massarCode: data.massarCode,
              formationName: data.formation.name,
            };
          },
          (error) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Failure',
              detail: "échec de la modification de l'objet sélectionné",
              life: 3000,
            });
          }
        );
      } else {
        this.studentService.addStudent(this.student).subscribe(
          (data: any) => {
            this.students.push({
              id: data.id,
              name: data.name,
              massarCode: data.massarCode,
              formationName: data.formation.name,
            });
            this.messageService.add({
              severity: 'success',
              summary: 'Successful',
              detail: 'Student Created',
              life: 3000,
            });
          },
          (error) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Failure',
              detail: error.error.message,
              life: 3000,
            });
          }
        );
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
