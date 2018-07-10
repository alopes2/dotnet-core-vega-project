import { HttpClient, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class PhotoService {

    constructor(private http: HttpClient) { }

    upload(vehicleId: number, photo: any) {
        const formData = new FormData();
        formData.append('file', photo);

        // const req = new HttpRequest('POST',
        //         `/api/vehicles/${vehicleId}/photos`,
        //       formData,
        //       {reportProgress: true});
        // return this.http.request(req);
        return this.http
            .post(`/api/vehicles/${vehicleId}/photos`, formData, {observe: 'events', reportProgress: true});
    }

    getPhotos(vehicleId: number) {
        return this.http
            .get<any>(`/api/vehicles/${vehicleId}/photos`);
    }
}