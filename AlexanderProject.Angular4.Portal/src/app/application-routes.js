"use strict";
var about_component_1 = require('./home/about.component');
var register_component_1 = require('./home/register.component');
var login_component_1 = require('./home/login.component');
var contact_component_1 = require('./home/contact.component');
var home_component_1 = require('./home/home.component');
exports.AppRoutes = [
    { path: '', component: home_component_1.HomeComponent },
    { path: 'home/about', component: about_component_1.AboutComponent },
    { path: 'home/contact', component: contact_component_1.ContactComponent },
    { path: 'home/home', component: home_component_1.HomeComponent },
    { path: 'home/register', component: register_component_1.RegisterComponent },
    { path: 'home/login', component: login_component_1.LoginComponent },
    { path: 'customers', loadChildren: './customers/customers.module#CustomersModule' },
    { path: 'products', loadChildren: './products/products.module#ProductsModule' }
];
//# sourceMappingURL=application-routes.js.map