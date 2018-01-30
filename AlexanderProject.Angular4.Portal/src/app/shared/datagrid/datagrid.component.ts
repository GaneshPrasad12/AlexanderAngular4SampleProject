import { Component, EventEmitter, Injectable, Output, Input, OnChanges, OnInit, Host} from '@angular/core';
import { DataGridColumn, DataGridSorter, DataGridButton, DataGridSortInformation, DataGridEventInformation } from './datagrid.core';
import { TransactionalInformation } from '../../entities/transactionalinformation.entity';

@Component({
    selector: 'datagrid',
    styleUrls: ['./datagrid.css'], 
    templateUrl: './datagrid.component.html' 
})

@Injectable()
export class DataGrid implements OnInit {

  
    public sorter: DataGridSorter;
    public pageSizes = [];
    public sortColumn: string;
    public sortDesending: Boolean;
    public sortAscending: Boolean;
 
    @Output() datagridEvent;
    @Input() pageSize: number;
    @Input() columns: Array<DataGridColumn>;
    @Input() rows: Array<any>;
  
    public disableFirstPageButton: Boolean;
    public disablePreviousPageButton: Boolean;
    public disableNextPageButton: Boolean;
    public disableLastPageButton: Boolean;
    public pageSizeForGrid: number;

    public currentPageNumber: number;
    public totalRows: number;
    public totalPages: number;
    public itemNumberBegin: number;
    public itemNumberEnd: number;

    constructor() {
       
        this.sorter = new DataGridSorter();
        this.datagridEvent = new EventEmitter();

        this.disableNextPageButton = false;
        this.disableLastPageButton = false;
        this.disableFirstPageButton = false;
        this.disablePreviousPageButton = false;

        this.disableFirstPageButton = true;
        this.disablePreviousPageButton = true;

        this.pageSizes.push(5);
        this.pageSizes.push(10);
        this.pageSizes.push(15);
      
        this.pageSizeForGrid = 15;

        this.sortColumn = "";
        this.sortAscending = false;
        this.sortDesending = false;
       
    }

    public ngOnInit() {}

    public databind(transactionalInformation: TransactionalInformation) {
    
        this.currentPageNumber = transactionalInformation.currentPageNumber;
        this.totalPages = transactionalInformation.totalPages;
        this.totalRows = transactionalInformation.totalRows;

        this.itemNumberBegin = ((this.currentPageNumber - 1) * this.pageSize) + 1;
        this.itemNumberEnd = this.currentPageNumber * this.pageSize;
        if (this.itemNumberEnd > this.totalRows) {
            this.itemNumberEnd = this.totalRows;
        }

        this.disableNextPageButton = false;
        this.disableLastPageButton = false;
        this.disableFirstPageButton = false;
        this.disablePreviousPageButton = false;

        if (this.currentPageNumber == 1) {
            this.disableFirstPageButton = true;
            this.disablePreviousPageButton = true;
        }

        if (this.currentPageNumber == this.totalPages) {
            this.disableNextPageButton = true;
            this.disableLastPageButton = true;
        }

    }

    public sortData(key) {       

        let sortInformation: DataGridSortInformation = this.sorter.sort(key, this.rows);     

        if (this.sortColumn != key) {
            this.sortAscending = true;
            this.sortDesending = false;
            this.sortColumn = key;
        }
        else {
            this.sortAscending = !this.sortAscending;
            this.sortDesending = !this.sortDesending;
        }

        let eventInformation = new DataGridEventInformation();

        eventInformation.EventType = "Sorting";
        eventInformation.Direction = sortInformation.Direction;
        eventInformation.SortDirection = sortInformation.SortDirection;
        eventInformation.SortExpression = sortInformation.Column;
        
        this.datagridEvent.emit({
            value: eventInformation
        });

    }

    public selectedRow(i: number) {      
        let eventInformation = new DataGridEventInformation();
        eventInformation.EventType = "ItemSelected";
        eventInformation.ItemSelected = i;
        this.datagridEvent.emit({
            value: eventInformation
        });       
    }

    public buttonClicked(buttonName: string, i: number) {

        let eventInformation = new DataGridEventInformation();
        eventInformation.EventType = "ButtonClicked";
        eventInformation.ButtonClicked = buttonName;
        eventInformation.ItemSelected = i;

        this.datagridEvent.emit({
            value: eventInformation
        });       
               
    }

    public pageSizeChanged(newPageSize) {     

        let eventInformation = new DataGridEventInformation();
        eventInformation.EventType = "PageSizeChanged";
      
        this.pageSize = parseInt(newPageSize) + 0;
        eventInformation.PageSize = this.pageSize;

        this.datagridEvent.emit({
            value: eventInformation
        });
        
    }

    public buttonNextPage() {

        let currentPageNumber = this.currentPageNumber + 1;

        let eventInformation = new DataGridEventInformation();
        eventInformation.EventType = "PagingEvent";
        eventInformation.CurrentPageNumber = currentPageNumber;

        this.datagridEvent.emit({
            value: eventInformation
        });
             
    }

    public buttonPreviousPage() {

        this.currentPageNumber = this.currentPageNumber - 1;

        let eventInformation = new DataGridEventInformation();
        eventInformation.EventType = "PagingEvent";
        eventInformation.CurrentPageNumber = this.currentPageNumber;

        this.datagridEvent.emit({
            value: eventInformation
        });
        
    }

    public buttonFirstPage() {

        this.currentPageNumber = 1;   

        let eventInformation = new DataGridEventInformation();
        eventInformation.EventType = "PagingEvent";
        eventInformation.CurrentPageNumber = this.currentPageNumber;

        this.datagridEvent.emit({
            value: eventInformation
        });
     

    }

    public buttonLastPage() {

        this.currentPageNumber = this.totalPages;

        let eventInformation = new DataGridEventInformation();
        eventInformation.EventType = "PagingEvent";
        eventInformation.CurrentPageNumber = this.currentPageNumber;

        this.datagridEvent.emit({
            value: eventInformation
        });
       
    }

}