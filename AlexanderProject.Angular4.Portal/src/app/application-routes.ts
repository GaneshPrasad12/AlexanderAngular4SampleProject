import { Routes } from '@angular/router';
import { AboutComponent } from './home/about.component';
import { RegisterComponent } from './home/register.component';
import { LoginComponent } from './home/login.component';
import { ContactComponent } from './home/contact.component';
import { HomeComponent } from './home/home.component';
import { UserProfileComponent } from './user/user-profile.component';
import { AuthorizationGuard } from "./authorization-guard";

export const AppRoutes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'home/about', component: AboutComponent },
    { path: 'home/contact', component: ContactComponent },
    { path: 'home/home', component: HomeComponent },
    { path: 'home/register', component: RegisterComponent },
    { path: 'home/login', component: LoginComponent },
    { path: 'user/user-profile', component: UserProfileComponent, canActivate: [AuthorizationGuard] },
    { path: 'customers', loadChildren: './customers/customers.module#CustomersModule' },
    { path: 'products', loadChildren: './products/products.module#ProductsModule' }
];


