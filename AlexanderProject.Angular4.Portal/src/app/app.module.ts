import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppRoutes } from "./application-routes";

import { AppComponent } from './app.component';
import { AboutComponent } from './home/about.component';
import { ContactComponent } from './home/contact.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './home/login.component';
import { RegisterComponent } from './home/register.component';
import { FooterComponent } from './shared/footer.component';
import { SharedModule } from './shared/shared.module';
import { UserProfileComponent } from './user/user-profile.component';
import { AuthorizationGuard } from "./authorization-guard";
import { SessionService } from "./services/session.service";

@NgModule({
    declarations: [
        AppComponent,
        AboutComponent,
        ContactComponent,
        HomeComponent,
        LoginComponent,
        RegisterComponent,
        FooterComponent,       
        UserProfileComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        SharedModule,       
        RouterModule.forRoot(AppRoutes)
    ],     
    providers: [SessionService,AuthorizationGuard],
    bootstrap: [AppComponent]
})
export class AppModule { }
