import { Component, OnInit, EventEmitter, Output, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DataGridColumn, DataGridButton, DataGridEventInformation } from '../shared/datagrid/datagrid.core';
import { DataGrid } from '../shared/datagrid/datagrid.component';
import { AlertService } from '../services/alert.service';
import { CustomerService } from '../services/customer.service';
import { AlertBoxComponent } from '../shared/alertbox.component';
import { Customer } from '../entities/customer.entity';
import { TransactionalInformation } from '../entities/transactionalinformation.entity';

@Component({
    templateUrl: './customer-inquiry.component.html'
})

export class CustomerInquiryComponent implements OnInit {

    @ViewChild(DataGrid) datagrid: DataGrid;

    public title: string = 'Customer Inquiry';
    public customers: Customer[];
    public columns = [];

    public alerts: Array<string> = [];
    public messageBox: string;

    public totalRows: number;
    public currentPageNumber: number = 1;
    public totalPages: number;
    public pageSize: number;
    public companyName: string;
    public customerCode: string;
    private sortDirection: string;
    private sortExpression: string;

    public autoFilter: Boolean;
    public delaySearch: Boolean;
    public runningSearch: Boolean;

    constructor(private alertService: AlertService, private customerService: CustomerService, private router: Router) {

        this.currentPageNumber = 1;
        this.autoFilter = false;
        this.totalPages = 0;
        this.totalRows = 0;
        this.pageSize = 15;
        this.sortDirection = "ASC";
        this.sortExpression = "CompanyName";

    }

    public ngOnInit() {

        this.columns.push(new DataGridColumn('customerCode', 'Customer Code', '[{"width": "20%" , "disableSorting": false}]'));
        this.columns.push(new DataGridColumn('companyName', 'Company Name', '[{"width": "30%" , "hyperLink": true, "disableSorting": false}]'));
        this.columns.push(new DataGridColumn('city', 'City', '[{"width": "20%" , "disableSorting": false}]'));
        this.columns.push(new DataGridColumn('zipCode', 'Zip Code', '[{"width": "15%" , "disableSorting": false}]'));
        this.columns.push(new DataGridColumn('dateUpdated', 'Date Updated', '[{"width": "15%" , "disableSorting": false, "formatDate": true}]'));

        this.executeSearch();

    }

    private executeSearch(): void {

        if (this.runningSearch == true) return;

        let miliseconds = 500;

        if (this.delaySearch == false) {
            miliseconds = 0;
        }

        this.runningSearch = true;

        setTimeout(() => {

            let customer = new Customer();
            customer.customerCode = this.customerCode;
            customer.companyName = this.companyName;
            customer.pageSize = this.pageSize;
            customer.sortDirection = this.sortDirection;
            customer.sortExpression = this.sortExpression;
            customer.currentPageNumber = this.currentPageNumber;

            this.customerService.getCustomers(customer)
                .subscribe(
                response => this.getCustomersOnSuccess(response),
                response => this.getCustomersOnError(response));

        }, miliseconds)

    }


    private getCustomersOnSuccess(response: Customer): void {

        let transactionalInformation = new TransactionalInformation();
        transactionalInformation.currentPageNumber = this.currentPageNumber;
        transactionalInformation.pageSize = this.pageSize;
        transactionalInformation.totalPages = response.totalPages;
        transactionalInformation.totalRows = response.totalRows;
        transactionalInformation.sortDirection = this.sortDirection;
        transactionalInformation.sortExpression = this.sortExpression;

        this.customers = response.customers;

        this.datagrid.databind(transactionalInformation);

        this.alertService.renderSuccessMessage(response.returnMessage);
        this.messageBox = this.alertService.returnFormattedMessage();
        this.alerts = this.alertService.returnAlerts();

        this.runningSearch = false;

    }

    private getCustomersOnError(response): void {

        this.alertService.renderErrorMessage(response.returnMessage);
        this.messageBox = this.alertService.returnFormattedMessage();
        this.alerts = this.alertService.returnAlerts();

        this.runningSearch = false;

    }

    public datagridEvent(event) {
        let datagridEvent: DataGridEventInformation = event.value;

        if (datagridEvent.EventType == "PagingEvent") {
            this.pagingCustomers(datagridEvent.CurrentPageNumber);
        }

        else if (datagridEvent.EventType == "PageSizeChanged") {
            this.pageSizeChanged(datagridEvent.PageSize);
        }

        else if (datagridEvent.EventType == "ItemSelected") {
            this.selectedCustomer(datagridEvent.ItemSelected);
        }

        else if (datagridEvent.EventType == "Sorting") {
            this.sortCustomers(datagridEvent.SortDirection, datagridEvent.SortExpression);
        }

    }


    private selectedCustomer(itemSelected: number) {

        let rowSelected = itemSelected;
        let row = this.customers[rowSelected];
        let customerID = row.customerID;

        this.router.navigate(['/customers/customer-maintenance', { id: customerID }]);

    }

    private sortCustomers(sortDirection: string, sortExpression: string) {
        this.sortDirection = sortDirection;
        this.sortExpression = sortExpression;
        this.currentPageNumber = 1;
        this.delaySearch = false;
        this.executeSearch();
    }

    private pagingCustomers(currentPageNumber: number) {
        this.currentPageNumber = currentPageNumber;
        this.delaySearch = false;
        this.executeSearch();
    }

    private pageSizeChanged(pageSize: number) {
        this.pageSize = pageSize;
        this.currentPageNumber = 1;
        this.delaySearch = false;
        this.executeSearch();
    }

    public reset(): void {
        this.customerCode = "";
        this.companyName = "";
        this.currentPageNumber = 1;
        this.delaySearch = false;
        this.executeSearch();
    }

    public search(): void {
        this.currentPageNumber = 1;
        this.delaySearch = false;
        this.executeSearch();
    }

    public companyNameChanged(newValue): void {

        if (this.autoFilter == false) return;
        if (newValue == "") return;

        this.companyName = newValue;
        this.currentPageNumber = 1;
        this.delaySearch = true;

        setTimeout(() => {
            this.executeSearch();
        }, 500)

    }

    public customerCodeChanged(newValue): void {

        if (this.autoFilter == false) return;
        if (newValue == "") return;

        this.customerCode = newValue;
        this.currentPageNumber = 1;
        this.delaySearch = true;

        setTimeout(() => {
            this.executeSearch();
        }, 500)

    }


}