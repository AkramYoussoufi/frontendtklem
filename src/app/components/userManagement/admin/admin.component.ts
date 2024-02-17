import {
  AfterViewInit,
  Component,
  OnInit,
  ChangeDetectorRef,
} from '@angular/core';
import { Admin } from '../../../util/domain/Admin';
import { AdminService } from '../../../service/api/admin.service';
import { Table } from 'primeng/table/table';
import { MessageService, ConfirmationService } from 'primeng/api';
import { FormationService } from '../../../service/api/formation.service';
import { Formation } from '../../../util/domain/Formation';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
  providers: [MessageService, ConfirmationService],
})
export class AdminComponent implements OnInit, AfterViewInit {
  entitys!: Admin[];
  entity!: Admin;
  selectedEntitys!: Admin[] | null;
  cols!: any[];
  status: any[] = ['Disabled', 'Enabled'];
  loading: boolean = true;
  submitted: boolean = false;
  entityDialog: boolean = false;
  first = 0;
  rows = 10;

  constructor(
    private adminService: AdminService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private formationService: FormationService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.cols = [
      { field: 'email', header: 'Admin Name', filter: true },
      { field: 'password', header: 'Password', filter: true },
      { field: 'status', header: 'Status', filter: true },
    ];
    this.adminService.getAllAdmins().subscribe(
      (data) => {
        console.log(data);
        this.entitys = data;
        this.loading = false;
      },
      (error) => {
        this.loading = false;
        this.messageService.add({
          severity: 'error',
          summary: 'Failure',
          detail: error.message,
          life: 3000,
        });
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
    return this.entitys ? this.first === this.entitys.length - this.rows : true;
  }

  isFirstPage(): boolean {
    return this.entitys ? this.first === 0 : true;
  }

  openNew() {
    this.entity = {};
    this.submitted = false;
    this.entityDialog = true;
  }

  editEntity(admin: Admin) {
    this.entity = { ...admin };
    this.entityDialog = true;
  }

  deleteEntity(admin: Admin) {
    this.confirmationService.confirm({
      message: 'Etes-vous sûr que vous voulez supprimer ' + admin.email + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.adminService
          .deleteAdmin({
            id: admin.id,
          })
          .subscribe(
            (data: any) => {
              this.entitys = this.entitys.filter((val) => val.id !== admin.id);
              this.entity = {};
              this.messageService.add({
                severity: 'success',
                summary: 'Successful',
                detail: data.message,
                life: 3000,
              });
            },
            (error) => {
              this.entity = {};
              this.messageService.add({
                severity: 'error',
                summary: 'Failure',
                detail: error.error.message,
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
    for (let i = 0; i < this.entitys.length; i++) {
      if (this.entitys[i].id === id) {
        index = i;
        break;
      }
    }

    return index;
  }

  saveProduct() {
    this.submitted = true;

    if (this.entity.email?.trim()) {
      const index: any = this.entity.id;
      if (this.entity.id) {
        this.adminService.editAdmin(this.entity).subscribe(
          (data: any) => {
            this.messageService.add({
              severity: 'success',
              summary: 'Successful',
              detail: "L'Objet a été modifiée avec succès",
              life: 3000,
            });
            this.entitys[this.findIndexById(index)] = {
              /*id: data.id,
              name: data.name,
              massarCode: data.massarCode,
              formationName: data.formation.name,*/
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
        this.adminService.addAdmin(this.entity).subscribe(
          (data: any) => {
            this.entitys.push({
              /*               id: data.id,
              name: data.name,
              massarCode: data.massarCode,
              formationName: data.formation.name, */
            });
            this.messageService.add({
              severity: 'success',
              summary: 'Successful',
              detail: 'Admin Created',
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

      this.entitys = [...this.entitys];
      this.entityDialog = false;
      this.entity = {};
    }
  }

  clear(table: Table) {
    table.clear();
  }
}
