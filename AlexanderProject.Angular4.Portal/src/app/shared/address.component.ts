import { Component, OnInit, Input } from '@angular/core';
import { Address } from '../entities/address.entity'

@Component({
    selector: 'address-form',
    templateUrl: './address.component.html'
})

export class AddressComponent implements OnInit {

    @Input() public address: Address;

    constructor() { }

    public ngOnInit() {

    }

 

}