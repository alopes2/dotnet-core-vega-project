import { AuthService } from './../../services/auth.service';
import { KeyValuePair } from './../../models/keyValuePair';
import { VehicleService } from './../../services/vehicle.service';
import { Vehicle } from './../../models/vehicle';
import { Component, OnInit } from '@angular/core';
import { Make } from '../../models/make';

@Component({
  selector: 'vg-vehicles-list',
  templateUrl: './vehicles-list.component.html',
  styleUrls: ['./vehicles-list.component.css']
})
export class VehiclesListComponent implements OnInit {
  vehicles: Vehicle[] = [];
  // allVehicles: Vehicle[] = [];
  queryResult: any = {
    totalItems: 0
  };
  makes: Make[] = [];
  models: KeyValuePair[] = [];
  query: any = {
    pageSize: 3
  };
  columns: any[] = [
    { title: 'Id'},
    { title: 'Make', key: 'make', isSortable: true},
    { title: 'Model', key: 'model', isSortable: true},
    { title: 'Contact Name', key: 'contactName', isSortable: true},
    { }
  ];

  constructor(
    private vehicleService: VehicleService,
    public auth: AuthService
  ) { }

  ngOnInit() {
    this.vehicleService
      .getMakes()
      .subscribe(makes => {
        this.makes = makes;
        console.log('Makes: ', this.makes);
      });
    this.populateVehicles();
  }

  private populateVehicles() {
    this.vehicleService
      .getVehicles(this.query)
      // .subscribe(vehicles => this.vehicles = this.allVehicles = vehicles);
      .subscribe(result => this.queryResult = result);
  }

  onFilterChange(event: any) {
    this.query.page = 1;
    this.populateVehicles();
    
    if (event && event.srcElement.id === 'make') {
      const selectedMake = this.makes.find(m => m.id == this.query.makeId);
      this.models = selectedMake ? 
        selectedMake.models :
        [];
    }
    // let vehicles = this.allVehicles.slice();

    // if (this.filter.makeId) {
    //   vehicles = vehicles.filter(v => v.make.id == this.filter.makeId);
    // }

    // if (this.filter.modelId) {
    //   vehicles = vehicles.filter(v => v.model.id == this.filter.modelId);
    // }

    // this.vehicles = vehicles;
  }

  sortBy(columnName: string) {
    if (this.query.sortBy === columnName) {
      this.query.isSortAscending = !this.query.isSortAscending;
    } else {
      this.query.sortBy = columnName;
      this.query.isSortAscending = true;
    }

    this.populateVehicles();
  }

  onPageChange(page: number) {
    this.query.page = page;
    this.populateVehicles();
  }

  onResetFilter() {
    this.query = {
      page: 1,
      pageSize: 3
    };
    this.populateVehicles();
  }

}
