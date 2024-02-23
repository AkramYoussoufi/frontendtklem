import { ChangeDetectorRef, Component } from '@angular/core';
import { Formation } from '../../util/domain/Formation';
import { FormationService } from '../../service/api/formation.service';
import { MessageService, ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-formation',
  templateUrl: './formation.component.html',
  styleUrls: ['./formation.component.scss'],
  providers: [MessageService],
})
export class FormationComponent {
  formations!: Formation[];
  formation!: Formation;
  submitted: boolean = false;
  entityDialog: boolean = false;

  constructor(
    private formationService: FormationService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.formationService.getAllFormations().subscribe(
      (data) => {
        this.formations = data;
      },
      (error) => {}
    );
  }

  openNew() {
    this.formation = {};
    this.submitted = false;
    this.entityDialog = true;
  }
  hideDialog() {
    this.entityDialog = false;
    this.submitted = false;
  }

  getFirstLetterUpperCase(name: string): string {
    if (name.length === 0) {
      return 'N';
    }
    return name.charAt(0).toUpperCase();
  }
  editEntity(formation: any) {
    this.formation = { ...formation };
    this.entityDialog = true;
  }

  deleteSelectedEntitys() {
    this.confirmationService.confirm({
      message: 'Etes-vous sûr que vous voulez supprimer Tout ?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.formationService.deleteAllFormations().subscribe(
          (data) => {
            this.formations = [];
            this.messageService.add({
              severity: 'success',
              summary: 'Successful',
              detail: 'Tout les formations sont supprime avec successe',
              life: 3000,
            });
          },
          (error) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Failure',
              detail:
                'Vous ne pouvez pas supprimer une formation attribuée à un étudiant.',
              life: 3000,
            });
          }
        );
      },
    });
  }
  deleteEntity(formation: any) {
    this.confirmationService.confirm({
      message:
        'Etes-vous sûr que vous voulez supprimer ' + formation.name + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.formationService
          .deleteFormation({
            id: formation.id,
          })
          .subscribe(
            (data: any) => {
              this.formations = this.formations.filter(
                (val) => val.id !== formation.id
              );
              this.formation = {};
              this.messageService.add({
                severity: 'success',
                summary: 'Successful',
                detail: 'Formation supprime avec successe',
                life: 3000,
              });
            },
            (error) => {
              this.formation = {};
              this.messageService.add({
                severity: 'error',
                summary: 'Failure',
                detail:
                  'Vous ne pouvez pas supprimer une formation attribuée à un étudiant.',
                life: 3000,
              });
            }
          );
      },
    });
  }

  saveProduct() {
    this.submitted = true;

    if (this.formation.name?.trim()) {
      const index: any = this.formation.id;
      if (this.formation.id) {
        this.formationService.editFormation(this.formation).subscribe(
          (data: any) => {
            console.log({
              id: data.id,
              name: data.name,
              index: this.findIndexById(index),
            });
            console.log(this.formations);
            this.formations[this.findIndexById(index)] = {
              id: data.id,
              name: data.name,
            };
            this.formations = [...this.formations];
            this.messageService.add({
              severity: 'success',
              summary: 'Successful',
              detail: "L'Objet a été modifiée avec succès",
              life: 3000,
            });
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
        console.log(this.formation);
        this.formationService
          .addFormation({ id: null, name: this.formation.name })
          .subscribe(
            (data: any) => {
              this.formations.push({
                id: data.id,
                name: data.name,
              });
              this.formations = [...this.formations];
              this.messageService.add({
                severity: 'success',
                summary: 'Successful',
                detail: 'Formation Ajoute',
                life: 3000,
              });
            },
            (error) => {
              this.messageService.add({
                severity: 'error',
                summary: 'Failure',
                detail:
                  "Quelque chose s'est produit lors de la tentative d'ajout d'une formation",
                life: 3000,
              });
            }
          );
      }
      this.entityDialog = false;
      this.formation = {};
    }
  }

  findIndexById(id: number): number {
    let index = -1;
    for (let i = 0; i < this.formations.length; i++) {
      if (this.formations[i].id === id) {
        index = i;
        break;
      }
    }

    return index;
  }
}
