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
var router_1 = require('@angular/router');
var customer_maintenance_component_1 = require('./customer-maintenance.component');
var customer_inquiry_component_1 = require('./customer-inquiry.component');
var customerRoutes = [
    { path: '', component: customer_inquiry_component_1.CustomerInquiryComponent },
    { path: 'customers/customer-inquiry', component: customer_inquiry_component_1.CustomerInquiryComponent },
    { path: 'customers/customer-maintenance', component: customer_maintenance_component_1.CustomerMaintenanceComponent }
];
var CustomersRoutingModule = (function () {
    function CustomersRoutingModule() {
    }
    CustomersRoutingModule = __decorate([
        core_1.NgModule({
            imports: [
                router_1.RouterModule.forChild(customerRoutes)
            ],
            exports: [router_1.RouterModule]
        }), 
        __metadata('design:paramtypes', [])
    ], CustomersRoutingModule);
    return CustomersRoutingModule;
}());
exports.CustomersRoutingModule = CustomersRoutingModule;
//# sourceMappingURL=customers-routing.module.js.map