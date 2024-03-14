import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './components/userManagement/admin/admin.component';
import { ParentComponent } from './components/userManagement/parent/parent.component';
import { RecepteurComponent } from './components/userManagement/recepteur/recepteur.component';
import { RecieverComponent } from './components/userManagement/reciever/reciever.component';
import { ApprovalsComponent } from './components/approvals/approvals.component';
import { StudentsComponent } from './components/students/students.component';
import { FormationComponent } from './components/formation/formation.component';
import { BodyComponent } from './layout/body/body.component';
import { LoginComponent } from './auth/login/login.component';
import { MyGuardGuard } from './auth/login/my-guard.guard';
import { RecieverCallComponent } from './recievercall/recievercall.component';
import { StudentlogComponent } from './components/studentlog/studentlog.component';
const routes: Routes = [
  {
    path: 'dashboard',
    component: BodyComponent,
    canActivate: [MyGuardGuard],
    children: [
      { path: '', redirectTo: 'auth', pathMatch: 'full' },
      { path: 'admin', component: AdminComponent },
      { path: 'parent', component: ParentComponent },
      { path: 'recepteur', component: RecepteurComponent },
      { path: 'reciever', component: RecieverComponent },
      { path: 'approbation', component: ApprovalsComponent },
      { path: 'etudiants', component: StudentsComponent },
      { path: 'classes', component: FormationComponent },
      { path: 'etudiantslog', component: StudentlogComponent },
    ],
  },
  {
    path: 'reciever',
    component: RecieverCallComponent,
    canActivate: [MyGuardGuard],
  },
  // Other routes
  { path: 'login', component: LoginComponent },
  // Redirect any invalid route to the dashboard
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  // Handle wildcard routes or 404
  { path: '**', redirectTo: 'dashboard' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
