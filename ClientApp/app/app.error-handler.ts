import { ErrorHandler, Inject, Injectable, Injector, NgZone, isDevMode } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import * as Raven from 'raven-js';

@Injectable()
export class AppErrorHandler implements ErrorHandler {
    

    constructor(private ngZone: NgZone, private injector: Injector) {
        
    }

    handleError(error: any): void {
        const toastrService = this.injector.get(ToastrService);
        this.ngZone.run(() => {
            toastrService.error('An unexpected error happened', 'Error', {
                timeOut: 5000,
                closeButton: true
              });
        });
        console.log('Development: ', isDevMode().valueOf());
        if (isDevMode().valueOf()) {
            throw error;
        } else {
            Raven.captureException(error.originalError || error);
        }
    }

}