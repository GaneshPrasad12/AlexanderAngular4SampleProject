"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var datagrid_core_1 = require('./datagrid.core');
var DataGrid = (function () {
    function DataGrid() {
        this.pageSizes = [];
        this.sorter = new datagrid_core_1.DataGridSorter();
        this.datagridEvent = new core_1.EventEmitter();
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
    DataGrid.prototype.ngOnInit = function () { };
    DataGrid.prototype.databind = function (transactionalInformation) {
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
    };
    DataGrid.prototype.sortData = function (key) {
        var sortInformation = this.sorter.sort(key, this.rows);
        if (this.sortColumn != key) {
            this.sortAscending = true;
            this.sortDesending = false;
            this.sortColumn = key;
        }
        else {
            this.sortAscending = !this.sortAscending;
            this.sortDesending = !this.sortDesending;
        }
        var eventInformation = new datagrid_core_1.DataGridEventInformation();
        eventInformation.EventType = "Sorting";
        eventInformation.Direction = sortInformation.Direction;
        eventInformation.SortDirection = sortInformation.SortDirection;
        eventInformation.SortExpression = sortInformation.Column;
        this.datagridEvent.emit({
            value: eventInformation
        });
    };
    DataGrid.prototype.selectedRow = function (i) {
        var eventInformation = new datagrid_core_1.DataGridEventInformation();
        eventInformation.EventType = "ItemSelected";
        eventInformation.ItemSelected = i;
        this.datagridEvent.emit({
            value: eventInformation
        });
    };
    DataGrid.prototype.buttonClicked = function (buttonName, i) {
        var eventInformation = new datagrid_core_1.DataGridEventInformation();
        eventInformation.EventType = "ButtonClicked";
        eventInformation.ButtonClicked = buttonName;
        eventInformation.ItemSelected = i;
        this.datagridEvent.emit({
            value: eventInformation
        });
    };
    DataGrid.prototype.pageSizeChanged = function (newPageSize) {
        var eventInformation = new datagrid_core_1.DataGridEventInformation();
        eventInformation.EventType = "PageSizeChanged";
        this.pageSize = parseInt(newPageSize) + 0;
        eventInformation.PageSize = this.pageSize;
        this.datagridEvent.emit({
            value: eventInformation
        });
    };
    DataGrid.prototype.buttonNextPage = function () {
        var currentPageNumber = this.currentPageNumber + 1;
        var eventInformation = new datagrid_core_1.DataGridEventInformation();
        eventInformation.EventType = "PagingEvent";
        eventInformation.CurrentPageNumber = currentPageNumber;
        this.datagridEvent.emit({
            value: eventInformation
        });
    };
    DataGrid.prototype.buttonPreviousPage = function () {
        this.currentPageNumber = this.currentPageNumber - 1;
        var eventInformation = new datagrid_core_1.DataGridEventInformation();
        eventInformation.EventType = "PagingEvent";
        eventInformation.CurrentPageNumber = this.currentPageNumber;
        this.datagridEvent.emit({
            value: eventInformation
        });
    };
    DataGrid.prototype.buttonFirstPage = function () {
        this.currentPageNumber = 1;
        var eventInformation = new datagrid_core_1.DataGridEventInformation();
        eventInformation.EventType = "PagingEvent";
        eventInformation.CurrentPageNumber = this.currentPageNumber;
        this.datagridEvent.emit({
            value: eventInformation
        });
    };
    DataGrid.prototype.buttonLastPage = function () {
        this.currentPageNumber = this.totalPages;
        var eventInformation = new datagrid_core_1.DataGridEventInformation();
        eventInformation.EventType = "PagingEvent";
        eventInformation.CurrentPageNumber = this.currentPageNumber;
        this.datagridEvent.emit({
            value: eventInformation
        });
    };
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], DataGrid.prototype, "datagridEvent", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], DataGrid.prototype, "pageSize", void 0);
    DataGrid = __decorate([
        core_1.Component({
            selector: 'datagrid',
            styleUrls: ['app/shared/datagrid/datagrid.css'],
            inputs: ['rows: rows', 'columns: columns'],
            templateUrl: 'app/shared/datagrid/datagrid.component.html'
        }),
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], DataGrid);
    return DataGrid;
}());
exports.DataGrid = DataGrid;
//# sourceMappingURL=datagrid.component.js.map