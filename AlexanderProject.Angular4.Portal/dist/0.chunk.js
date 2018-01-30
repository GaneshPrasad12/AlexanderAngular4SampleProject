webpackJsonp([0,6],{

/***/ 963:
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
var product_inquiry_component_1 = __webpack_require__(967);
var product_maintenance_component_1 = __webpack_require__(968);
var products_routing_module_1 = __webpack_require__(970);
var ProductsModule = (function () {
    function ProductsModule() {
    }
    return ProductsModule;
}());
ProductsModule = __decorate([
    core_1.NgModule({
        declarations: [
            product_inquiry_component_1.ProductInquiryComponent,
            product_maintenance_component_1.ProductMaintenanceComponent
        ],
        imports: [
            common_1.CommonModule,
            products_routing_module_1.ProductsRoutingModule
        ]
    })
], ProductsModule);
exports.ProductsModule = ProductsModule;
//# sourceMappingURL=products.module.js.map

/***/ }),

/***/ 967:
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
var ProductInquiryComponent = (function () {
    function ProductInquiryComponent() {
    }
    ProductInquiryComponent.prototype.ngOnInit = function () {
        this.title = "Product Inquiry";
    };
    return ProductInquiryComponent;
}());
ProductInquiryComponent = __decorate([
    core_1.Component({
        selector: 'app-product-inquiry',
        template: __webpack_require__(975),
        styles: [__webpack_require__(971)]
    }),
    __metadata("design:paramtypes", [])
], ProductInquiryComponent);
exports.ProductInquiryComponent = ProductInquiryComponent;
//# sourceMappingURL=product-inquiry.component.js.map

/***/ }),

/***/ 968:
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
var ProductMaintenanceComponent = (function () {
    function ProductMaintenanceComponent() {
    }
    ProductMaintenanceComponent.prototype.ngOnInit = function () {
        this.title = "Product Maintenance";
    };
    return ProductMaintenanceComponent;
}());
ProductMaintenanceComponent = __decorate([
    core_1.Component({
        selector: 'app-product-maintenance',
        template: __webpack_require__(976),
        styles: [__webpack_require__(972)]
    }),
    __metadata("design:paramtypes", [])
], ProductMaintenanceComponent);
exports.ProductMaintenanceComponent = ProductMaintenanceComponent;
//# sourceMappingURL=product-maintenance.component.js.map

/***/ }),

/***/ 970:
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
var product_maintenance_component_1 = __webpack_require__(968);
var product_inquiry_component_1 = __webpack_require__(967);
var authorization_guard_1 = __webpack_require__(203);
var productsRoutes = [
    { path: '', component: product_inquiry_component_1.ProductInquiryComponent },
    { path: 'product-inquiry', component: product_inquiry_component_1.ProductInquiryComponent, canActivate: [authorization_guard_1.AuthorizationGuard] },
    { path: 'product-maintenance', component: product_maintenance_component_1.ProductMaintenanceComponent, canActivate: [authorization_guard_1.AuthorizationGuard] }
];
var ProductsRoutingModule = (function () {
    function ProductsRoutingModule() {
    }
    return ProductsRoutingModule;
}());
ProductsRoutingModule = __decorate([
    core_1.NgModule({
        imports: [
            router_1.RouterModule.forChild(productsRoutes)
        ],
        exports: [router_1.RouterModule]
    })
], ProductsRoutingModule);
exports.ProductsRoutingModule = ProductsRoutingModule;
//# sourceMappingURL=products-routing.module.js.map

/***/ }),

/***/ 971:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(26)(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 972:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(26)(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 975:
/***/ (function(module, exports) {

module.exports = "\r\n<h4 class=\"page-header\">{{title}}</h4>\r\n\r\n<div>\r\n Product inquiry \r\n</div>\r\n"

/***/ }),

/***/ 976:
/***/ (function(module, exports) {

module.exports = "\r\n<h4 class=\"page-header\">{{title}}</h4>\r\n\r\n\r\n\r\n<div>\r\n Prodcut management\r\n</div>\r\n"

/***/ })

});
//# sourceMappingURL=0.chunk.js.map