import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Car } from '../domain/Car';

@Injectable({
  providedIn:'root'
})
export class CarService {

    constructor(private http: HttpClient) {}

    
}
