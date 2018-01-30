import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomerMaintenanceComponent } from './customer-maintenance.component';
import { CustomerInquiryComponent } from './customer-inquiry.component';
import { AuthorizationGuard } from "../authorization-guard";

const customerRoutes: Routes = [
    { path: '', component: CustomerInquiryComponent },
    { path: 'customer-inquiry', component: CustomerInquiryComponent, canActivate: [AuthorizationGuard]  },
    { path: 'customer-maintenance', component: CustomerMaintenanceComponent, canActivate: [AuthorizationGuard]  }
]

@NgModule({
    imports: [
        RouterModule.forChild(customerRoutes)
    ],
    exports: [RouterModule]
})
export class CustomersRoutingModule {}
