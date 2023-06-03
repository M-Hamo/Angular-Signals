import { Component, Signal } from '@angular/core';
import { NgFor, NgClass, NgIf, AsyncPipe } from '@angular/common';
import { VehicleService } from '../vehicle.service';
import { Vehicle } from '../vehicle';

@Component({
  selector: 'sw-vehicle-list',
  standalone: true,
  imports: [AsyncPipe, NgClass, NgFor, NgIf],
  templateUrl: './vehicle-list.component.html',
})
export class VehicleListComponent {
  constructor(private vehicleService: VehicleService) {}

  public vehicles: Signal<Vehicle[] | undefined> = this.vehicleService.vehicles;

  public selectedVehicle: Signal<Vehicle | undefined> =
    this.vehicleService.selectedVehicle;

  pageTitle = 'Vehicles';
  errorMessage = '';

  // When a vehicle is selected, emit the selected vehicle name
  onSelected(vehicleName: string): void {
    this.vehicleService.vehicleSelected(vehicleName);
  }
}
