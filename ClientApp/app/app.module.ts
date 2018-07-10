import { AuthGuard } from './services/auth-guard.service';
import { NgModule, ErrorHandler } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './components/app/app.component';
import { NavMenuComponent } from './components/navmenu/navmenu.component';
import { HomeComponent } from './components/home/home.component';
import { FetchDataComponent } from './components/fetchdata/fetchdata.component';
import { CounterComponent } from './components/counter/counter.component';
import { VehicleFormComponent } from './components/vehicle-form/vehicle-form.component';
import { VehiclesListComponent } from './components/vehicles-list/vehicles-list.component';
import { PaginationComponent } from './components/shared/pagination/pagination.component';
import { ViewVehicleComponent } from './components/view-vehicle/view-vehicle.component';
import { AdminComponent } from './components/admin/admin.component';
import { AdminAuthGuard } from './services/admin-auth-guard.service';
import { AuthInterceptor } from './services/auth-interceptor.service';

import { ToastrModule } from 'ngx-toastr';
import { ChartModule } from 'angular2-chartjs';
import { AppErrorHandler } from './app.error-handler';
import * as Raven from 'raven-js';

Raven
  .config('https://95fd279855184f8cb39398e9e921caa4@sentry.io/1233051')
  .install();

@NgModule({
    declarations: [
        AppComponent,
        NavMenuComponent,
        CounterComponent,
        FetchDataComponent,
        HomeComponent,
        VehicleFormComponent,
        VehiclesListComponent,
        PaginationComponent,
        ViewVehicleComponent,
        AdminComponent
    ],
    imports: [
        ChartModule,
        CommonModule,
        HttpClientModule,
        FormsModule,
        ToastrModule.forRoot({
            timeOut: 5000,
            positionClass: 'toast-top-right'
          }),
        RouterModule.forRoot([
            { path: '', redirectTo: 'vehicles', pathMatch: 'full' },
            { path: 'admin', component: AdminComponent, canActivate: [AdminAuthGuard]},
            { path: 'vehicles', component: VehiclesListComponent},
            { path: 'vehicles/new', component: VehicleFormComponent, canActivate: [AuthGuard]},
            { path: 'vehicles/edit/:id', component: VehicleFormComponent, canActivate: [AuthGuard]},
            { path: 'vehicles/:id', component: ViewVehicleComponent},
            { path: 'home', component: HomeComponent },
            { path: 'counter', component: CounterComponent },
            { path: 'fetch-data', component: FetchDataComponent },
            { path: '**', redirectTo: 'vehicles' }
        ])
    ],
    providers: [
        {provide: ErrorHandler, useClass: AppErrorHandler},
        {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
    ]
})
export class AppModuleShared {
}
