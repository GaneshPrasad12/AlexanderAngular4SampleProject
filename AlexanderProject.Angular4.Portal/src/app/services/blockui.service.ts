import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class BlockUIService {

    public blockUIEvent: EventEmitter<any>;

    constructor() {
        this.blockUIEvent = new EventEmitter();
    }

    public startBlock() {
        this.blockUIEvent.emit(true);
    }

    public stopBlock() {
        this.blockUIEvent.emit(false);
    }
}