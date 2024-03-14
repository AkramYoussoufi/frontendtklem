import { ChangeDetectorRef, Component } from '@angular/core';
import { MessageService, ConfirmationService } from 'primeng/api';
import { Table } from 'primeng/table';
import { FormationService } from 'src/app/service/api/formation.service';
import { StudentService } from 'src/app/service/api/student.service';
import { Formation } from 'src/app/util/domain/Formation';
import { Student } from 'src/app/util/domain/Student';

@Component({
  selector: 'app-studentlog',
  templateUrl: './studentlog.component.html',
  styleUrls: ['./studentlog.component.scss'],
})
export class StudentlogComponent {
  entitys!: Student[];
  entity!: Student;
  selectedEntitys!: Student[] | null;
  cols!: any[];
  formations: any[] = [];
  loading: boolean = true;
  submitted: boolean = false;
  entityDialog: boolean = false;
  first = 0;
  rows = 10;

  constructor(
    private studentService: StudentService,
    private formationService: FormationService
  ) {}

  ngOnInit() {
    this.cols = [
      { field: 'name', header: "Nom d'étudiant", filter: true },
      { field: 'massarCode', header: 'Massar Code', filter: true },
      { field: 'formationName', header: 'Formation', filter: true },
      { field: 'date', header: 'Date de départ', filter: true },
    ];
    this.studentService.getAllStudentLogs().subscribe(
      (data) => {
        this.entitys = data;
        this.loading = false;
      },
      (error) => {
        this.loading = false;
      }
    );
    this.formationService.getAllFormations().subscribe(
      (data) => {
        data.forEach((type: Formation) => {
          this.formations.push(type.name);
        });
      },
      (error) => {}
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
    return this.entitys ? this.first === this.entitys.length - this.rows : true;
  }

  isFirstPage(): boolean {
    return this.entitys ? this.first === 0 : true;
  }

  clear(table: Table) {
    table.clear();
  }
}
