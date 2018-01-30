webpackJsonp([1,6],{

/***/ 962:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(1);
var common_1 = __webpack_require__(14);
var customer_inquiry_component_1 = __webpack_require__(964);
var customer_maintenance_component_1 = __webpack_require__(965);
var customers_routing_module_1 = __webpack_require__(969);
var forms_1 = __webpack_require__(22);
var shared_module_1 = __webpack_require__(441);
var CustomersModule = (function () {
    function CustomersModule() {
    }
    return CustomersModule;
}());
CustomersModule = __decorate([
    core_1.NgModule({
        declarations: [
            customer_inquiry_component_1.CustomerInquiryComponent,
            customer_maintenance_component_1.CustomerMaintenanceComponent,
        ],
        imports: [
            common_1.CommonModule,
            customers_routing_module_1.CustomersRoutingModule,
            forms_1.FormsModule,
            shared_module_1.SharedModule
        ]
    })
], CustomersModule);
exports.CustomersModule = CustomersModule;
//# sourceMappingURL=customers.module.js.map

/***/ }),

/***/ 964:
/***/ (function(module, exports, __webpack_require__) {

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
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(1);
var router_1 = __webpack_require__(55);
var datagrid_core_1 = __webpack_require__(440);
var datagrid_component_1 = __webpack_require__(439);
var alert_service_1 = __webpack_require__(93);
var customer_service_1 = __webpack_require__(438);
var customer_entity_1 = __webpack_require__(966);
var transactionalinformation_entity_1 = __webpack_require__(437);
var CustomerInquiryComponent = (function () {
    function CustomerInquiryComponent(alertService, customerService, router) {
        this.alertService = alertService;
        this.customerService = customerService;
        this.router = router;
        this.title = 'Customer Inquiry';
        this.columns = [];
        this.alerts = [];
        this.currentPageNumber = 1;
        this.currentPageNumber = 1;
        this.autoFilter = false;
        this.totalPages = 0;
        this.totalRows = 0;
        this.pageSize = 15;
        this.sortDirection = "ASC";
        this.sortExpression = "CompanyName";
    }
    CustomerInquiryComponent.prototype.ngOnInit = function () {
        this.columns.push(new datagrid_core_1.DataGridColumn('customerCode', 'Customer Code', '[{"width": "20%" , "disableSorting": false}]'));
        this.columns.push(new datagrid_core_1.DataGridColumn('companyName', 'Company Name', '[{"width": "30%" , "hyperLink": true, "disableSorting": false}]'));
        this.columns.push(new datagrid_core_1.DataGridColumn('city', 'City', '[{"width": "20%" , "disableSorting": false}]'));
        this.columns.push(new datagrid_core_1.DataGridColumn('zipCode', 'Zip Code', '[{"width": "15%" , "disableSorting": false}]'));
        this.columns.push(new datagrid_core_1.DataGridColumn('dateUpdated', 'Date Updated', '[{"width": "15%" , "disableSorting": false, "formatDate": true}]'));
        this.executeSearch();
    };
    CustomerInquiryComponent.prototype.executeSearch = function () {
        var _this = this;
        if (this.runningSearch == true)
            return;
        var miliseconds = 500;
        if (this.delaySearch == false) {
            miliseconds = 0;
        }
        this.runningSearch = true;
        setTimeout(function () {
            var customer = new customer_entity_1.Customer();
            customer.customerCode = _this.customerCode;
            customer.companyName = _this.companyName;
            customer.pageSize = _this.pageSize;
            customer.sortDirection = _this.sortDirection;
            customer.sortExpression = _this.sortExpression;
            customer.currentPageNumber = _this.currentPageNumber;
            _this.customerService.getCustomers(customer)
                .subscribe(function (response) { return _this.getCustomersOnSuccess(response); }, function (response) { return _this.getCustomersOnError(response); });
        }, miliseconds);
    };
    CustomerInquiryComponent.prototype.getCustomersOnSuccess = function (response) {
        var transactionalInformation = new transactionalinformation_entity_1.TransactionalInformation();
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
    };
    CustomerInquiryComponent.prototype.getCustomersOnError = function (response) {
        this.alertService.renderErrorMessage(response.returnMessage);
        this.messageBox = this.alertService.returnFormattedMessage();
        this.alerts = this.alertService.returnAlerts();
        this.runningSearch = false;
    };
    CustomerInquiryComponent.prototype.datagridEvent = function (event) {
        var datagridEvent = event.value;
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
    };
    CustomerInquiryComponent.prototype.selectedCustomer = function (itemSelected) {
        var rowSelected = itemSelected;
        var row = this.customers[rowSelected];
        var customerID = row.customerID;
        this.router.navigate(['/customers/customer-maintenance', { id: customerID }]);
    };
    CustomerInquiryComponent.prototype.sortCustomers = function (sortDirection, sortExpression) {
        this.sortDirection = sortDirection;
        this.sortExpression = sortExpression;
        this.currentPageNumber = 1;
        this.delaySearch = false;
        this.executeSearch();
    };
    CustomerInquiryComponent.prototype.pagingCustomers = function (currentPageNumber) {
        this.currentPageNumber = currentPageNumber;
        this.delaySearch = false;
        this.executeSearch();
    };
    CustomerInquiryComponent.prototype.pageSizeChanged = function (pageSize) {
        this.pageSize = pageSize;
        this.currentPageNumber = 1;
        this.delaySearch = false;
        this.executeSearch();
    };
    CustomerInquiryComponent.prototype.reset = function () {
        this.customerCode = "";
        this.companyName = "";
        this.currentPageNumber = 1;
        this.delaySearch = false;
        this.executeSearch();
    };
    CustomerInquiryComponent.prototype.search = function () {
        this.currentPageNumber = 1;
        this.delaySearch = false;
        this.executeSearch();
    };
    CustomerInquiryComponent.prototype.companyNameChanged = function (newValue) {
        var _this = this;
        if (this.autoFilter == false)
            return;
        if (newValue == "")
            return;
        this.companyName = newValue;
        this.currentPageNumber = 1;
        this.delaySearch = true;
        setTimeout(function () {
            _this.executeSearch();
        }, 500);
    };
    CustomerInquiryComponent.prototype.customerCodeChanged = function (newValue) {
        var _this = this;
        if (this.autoFilter == false)
            return;
        if (newValue == "")
            return;
        this.customerCode = newValue;
        this.currentPageNumber = 1;
        this.delaySearch = true;
        setTimeout(function () {
            _this.executeSearch();
        }, 500);
    };
    return CustomerInquiryComponent;
}());
__decorate([
    core_1.ViewChild(datagrid_component_1.DataGrid),
    __metadata("design:type", typeof (_a = typeof datagrid_component_1.DataGrid !== "undefined" && datagrid_component_1.DataGrid) === "function" && _a || Object)
], CustomerInquiryComponent.prototype, "datagrid", void 0);
CustomerInquiryComponent = __decorate([
    core_1.Component({
        template: __webpack_require__(973)
    }),
    __metadata("design:paramtypes", [typeof (_b = typeof alert_service_1.AlertService !== "undefined" && alert_service_1.AlertService) === "function" && _b || Object, typeof (_c = typeof customer_service_1.CustomerService !== "undefined" && customer_service_1.CustomerService) === "function" && _c || Object, typeof (_d = typeof router_1.Router !== "undefined" && router_1.Router) === "function" && _d || Object])
], CustomerInquiryComponent);
exports.CustomerInquiryComponent = CustomerInquiryComponent;
var _a, _b, _c, _d;
//# sourceMappingURL=customer-inquiry.component.js.map

/***/ }),

