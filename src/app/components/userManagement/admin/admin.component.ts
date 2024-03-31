import {
  AfterViewInit,
  Component,
  OnInit,
  ChangeDetectorRef,
} from '@angular/core';
import { Admin } from '../../../util/domain/Admin';
import { AdminService } from '../../../service/api/admin.service';
import { MessageService, ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
  providers: [MessageService, ConfirmationService],
})
export class AdminComponent implements OnInit, AfterViewInit {
  entitys!: Admin[];
  entity!: Admin;
  selectedStatus!: { boolean: boolean; name: string };
  status: any[] = [
    { boolean: false, name: 'Disabled' },
    { boolean: true, name: 'Enabled' },
  ];
  loading: boolean = true;
  submitted: boolean = false;
  entityDialog: boolean = false;
  first = 0;
  rows = 10;
  displayedEntitys: Admin[] = [];
  filteredEntitys: Admin[] = [];
  itemsPerPage = 5;
  showConfirmDialog = false;
  adminToDelete: Admin | null = null;
  constructor(
    private adminService: AdminService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.adminService.getAllAdmins().subscribe(
      (data) => {
        this.entitys = data;
        this.filteredEntitys = data; 
        this.loading = false;
        this.updateDisplayedEntities();
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
 
  onSearch(event: Event): void {
    const target = event.target as HTMLInputElement;
    const searchValue = target.value.toLowerCase();

    this.filteredEntitys = this.entitys.filter(entity => 
        entity.email?.toLowerCase().includes(searchValue) ||
        entity.password?.toLowerCase().includes(searchValue) ||
        (entity.status ? 'Enabled' : 'Disabled').toLowerCase().includes(searchValue)
    );

    this.first = 0;
    this.updateDisplayedEntities();
  }
  get currentPage(): number {
    return Math.floor(this.first / this.itemsPerPage) + 1;
  }
  
  get totalPages(): number {
    return Math.ceil(this.filteredEntitys.length / this.itemsPerPage);
}
  next() {
    const nextFirst = this.first + this.itemsPerPage;
    if (nextFirst < this.filteredEntitys.length) {
        this.first = nextFirst;
        this.updateDisplayedEntities();
    }
}

prev() {
    const prevFirst = this.first - this.itemsPerPage;
    if (prevFirst >= 0) {
        this.first = prevFirst;
        this.updateDisplayedEntities();
    } else {
        this.first = 0;
        this.updateDisplayedEntities();
    }
}

updateDisplayedEntities() {
  const endIndex = this.first + this.itemsPerPage;
  this.displayedEntitys = this.filteredEntitys.slice(this.first, endIndex);
}
  reset() {
    this.first = 0;
    this.updateDisplayedEntities();
  }
  


  pageChange(event: any) {
    this.first = event.first;
    this.rows = event.rows;
  }

  isFirstPage(): boolean {
    return this.first === 0;
}

isLastPage(): boolean {
    return this.first + this.itemsPerPage >= this.filteredEntitys.length;
}

  openNew() {
    this.entity = {};
    this.submitted = false;
    this.entityDialog = true;
  }

  editEntity(admin: Admin) {
    admin.password = '';
    this.entity = { ...admin };
    this.entityDialog = true;
  }
  openConfirmDialog(admin: Admin) {
    this.adminToDelete = admin;
    this.showConfirmDialog = true;
  }

  cancelDelete() {
    this.showConfirmDialog = false;
    this.adminToDelete = null;
  }
  confirmDelete() {
    if (this.adminToDelete) {
      this.deleteEntity(this.adminToDelete);
      this.adminToDelete = null;
      this.showConfirmDialog = false;
    }
  }
  deleteEntity(admin: Admin) {
  
        this.adminService
          .deleteAdmin({
            id: admin.id,
          })
          .subscribe(
            (data: any) => {
              this.entitys = this.entitys.filter((val) => val.id !== admin.id);
              this.filteredEntitys = this.filteredEntitys.filter((val) => val.id !== admin.id);
              this.entity = {};
              this.messageService.add({
                severity: 'success',
                summary: 'Successful',
                detail: data.message,
                life: 3000,
              });
              this.updateDisplayedEntities();
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
     
    this.updateDisplayedEntities();
  }

  hideDialog() {
    this.entityDialog = false;
    this.submitted = false;
  }

  getStatus(status: boolean | undefined) {
    console.log(status);
    switch (status) {
      case true:
        return 'Enabled';
      case false:
        return 'Disabled';
      default:
        return 'Choisissez le statut';
    }
  }

  getSeverity(status: boolean | undefined) {
    switch (status) {
      case true:
        return 'success';
      case false:
        return 'error';
      default:
        return 'info';
    }
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
    console.log({
      id: this.entity.id,
      email: this.entity.email,
      password: this.entity.password,
      status: this.selectedStatus.boolean,
    });
    if (this.entity.email?.trim()) {
      const index: any = this.entity.id;
      if (this.entity.id) {
        console.log({
          id: this.entity.id,
          email: this.entity.email,
          password: this.entity.password,
          status: this.selectedStatus.boolean,
        });
        this.adminService
          .editAdmin({
            id: this.entity.id,
            email: this.entity.email,
            password: this.entity.password,
            status: this.selectedStatus.boolean,
          })
          .subscribe(
            (data: any) => {
              const index = this.findIndexById(data.id);
              if (index !== -1) {
                this.entitys[index] = data;
               
                this.updateDisplayedEntities();
              }
              this.messageService.add({
                severity: 'success',
                summary: 'Successful',
                detail: "L'Objet a été modifiée avec succès",
                life: 3000,
              });
              // this.entitys[this.findIndexById(index)] = {
              //   id: data.id,
              //   email: data.email,
              //   password: data.password,
              //   status: data.status,
              // };
              
              this.entitys = [...this.entitys];

            },
            (error) => {
              console.log(error);
              this.messageService.add({
                severity: 'error',
                summary: 'Failure',
                detail: "échec de la modification de l'objet sélectionné",
                life: 3000,
              });
            }
          );
      } else {
        this.adminService
          .addAdmin({
            id: null,
            email: this.entity.email,
            password: this.entity.password,
            status: this.selectedStatus.boolean,
          })
          .subscribe(
            (data: Admin) => {
              this.entitys = [...this.entitys, data];
              this.filteredEntitys = [...this.filteredEntitys, data];
              this.updateDisplayedEntities();
              this.entitys.push({
                id: data.id,
                email: data.email,
                password: data.password,
                status: data.status,
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
                detail: "échec de la ajoute de l'objet",
                life: 3000,
              });
            }
          );
      }
      
      this.entityDialog = false;
      this.entity = {};
    }
  }


}
