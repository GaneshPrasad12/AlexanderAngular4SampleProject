import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Address } from '../entities/address.entity';
import { Customer } from '../entities/customer.entity';
import { AlertBoxComponent } from '../shared/alertbox.component';
import { CustomerService } from '../services/customer.service';
import { HttpService } from '../services/http.service';
import { AlertService } from '../services/alert.service';
import { SessionService } from '../services/session.service';
import { AddressComponent } from '../shared/address.component';

@Component({
    templateUrl: './customer-maintenance.component.html'
})

export class CustomerMaintenanceComponent implements OnInit {

    public title: string = 'Customer Maintenance';
    public customerID: number;
    public customerCode: string;
    public companyName: string;
    public phoneNumber: string;
    public address: Address;

    public showUpdateButton: Boolean;
    public showAddButton: Boolean;

    public customerCodeInputError: Boolean;
    public companyNameInputError: Boolean;

    public messageBox: string;
    public alerts: Array<string> = [];

    constructor(private route: ActivatedRoute, private customerService: CustomerService, private sessionService: SessionService, private alertService: AlertService) { }

    public ngOnInit() {

        this.showUpdateButton = false;
        this.showAddButton = false;

        this.address = new Address();

        this.route.params.subscribe(params => {

            let id: string = params['id'];

            if (id != undefined) {

                this.customerID = parseInt(id);

                let customer = new Customer();
                customer.customerID = this.customerID;

                this.customerService.getCustomer(customer)
                    .subscribe(
                    response => this.getCustomerOnSuccess(response),
                    response => this.getCustomerOnError(response));


            }
            else {
                this.customerID = 0;
                this.showAddButton = true;
                this.showUpdateButton = false;
            }

        });


    }

    private getCustomerOnSuccess(response: Customer) {
        this.customerCode = response.customerCode;
        this.companyName = response.companyName;
        this.phoneNumber = response.phoneNumber;
        this.address.addressLine1 = response.addressLine1;
        this.address.addressLine2 = response.addressLine2;
        this.address.city = response.city;
        this.address.state = response.state;
        this.address.zipCode = response.zipCode;
        this.showUpdateButton = true;
        this.showAddButton = false;
    }

    private getCustomerOnError(response: Customer) {
        this.alertService.renderErrorMessage(response.returnMessage);
        this.messageBox = this.alertService.returnFormattedMessage();
        this.alerts = this.alertService.returnAlerts();
        this.alertService.setValidationErrors(this, response.validationErrors);
    }

    public updateCustomer(): void {

        let customer = new Customer();

        customer.customerID = this.customerID;
        customer.customerCode = this.customerCode;
        customer.companyName = this.companyName;
        customer.phoneNumber = this.phoneNumber;
        customer.addressLine1 = this.address.addressLine1;
        customer.addressLine2 = this.address.addressLine2;
        customer.city = this.address.city;
        customer.state = this.address.state;
        customer.zipCode = this.address.zipCode;

        this.clearInputErrors();

        this.customerService.updateCustomer(customer)
            .subscribe(
            response => this.updateCustomerOnSuccess(response),
            response => this.updateCustomerOnError(response));


    }

    private updateCustomerOnSuccess(response: Customer) {

        if (this.customerID == 0) {
            this.customerID = response.customerID;
            this.showAddButton = false;
            this.showUpdateButton = true;
        }

        this.alertService.renderSuccessMessage(response.returnMessage);
        this.messageBox = this.alertService.returnFormattedMessage();
        this.alerts = this.alertService.returnAlerts();
    }

    private updateCustomerOnError(response: Customer) {
        this.alertService.renderErrorMessage(response.returnMessage);
        this.messageBox = this.alertService.returnFormattedMessage();
        this.alerts = this.alertService.returnAlerts();
        this.alertService.setValidationErrors(this, response.validationErrors);
    }


    private clearInputErrors() {
        this.customerCodeInputError = false;
        this.companyNameInputError = false;
    }


}
