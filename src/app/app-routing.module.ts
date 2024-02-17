import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './components/userManagement/admin/admin.component';
import { ParentComponent } from './components/userManagement/parent/parent.component';
import { RecepteurComponent } from './components/userManagement/recepteur/recepteur.component';
import { RecieverComponent } from './components/userManagement/reciever/reciever.component';
import { ApprovalsComponent } from './components/approvals/approvals.component';
import { StudentsComponent } from './components/students/students.component';
import { FormationComponent } from './components/formation/formation.component';

const routes: Routes = [
  { path: '', component: AdminComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'parent', component: ParentComponent },
  { path: 'recepteur', component: RecepteurComponent },
  { path: 'reciever', component: RecieverComponent },
  { path: 'approbation', component: ApprovalsComponent },
  { path: 'etudiants', component: StudentsComponent },
  { path: 'classes', component: FormationComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
