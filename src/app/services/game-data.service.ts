import { Save } from './../save';
import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GameDataService {

  numberOfType : {'car1':number} = {'car1':-1}
  moneyChanged = new EventEmitter()
  pricesChanged = new EventEmitter()
  save : Save = {
    money: 100,
    vehicles: ['car1'],
    prices: [100]
  }

  constructor() { }

  loadSavedGame():Save{
    let saveTemp = localStorage.getItem('savedGame')
    console.log(saveTemp);
    if (saveTemp == null){
      return this.save
    }else{
      this.save = JSON.parse(saveTemp)
      this.save.prices = this.save.prices
      return this.save
    }
  }

  resetSave(){
    this.save = {
      money: 100,
      vehicles: ['car1'],
      prices: [100]
    }
    console.log('reset');
    localStorage.setItem('savedGame',JSON.stringify(this.save))
    console.log(this.save);
    let saveTemp = localStorage.getItem('savedGame')
    console.log(saveTemp);
    
    this.loadSavedGame()
  }

  saveGame(){
    localStorage.setItem('savedGame',JSON.stringify(this.save))
  }

  addVehicle(type:string){
    this.numberOfType.car1 += 1
    this.saveGame()
  }
  getNumberOfType(){
    return this.numberOfType
  }
  earn(amount:number){
    this.save.money += amount
    this.moneyChanged.emit()
    this.saveGame()
  }
  spend(amount:number){
    this.save.money -= amount
    this.save.prices[0] = Math.trunc(this.save.prices[0]*1.5)
    this.pricesChanged.emit()
    this.moneyChanged.emit()
  }
  buy(amount:number,type:string){
    this.save.vehicles.push(type)
    this.spend(amount)
  }
  getMoneyAmount(){
    return this.save.money
  }
  getPrices(){
    return this.save.prices
  }
}
