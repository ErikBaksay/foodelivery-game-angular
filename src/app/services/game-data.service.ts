import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GameDataService {

  activeVehicles : string[] = ['car0','car1','car2']

  constructor() { }

  addVehicle(type:string){
    this.activeVehicles.push(type)
  }
  getActiveVehicles(){
    return this.activeVehicles
  }

}
