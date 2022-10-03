import { MainContext, WindowWithMainContext } from ".";


export class MainClientBase {

    protected readonly _sender: MainContext;

    constructor() {

        this._sender = (window as WindowWithMainContext).mainContext;
        if (!this._sender)
            throw new Error('MainContext not found');
    }
}