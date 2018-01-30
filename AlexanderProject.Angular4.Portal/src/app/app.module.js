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
var platform_browser_1 = require('@angular/platform-browser');
var router_1 = require('@angular/router');
var core_1 = require('@angular/core');
var forms_1 = require('@angular/forms');
var http_1 = require('@angular/http');
var application_routes_1 = require("./application-routes");
var app_component_1 = require('./app.component');
var about_component_1 = require('./home/about.component');
var contact_component_1 = require('./home/contact.component');
var home_component_1 = require('./home/home.component');
var login_component_1 = require('./home/login.component');
var register_component_1 = require('./home/register.component');
var navigation_component_1 = require('./shared/navigation.component');
var footer_component_1 = require('./shared/footer.component');
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            declarations: [
                app_component_1.AppComponent,
                about_component_1.AboutComponent,
                contact_component_1.ContactComponent,
                home_component_1.HomeComponent,
                login_component_1.LoginComponent,
                register_component_1.RegisterComponent,
                navigation_component_1.NavigationComponent,
                footer_component_1.FooterComponent
            ],
            imports: [
                platform_browser_1.BrowserModule,
                forms_1.FormsModule,
                http_1.HttpModule,
                router_1.RouterModule.forRoot(application_routes_1.AppRoutes)
            ],
            providers: [],
            bootstrap: [app_component_1.AppComponent]
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map