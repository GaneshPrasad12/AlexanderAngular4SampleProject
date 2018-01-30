import { Component, OnInit, ViewChild, ContentChild, AfterViewInit, NgZone } from '@angular/core';
import { User } from '../entities/user.entity';

import { UserService } from '../services/user.service';
import { HttpService } from '../services/http.service';
import { SessionService } from '../services/session.service';
import { AlertService } from '../services/alert.service';
import { Router } from '@angular/router';
import { AlertBoxComponent } from '../shared/alertbox.component';

declare var NotificationFx: any;

@Component({
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {

    public title: string = "";
    public fullName: string = "";
    public firstName: string = "";
    public lastName: string = "";
    public emailAddress: string = "";
    public password: string = "";
    public passwordConfirmation: string = "";
    public alerts: Array<string> = [];
    public messageBox: string;

    public testMessages: Array<string> = [];

    public firstNameInputError: Boolean;
    public lastNameInputError: Boolean;
    public emailAddressInputError: Boolean;
    public passwordInputError: Boolean;
    public passwordConfirmationInputError: Boolean;
    public showSpinner = false;
    public selectedCar: string;

    @ViewChild(AlertBoxComponent) alertBoxComponent: AlertBoxComponent;

    constructor(private userService: UserService, private sessionService: SessionService, private alertService: AlertService, private router: Router, private zone: NgZone) { }

    public ngOnInit() {
        this.clearInputErrors();
        this.title = "Register";
        this.firstName = "";
        this.lastName = "";
        this.emailAddress = "";
        this.password = "";
        this.passwordConfirmation = "";
    }  

    public registerUser($event): void {

        let user: User = new User();
        user.emailAddress = this.emailAddress;
        user.firstName = this.firstName;
        user.lastName = this.lastName;
        user.password = this.password;
        user.passwordConfirmation = this.passwordConfirmation;

        this.clearInputErrors();

        this.userService.registerUser(user)
            .subscribe(
            response => this.registerUserOnSuccess(response),
            response => this.registerUserOnError(response));

    }

    private clearInputErrors() {
        this.firstNameInputError = false;
        this.lastNameInputError = false;
        this.emailAddressInputError = false;
        this.passwordInputError = false;
        this.passwordConfirmationInputError = false;
    }

    private registerUserOnSuccess(response): void {

        let user: User = new User();
        user.userID = response.userID;
        user.emailAddress = response.emailAddress;
        user.firstName = response.firstName;
        user.lastName = response.lastName;

        this.sessionService.authenicated(user);

        this.router.navigate(['/home/home']);

    }

    private registerUserOnError(response): void {        
        this.alertService.renderErrorMessage(response.returnMessage);
        this.messageBox = this.alertService.returnFormattedMessage();       
        this.alerts = this.alertService.returnAlerts();        
        this.alertService.setValidationErrors(this, response.validationErrors);
    }
}