/***/ 965:
/***/ (function(module, exports, __webpack_require__) {

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
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(1);
var router_1 = __webpack_require__(55);
var address_entity_1 = __webpack_require__(204);
var customer_entity_1 = __webpack_require__(966);
var customer_service_1 = __webpack_require__(438);
var alert_service_1 = __webpack_require__(93);
var session_service_1 = __webpack_require__(43);
var CustomerMaintenanceComponent = (function () {
    function CustomerMaintenanceComponent(route, customerService, sessionService, alertService) {
        this.route = route;
        this.customerService = customerService;
        this.sessionService = sessionService;
        this.alertService = alertService;
        this.title = 'Customer Maintenance';
        this.alerts = [];
    }
    CustomerMaintenanceComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.showUpdateButton = false;
        this.showAddButton = false;
        this.address = new address_entity_1.Address();
        this.route.params.subscribe(function (params) {
            var id = params['id'];
            if (id != undefined) {
                _this.customerID = parseInt(id);
                var customer = new customer_entity_1.Customer();
                customer.customerID = _this.customerID;
                _this.customerService.getCustomer(customer)
                    .subscribe(function (response) { return _this.getCustomerOnSuccess(response); }, function (response) { return _this.getCustomerOnError(response); });
            }
            else {
                _this.customerID = 0;
                _this.showAddButton = true;
                _this.showUpdateButton = false;
            }
        });
    };
    CustomerMaintenanceComponent.prototype.getCustomerOnSuccess = function (response) {
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
    };
    CustomerMaintenanceComponent.prototype.getCustomerOnError = function (response) {
        this.alertService.renderErrorMessage(response.returnMessage);
        this.messageBox = this.alertService.returnFormattedMessage();
        this.alerts = this.alertService.returnAlerts();
        this.alertService.setValidationErrors(this, response.validationErrors);
    };
    CustomerMaintenanceComponent.prototype.updateCustomer = function () {
        var _this = this;
        var customer = new customer_entity_1.Customer();
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
            .subscribe(function (response) { return _this.updateCustomerOnSuccess(response); }, function (response) { return _this.updateCustomerOnError(response); });
    };
    CustomerMaintenanceComponent.prototype.updateCustomerOnSuccess = function (response) {
        if (this.customerID == 0) {
            this.customerID = response.customerID;
            this.showAddButton = false;
            this.showUpdateButton = true;
        }
        this.alertService.renderSuccessMessage(response.returnMessage);
        this.messageBox = this.alertService.returnFormattedMessage();
        this.alerts = this.alertService.returnAlerts();
    };
    CustomerMaintenanceComponent.prototype.updateCustomerOnError = function (response) {
        this.alertService.renderErrorMessage(response.returnMessage);
        this.messageBox = this.alertService.returnFormattedMessage();
        this.alerts = this.alertService.returnAlerts();
        this.alertService.setValidationErrors(this, response.validationErrors);
    };
    CustomerMaintenanceComponent.prototype.clearInputErrors = function () {
        this.customerCodeInputError = false;
        this.companyNameInputError = false;
    };
    return CustomerMaintenanceComponent;
}());
CustomerMaintenanceComponent = __decorate([
    core_1.Component({
        template: __webpack_require__(974)
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof router_1.ActivatedRoute !== "undefined" && router_1.ActivatedRoute) === "function" && _a || Object, typeof (_b = typeof customer_service_1.CustomerService !== "undefined" && customer_service_1.CustomerService) === "function" && _b || Object, typeof (_c = typeof session_service_1.SessionService !== "undefined" && session_service_1.SessionService) === "function" && _c || Object, typeof (_d = typeof alert_service_1.AlertService !== "undefined" && alert_service_1.AlertService) === "function" && _d || Object])
], CustomerMaintenanceComponent);
exports.CustomerMaintenanceComponent = CustomerMaintenanceComponent;
var _a, _b, _c, _d;
//# sourceMappingURL=customer-maintenance.component.js.map

