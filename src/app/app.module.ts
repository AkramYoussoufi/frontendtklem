//Angular Modules
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

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
import { HeaderComponent } from './header/header/header.component';
import { SidenavbarComponent } from './sidenavbar/sidenavbar/sidenavbar.component';
import { BodyComponent } from './body/body.component';
import { CheckboxModule } from 'primeng/checkbox';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidenavbarComponent,
    BodyComponent,
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
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
