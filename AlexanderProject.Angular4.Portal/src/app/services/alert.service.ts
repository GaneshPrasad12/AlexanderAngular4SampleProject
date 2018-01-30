
import { Injectable } from '@angular/core';

@Injectable()
export class AlertService {

    private alerts = [];
    private messageBox = "";

    constructor() { }

    setValidationErrors(scope, validationErrors) {       
        for (var prop in validationErrors) {
            var property = prop + "InputError";
            scope[property] = true;
        }
    }

    returnFormattedMessage() {
        return this.messageBox;
    }

    returnAlerts() {
        return this.alerts;
    }

    renderErrorMessage(message) {

        let messageBox = this.formatMessage(message);   
        this.alerts = [];
        this.messageBox = messageBox;
        this.alerts.push({ msg: messageBox, type: 'danger', closable: true });

    };

    renderSuccessMessage(message) {

        let messageBox = this.formatMessage(message);

        this.alerts = [];
        this.messageBox = messageBox;
        this.alerts.push({ msg: messageBox, type: 'success', closable: true });

    };

    renderWarningMessage(message) {

        let messageBox = this.formatMessage(message);

        this.alerts = [];
        this.messageBox = messageBox;
        this.alerts.push({ msg: messageBox, type: 'warning', closable: true });

    };

    renderInformationalMessage(message) {

        let messageBox = this.formatMessage(message);

        this.alerts = [];
        this.messageBox = messageBox;
        this.alerts.push({ msg: messageBox, type: 'info', closable: true });

    };

    formatMessage(message) {

        let messageBox = "";

        if (Array.isArray(message) == true ) {      
            for (var i = 0; i < message.length; i++) {
                messageBox = messageBox + message[i] + "<br/>";
            }
        }
        else {
            messageBox = message;
        }

        return messageBox;

    }

}
