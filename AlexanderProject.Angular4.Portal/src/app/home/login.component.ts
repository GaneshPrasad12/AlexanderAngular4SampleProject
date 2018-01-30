import { Component } from '@angular/core';
import { User } from '../entities/user.entity';

import { AlertBoxComponent } from '../shared/alertbox.component';
import { UserService } from '../services/user.service';
import { HttpService } from '../services/http.service';
import { AlertService } from '../services/alert.service';
import { SessionService } from '../services/session.service';
import { Router } from '@angular/router';

@Component({
    templateUrl: './login.component.html'
})

export class LoginComponent {

    public title: string = 'Login';
    public emailAddress: string = "";
    public password: string = "";
    public messageBox: string;
    public alerts: Array<string> = [];

    constructor(private userService: UserService, private sessionService: SessionService, private alertService: AlertService, private router: Router) {
        this.emailAddress = "";
        this.password = "";
    }

    public login($event) {

        let user: User = new User();
        user.emailAddress = this.emailAddress;
        user.password = this.password;

        let email = user.emailAddress;

        this.userService.login(user)
            .subscribe(
            response => this.loginOnSuccess(response),
            response => this.loginOnError(response));

    }

    private loginOnSuccess(response: User) {

        this.sessionService.authenicated(response);

        this.router.navigate(['/home/home']);

    }

    private loginOnError(response: User) {
        this.alertService.renderErrorMessage(response.returnMessage);
        this.messageBox = this.alertService.returnFormattedMessage();
        this.alerts = this.alertService.returnAlerts();
    }
} 
