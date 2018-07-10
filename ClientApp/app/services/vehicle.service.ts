import { Vehicle } from './../models/vehicle';
import { SaveVehicle } from './../models/saveVehicle';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {
  private readonly vehiclesEndpoint = '/api/vehicles';

  constructor(private http: HttpClient) { }

  getMakes() {
    return this.http
      .get<any>('/api/makes');
  }
  
  getFeatures() {
    return this.http
      .get<any>('/api/features');
  }

  getVehicle(id: any) {
    return this.http
      .get<Vehicle>(this.vehiclesEndpoint + '/' + id);
  }

  getVehicles(filter: any) {
    return this.http
      .get<any>(this.vehiclesEndpoint + '?' + this.toQueryString(filter));
  }

  private toQueryString(obj: any): string {
    return Object.keys(obj)
      .filter(key => obj[key] != null && obj[key] != undefined)
      .map(key => encodeURIComponent(key) + '=' + obj[key])
      .join('&');
  }

  createVehicle(vehicle: any) {
    return this.http
      .post<Vehicle>(this.vehiclesEndpoint, vehicle);
  }

  update(vehicle: SaveVehicle) {
    return this.http
      .put<Vehicle>(this.vehiclesEndpoint + '/' + vehicle.id, vehicle);
  }
  
  delete(id: number) {
    return this.http
      .delete(this.vehiclesEndpoint + '/' + id);
  }
}
