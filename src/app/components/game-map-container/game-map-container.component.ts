import { Save } from './../../save';
import { GameDataService } from './../../services/game-data.service';
import { Component, OnInit, HostListener } from '@angular/core';

@Component({
  selector: 'app-game-map-container',
  templateUrl: './game-map-container.component.html',
  styleUrls: ['./game-map-container.component.sass']
})
export class GameMapContainerComponent implements OnInit {

  @HostListener('window:resize', ['$event'])
  onResize(event:any) {
    console.log(window.innerWidth,window.innerHeight);
    
    if (window.innerWidth > 700 && window.innerHeight > 700){
      if (this.scale !=1){
        this.scale = 1
        this.reload()
      }
    }else if (window.innerWidth > 480 && window.innerHeight > 480){
      if (this.scale !=0.75){
        this.scale = 0.75
        this.reload()
      }
    }else{
      if (this.scale !=0.5){
        this.scale = 0.5
        this.reload()
      }
    }
    
    
  }

  intervals:any[]=[]
  money:number = this.gameDataService.getMoneyAmount()
  prices : number[] = this.gameDataService.getPrices()
  save : Save = this.gameDataService.loadSavedGame()
  scale = 1
  index = -1

  constructor(private gameDataService : GameDataService) { }

  ngOnInit(): void {
    if (window.innerWidth > 700 && window.innerHeight > 700){
      this.scale = 1
    }else if (window.innerWidth > 480 && window.innerHeight > 480){
      this.scale = 0.75
    }else{
      this.scale = 0.5
    }
    this.save = this.gameDataService.loadSavedGame()
    this.money = this.gameDataService.getMoneyAmount()
    this.prices = this.gameDataService.getPrices()
    this.gameDataService.moneyChanged.subscribe(()=>{this.money = this.gameDataService.getMoneyAmount()})
    this.gameDataService.pricesChanged.subscribe(()=>{this.prices = this.gameDataService.getPrices(),console.log(this.prices);})
    let tempIndex = -1
    this.gameDataService.save.vehicles.forEach((vehicle)=>{
      tempIndex++
      this.gameDataService.addVehicle(vehicle)
      setTimeout(()=>{this.spawnVehicle(false)},500*tempIndex)
    })
  }

  buy(type:string){
    if (this.money >= this.prices[0]){
      this.gameDataService.addVehicle(type)
      this.gameDataService.buy(this.prices[0],'car1')
      this.spawnVehicle(true)
    } 
  }
  spawnVehicle(isNew:boolean){
    this.gameDataService.addVehicle('car1')
    this.index++
    let town = document.getElementById("game-container");
    let gameContainer = document.getElementById('game-container')
    const pathWidth = 60*this.scale; 
    let vehicle = document.createElement('img')
    vehicle.id = 'car'+this.index
    vehicle.classList.add('path1')
    vehicle.style.position = 'absolute'
    vehicle.style.height = 30*this.scale+'px'
    vehicle.setAttribute('src',"./../../../assets/Car1.svg")
    vehicle.style.transform = 'rotate(90deg)'
    gameContainer!.append(vehicle)
    let pathRect = town!.getBoundingClientRect();
    
    // full-width 600
    // track width 400
    // shift 15
    let path1width = 410*this.scale

    let startingPoint = {
      x: (pathRect.width/6 + pathWidth/4).toString()+'px',
      y: (pathRect.height/6 + 10).toString()+'px', //maybe fix 10
    };
    vehicle!.style.left = startingPoint.x;
    vehicle!.style.top = startingPoint.y;
      
    if (vehicle!.classList.contains("path1")) {
      vehicle!.animate(
        [
          {
            transform: "translate(0px, 0px) rotate(90deg)", 
            offset: 0,
          },
          {
            transform: "translate(" + (path1width - pathWidth).toString() + "px, 0px) rotate(90deg)", 
            offset: 0.24,
          },
          {
            transform: "translate(" + (path1width - pathWidth).toString() + "px, 0px) rotate(180deg)", 
            offset: 0.25,
          },
          {
            transform:
              "translate("+(path1width - pathWidth).toString()+ "px, " + (path1width - pathWidth).toString() + "px) rotate(180deg)",
            offset: 0.49,
          },
          {
            transform:
              "translate("+(path1width - pathWidth).toString()+ "px, " + (path1width - pathWidth).toString() + "px) rotate(270deg)",
            offset: 0.5,
          },
          {
            transform:
              "translate( 0px, "+ (path1width - pathWidth).toString() + "px) rotate(270deg)",
            offset: 0.74,
          },
          {
            transform:
              "translate( 0px, "+ (path1width - pathWidth).toString() + "px) rotate(360deg)",
            offset: 0.75,
          },
          {
            transform:
              "translate(0px, 0px) rotate(360deg)",
            offset: 0.99,
          },
          {
            transform:
              "translate(0px, 0px) rotate(450deg)",
            offset: 1,
          },
        ],
        {
          duration: 10000,
          iterations: Infinity,
        }
      );
      this.intervals.push(setInterval(()=>{this.earn(20)},1000))
    }
  }
  
  earn(amount:number){
    this.gameDataService.earn(amount)
  }

  reload(){
    let gameContainerChildren = document.getElementById('game-container')!.children
    while ( gameContainerChildren.length > 1 ){
      gameContainerChildren[1].remove()
      this.intervals.forEach((interval)=>{
        clearInterval(interval)
      })
    }     
    let tempIndex = -1
    this.gameDataService.save.vehicles.forEach((vehicle)=>{
      tempIndex++
      this.gameDataService.addVehicle(vehicle)
      setTimeout(()=>{this.spawnVehicle(false)},500*tempIndex)
    })
  }
  
  reset(){
    this.gameDataService.resetSave()
    this.reload()
    this.money = this.gameDataService.getMoneyAmount()
    this.prices = this.gameDataService.getPrices()
  }

  //clearInterval(id:number){
  //  console.log(this.intervals);
  //  clearInterval(this.intervals[id])
  //  this.intervals.splice(id,1)
  //  console.log(this.intervals);
  //}
}