/***/ }),

/***/ 966:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var transactionalinformation_entity_1 = __webpack_require__(437);
var Customer = (function (_super) {
    __extends(Customer, _super);
    function Customer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Customer;
}(transactionalinformation_entity_1.TransactionalInformation));
exports.Customer = Customer;
//# sourceMappingURL=customer.entity.js.map

/***/ }),

/***/ 969:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(1);
var router_1 = __webpack_require__(55);
var customer_maintenance_component_1 = __webpack_require__(965);
var customer_inquiry_component_1 = __webpack_require__(964);
var authorization_guard_1 = __webpack_require__(203);
var customerRoutes = [
    { path: '', component: customer_inquiry_component_1.CustomerInquiryComponent },
    { path: 'customer-inquiry', component: customer_inquiry_component_1.CustomerInquiryComponent, canActivate: [authorization_guard_1.AuthorizationGuard] },
    { path: 'customer-maintenance', component: customer_maintenance_component_1.CustomerMaintenanceComponent, canActivate: [authorization_guard_1.AuthorizationGuard] }
];
var CustomersRoutingModule = (function () {
    function CustomersRoutingModule() {
    }
    return CustomersRoutingModule;
}());
CustomersRoutingModule = __decorate([
    core_1.NgModule({
        imports: [
            router_1.RouterModule.forChild(customerRoutes)
        ],
        exports: [router_1.RouterModule]
    })
], CustomersRoutingModule);
exports.CustomersRoutingModule = CustomersRoutingModule;
//# sourceMappingURL=customers-routing.module.js.map

/***/ }),

