//Angular Modules
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';

//Routing Modules
import { AppRoutingModule } from './app-routing.module';

//Styling Modules
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonModule } from 'primeng/button';
import { MenubarModule } from 'primeng/menubar';
import { PanelMenuModule } from 'primeng/panelmenu';
import { TableModule } from 'primeng/table';

//Components
import { AppComponent } from './app.component';
import { HeaderComponent } from './layout/header/header.component';
import { SidenavbarComponent } from './layout/sidenavbar/sidenavbar.component';
import { BodyComponent } from './layout/body/body.component';
import { CheckboxModule } from 'primeng/checkbox';

//NGPrime Modules
import { AvatarModule } from 'primeng/avatar';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DataViewModule } from 'primeng/dataview';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { FileUploadModule } from 'primeng/fileupload';
import { MessageModule } from 'primeng/message';
import { MessagesModule } from 'primeng/messages';
import { MultiSelectModule } from 'primeng/multiselect';
import { PasswordModule } from 'primeng/password';
import { TagModule } from 'primeng/tag';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { CardModule } from 'primeng/card';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { AdminComponent } from './components/userManagement/admin/admin.component';
import { RecepteurComponent } from './components/userManagement/recepteur/recepteur.component';
import { ApprovalsComponent } from './components/approvals/approvals.component';
import { StudentsComponent } from './components/students/students.component';
import { FormationComponent } from './components/formation/formation.component';
import { ParentComponent } from './components/userManagement/parent/parent.component';
import { RecieverComponent } from './components/userManagement/reciever/reciever.component';
import { LoginComponent } from './auth/login/login.component';
import { CookieService } from 'ngx-cookie-service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { RecieverCallComponent } from './recievercall/recievercall.component';
import { WebsocketService } from './service/socket/websocket.service';
import { StudentlogComponent } from './components/studentlog/studentlog.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidenavbarComponent,
    BodyComponent,
    AdminComponent,
    RecepteurComponent,
    ApprovalsComponent,
    StudentsComponent,
    FormationComponent,
    ParentComponent,
    RecieverComponent,
    LoginComponent,
    RecieverCallComponent,
    StudentlogComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    FontAwesomeModule,
    ButtonModule,
    MenubarModule,
    PanelMenuModule,
    TableModule,
    HttpClientModule,
    CheckboxModule,
    ToastModule,
    ToolbarModule,
    FileUploadModule,
    MessageModule,
    MessagesModule,
    ConfirmDialogModule,
    TagModule,
    DialogModule,
    DropdownModule,
    PasswordModule,
    MultiSelectModule,
    MessageModule,
    DataViewModule,
    AvatarModule,
    ProgressSpinnerModule,
    CardModule,
  ],
  providers: [
    CookieService,
    MessageService,
    ConfirmationService,
    WebsocketService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
