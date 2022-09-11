import { Save } from './../save';
import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GameDataService {

  activeVehicles : string[] = ['car1','car1']
  numberOfType : {'car1':number} = {'car1':-1}
  money : number = 100
  moneyChanged = new EventEmitter()
  pricesChanged = new EventEmitter()
  prices : number[] = [100] 
  save : Save = {
    money: 100,
    vehicles: [],
    prices: [100]
  }

  constructor() { }

  loadSavedGame():Save{
    let saveTemp = localStorage.getItem('savedGame')
    if (saveTemp == null){
      return this.save
    }else{
      this.save = JSON.parse(saveTemp)
      return this.save
    }
  }

  saveGame(){
    localStorage.setItem('savedGame',JSON.stringify(this.save))
  }

  addVehicle(type:string){
    console.log(this.numberOfType);
    this.activeVehicles.push(type)
    this.numberOfType.car1 += 1
    console.log(this.numberOfType);
    
  }
  getActiveVehicles(){
    return this.activeVehicles
  }
  getNumberOfType(){
    return this.numberOfType
  }
  earn(amount:number){
    this.money += amount
    console.log('earned '+amount+', money:',this.money); 
    this.moneyChanged.emit()
  }
  spend(amount:number){
    this.money -= amount
    console.log('spent '+amount+', money:',this.money); 
    this.prices[0] = Math.trunc(this.prices[0]*1.5)
    this.pricesChanged.emit()
    this.moneyChanged.emit()
  }
  getMoneyAmount(){
    return this.money
  }
  getPrices(){
    return this.prices
  }
}
