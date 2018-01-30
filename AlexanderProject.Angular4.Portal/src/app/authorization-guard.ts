import { Injectable, Component } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { SessionService } from "./services/session.service";
import { User } from "./entities/user.entity";

@Injectable()
export class AuthorizationGuard implements CanActivate {

    constructor(private _router: Router, private sessionService: SessionService) { }

    public canActivate() {              
        if (this.sessionService.isAuthenicated==true) return true;
        this._router.navigate(['/']);
        return false;
    }

}