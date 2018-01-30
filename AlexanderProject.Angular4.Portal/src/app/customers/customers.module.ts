import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerInquiryComponent } from './customer-inquiry.component';
import { CustomerMaintenanceComponent } from './customer-maintenance.component';
import { CustomersRoutingModule } from './customers-routing.module';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';


@NgModule({
    declarations: [
        CustomerInquiryComponent,
        CustomerMaintenanceComponent,    
    ],
    imports: [
        CommonModule,
        CustomersRoutingModule,
        FormsModule,
        SharedModule
    ]

})
export class CustomersModule { }
