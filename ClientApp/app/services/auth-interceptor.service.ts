import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor() { }

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        const access_token = localStorage.getItem('access_token') || '';
        const copiedReq = req.clone({headers: req.headers.set('Authorization', 'Bearer ' + access_token)});

        console.log(req.url);

        if (req.url == '/api/vehicles' && ['PUT', 'POST', 'DELETE'].indexOf(req.method) !== -1)
            return next.handle(copiedReq);

        return next.handle(req);
    }
}