/***/ 973:
/***/ (function(module, exports) {

module.exports = "<h4 class=\"page-header\">{{title}}</h4>\r\n\r\n<div class=\"form-horizontal\" style=\"margin-bottom:25px;\">\r\n\r\n    <div style=\"width:20%; float:left; padding-right:1px;\">\r\n        <input type=\"text\" class=\"form-control\" placeholder=\"Customer Code\" [(ngModel)]=\"customerCode\" name=\"customerCode\" (ngModelChange)=\"customerCodeChanged($event)\" />       \r\n    </div>\r\n\r\n    <div style=\"width:20%; float:left; padding-right:1px;\">\r\n        <input type=\"text\" class=\"form-control\" placeholder=\"Company Name\" [(ngModel)]=\"companyName\" name=\"companyName\" (ngModelChange)=\"companyNameChanged($event)\" />\r\n    </div>\r\n\r\n    <div style=\"float:left; padding-right:1px; padding-left:5px;\">\r\n        <button class=\"btn btn-primary\" (click)=\"reset()\">\r\n            <b>Reset Search</b>\r\n        </button>\r\n    </div>\r\n\r\n    <div style=\"float:left; padding-right:1px; padding-left:5px;\">\r\n        <button class=\"btn btn-primary\" (click)=\"search()\">\r\n            <b>Submit Search</b>\r\n        </button>\r\n    </div>\r\n\r\n    <div style=\"float:right; padding-left:5px;\">\r\n        <label><input type=\"checkbox\" [(ngModel)]=\"autoFilter\" name=\"autoFilter\">&nbsp;Auto Filtering Search</label>\r\n    </div>\r\n\r\n</div>\r\n\r\n<br clear=\"all\" />\r\n\r\n<datagrid [rows]=\"customers\"\r\n          [columns]=\"columns\"\r\n          [pageSize]=\"pageSize\"\r\n          (datagridEvent)=\"datagridEvent($event)\">\r\n</datagrid>\r\n\r\n<br style=\"clear:both;\" />\r\n\r\n<div>\r\n    <alertbox [alerts]=\"alerts\" [messageBox]=\"messageBox\"></alertbox>\r\n</div>\r\n"

/***/ }),

/***/ 974:
/***/ (function(module, exports) {

module.exports = "<h4 class=\"page-header\">{{title}}</h4>\r\n\r\n<div class=\"panel panel-default\">\r\n\r\n    <div class=\"form-horizontal\" role=\"form\">\r\n\r\n        <div style=\"padding:10px;margin:10px; \">\r\n\r\n            <div class=\"form-group\">\r\n                <label class=\"col-sm-2 control-label required\">Company Code</label>\r\n                <div class=\"col-lg-4 col-md-4 col-sm-12 col-xs-12\">\r\n                    <input type=\"text\" class=\"form-control\" id=\"customerCode\" name=\"customerCode\"  [(ngModel)]=\"customerCode\" [ngClass]=\"{'validation-error': customerCodeInputError}\">\r\n                </div>\r\n            </div>\r\n\r\n            <div class=\"form-group\">\r\n                <label class=\"col-sm-2 control-label required\">Company Name</label>\r\n                <div class=\"col-lg-4 col-md-4 col-sm-12 col-xs-12\">\r\n                    <input type=\"text\" class=\"form-control\" id=\"companyName\" name=\"companyName\" [(ngModel)]=\"companyName\" [ngClass]=\"{'validation-error': companyNameInputError}\">\r\n                </div>\r\n            </div>\r\n\r\n            <address-form [address]=\"address\"></address-form>\r\n\r\n            <div class=\"form-group\">\r\n                <label class=\"col-sm-2 control-label\">Phone Number</label>\r\n                <div class=\"col-lg-4 col-md-4 col-sm-12 col-xs-12\">\r\n                    <input type=\"text\" class=\"form-control\" id=\"phoneNumber\" name=\"phoneNumber\" [(ngModel)]=\"phoneNumber\">\r\n                </div>\r\n            </div>\r\n\r\n        </div>\r\n\r\n    </div>\r\n\r\n</div>\r\n\r\n<div [hidden]=\"showUpdateButton == false\">\r\n    <button (click)=\"updateCustomer()\" class=\"btn btn-primary\">\r\n        Update\r\n    </button>\r\n</div>\r\n\r\n\r\n<div [hidden]=\"showAddButton == false\">\r\n    <button (click)=\"updateCustomer()\" class=\"btn btn-primary\">\r\n        Create Customer\r\n    </button>\r\n</div>\r\n\r\n<alertbox [alerts]=\"alerts\" [messageBox]=\"messageBox\"></alertbox>\r\n\r\n\r\n\n"

/***/ })

});
//# sourceMappingURL=1.chunk.js.map