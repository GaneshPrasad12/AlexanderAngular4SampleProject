import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
//import { Observable } from 'rxjs/Observable';
import { Headers, RequestOptions } from '@angular/http';
import { SessionService } from '../services/session.service';
import { BlockUIService } from './blockui.service';

import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';


@Injectable()
export class HttpService {

    constructor(private http: Http, private blockUIService: BlockUIService) {
    }

    public httpPost(object: any, url: string): Observable<any> {

        this.blockUIService.blockUIEvent.emit({
            value: true
        });
     
        let body = JSON.stringify(object);

        let headers = new Headers();      
        headers.append("Content-Type", "application/json; charset=utf-8");
        headers.append('Accept', 'q=0.8;application/json;q=0.9');
   
        if (typeof (Storage) !== "undefined") {

            let token = localStorage.getItem("AlexanderProject.Angular4.Token");
            headers.append('Authorization', token);
        }

        let options = new RequestOptions({ headers: headers });

        return this.http.post(url, body, options ).map((response) => this.parseResponse(response, this.blockUIService, true))
            .catch((err) => this.handleError(err, this.blockUIService, true));

    }


    public httpPostWithNoBlock(object: any, url: string): Observable<any> {

        let body = JSON.stringify(object);

        let headers = new Headers();      
        headers.append("Content-Type", "application/json; charset=utf-8");
        headers.append('Accept', 'q=0.8;application/json;q=0.9');

        if (typeof (Storage) !== "undefined") {

            let token = localStorage.getItem("AlexanderProject.Angular4.Token");
            headers.append('Authorization', token);
        }

        let options = new RequestOptions({ headers: headers });

        return this.http.post(url, body, options).map((response) => this.parseResponse(response, this.blockUIService, false))
            .catch((err) => this.handleError(err, this.blockUIService, false));

    }


    private handleError(error: any, blockUIService: BlockUIService, blocking: Boolean) {

        let body = error.json();

        if (blocking) {
            blockUIService.blockUIEvent.emit({
                value: false
            });
        }
     
        return Observable.throw(body);

    }

    private parseResponse(response: Response, blockUIService: BlockUIService, blocking: Boolean) {

        let authorizationToken = response.headers.get("Authorization");
        if (authorizationToken != null) {

            if (typeof (Storage) !== "undefined") {
                localStorage.setItem("AlexanderProject.Angular4.Token", authorizationToken);
            }
        }

        if (blocking) {
            blockUIService.blockUIEvent.emit({
                value: false
            });
        }
     
        let body = response.json();

        return body;
    }


}
