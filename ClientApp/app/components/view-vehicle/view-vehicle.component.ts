import { AuthService } from './../../services/auth.service';
import { PhotoService } from './../../services/photo.service';

import { VehicleService } from './../../services/vehicle.service';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpEvent, HttpEventType, HttpErrorResponse } from '@angular/common/http';

@Component({
  templateUrl: 'view-vehicle.component.html',
  styleUrls: ['view-vehicle.component.scss']
})
export class ViewVehicleComponent implements OnInit {
  @ViewChild('fileInput') fileInput: ElementRef | undefined;
  photos: any[] = [];
  vehicle: any;
  vehicleId: number = 0; 
  progress: any;

  constructor(
    private route: ActivatedRoute, 
    private router: Router,
    private toastrService: ToastrService,
    private vehicleService: VehicleService,
    private photoService: PhotoService,
    public auth: AuthService
  ) { 

    route.params.subscribe(p => {
      this.vehicleId = +p['id'];
      if (isNaN(this.vehicleId) || this.vehicleId <= 0) {
        router.navigate(['/vehicles']);
        return; 
      }
    });
  }

  ngOnInit() { 
    this.photoService
        .getPhotos(this.vehicleId)
        .subscribe( photos => this.photos = photos);
    this.vehicleService.getVehicle(this.vehicleId)
      .subscribe(
        v => this.vehicle = v,
        err => {
          if (err.status == 404) {
            this.router.navigate(['/vehicles']);
            return; 
          }
        });
  }

  delete() {
    if (confirm("Are you sure?")) {
      this.vehicleService.delete(this.vehicle.id)
        .subscribe(x => {
          this.router.navigate(['/vehicles']);
        });
    }
  }

  uploadPhoto() {
    //these ifs are just because TS Lint was bugging and not letting the app compile
    if(this.fileInput) {
      const nativeElement: any = this.fileInput.nativeElement;
      const file = nativeElement.files[0];
      nativeElement.value = '';
      this.photoService
        .upload(this.vehicleId, file)
        .subscribe((response: HttpEvent<Object>) => {
          if(response.type === HttpEventType.UploadProgress) {
            const progress = ((response.loaded / (response.total || response.loaded ))*100).toFixed(2);
            console.log(`${progress}%`) ;
            this.progress = progress;
          }
          if (response.type === HttpEventType.Response) {
            this.photos.push(response.body);
          }
        }, 
        (err: HttpErrorResponse) => {
          this.toastrService.error(err.error, 'Error', {
            timeOut: 5000,
            closeButton: true
          });
        },
        () => {
          this.progress = null;
        });
    }
  }
} 