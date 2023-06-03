import { Component, Signal, computed } from '@angular/core';
import { AsyncPipe, DecimalPipe, NgFor, NgIf } from '@angular/common';
import { catchError, EMPTY, map, tap } from 'rxjs';
import { CartService } from 'src/app/cart/cart.service';
import { Film, Vehicle } from '../vehicle';
import { VehicleService } from '../vehicle.service';

@Component({
  selector: 'sw-vehicle-detail',
  standalone: true,
  imports: [AsyncPipe, NgFor, NgIf, DecimalPipe],
  templateUrl: './vehicle-detail.component.html',
})
export class VehicleDetailComponent {
  constructor(
    private vehicleService: VehicleService,
    private cartService: CartService
  ) {}

  public vehicle: Signal<Vehicle | undefined> =
    this.vehicleService.selectedVehicle;

  public pageTitle: Signal<string> = computed(() =>
    this.vehicle() ? `Detail for: ${this.vehicle()?.name}` : ''
  );

  public vehicleFilms: Signal<Film[] | undefined> =
    this.vehicleService.vehicleFilms;

  errorMessage = '';

  addToCart(vehicle: Vehicle) {
    this.cartService.addToCart(vehicle);
  }
}
