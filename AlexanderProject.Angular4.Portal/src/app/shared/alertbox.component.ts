import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'alertbox',
    templateUrl: './alertbox.component.html',
    styleUrls: ['./alertbox.component.css']
})

export class AlertBoxComponent implements OnInit {

    @Input() public alerts: Array<string> = [];
    @Input() public messageBox: string;
    @Input() public delay: number;

    public showSpinner: Boolean = false;

    constructor() { }

    public ngOnInit() {

    }

    public closeAlert(i: number): void {
        this.alerts.splice(i, 1);
    }

    public closeAlertBox(): void {
        setTimeout(() => {
            this.alerts.splice(0, 1);
        }, this.delay)
    }

    public startSpinner(): void {
        //  this.showSpinner = true;
    }


}
