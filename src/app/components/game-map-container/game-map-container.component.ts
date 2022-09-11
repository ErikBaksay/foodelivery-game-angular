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
    console.log(window.innerWidth);
    console.log(window.innerHeight);
    if (window.innerWidth > 700 && window.innerHeight > 700){
      this.scale = 1
    }else{
      this.scale = 0.75
    }
    console.log('scale',this.scale);
    
  }

  activeVehicles : string[] = []
  intervals:any[]=[]
  money:number = this.gameDataService.getMoneyAmount()
  prices : number[] = this.gameDataService.getPrices()
  save : Save = this.gameDataService.loadSavedGame()
  scale = 1

  constructor(private gameDataService : GameDataService) { }

  ngOnInit(): void {
    if (window.innerWidth > 700 && window.innerHeight > 700){
      this.scale = 1
    }else{
      this.scale = 0.75
    }
    this.save = this.gameDataService.loadSavedGame()
    this.money = this.gameDataService.getMoneyAmount()
    this.prices = this.gameDataService.getPrices()
    this.activeVehicles = this.gameDataService.getActiveVehicles()
    this.gameDataService.moneyChanged.subscribe(()=>{this.money = this.gameDataService.getMoneyAmount()})
    this.gameDataService.pricesChanged.subscribe(()=>{this.prices = this.gameDataService.getPrices(),console.log(this.prices);
    })
    let index = -1
    this.activeVehicles.forEach((vehicle)=>{
      console.log('hello');
      index++
      this.gameDataService.addVehicle(vehicle)
      setTimeout(()=>{this.spawnVehicle()},500*index)
    })
  }

  buy(type:string){
    if (this.money >= this.prices[0]){
      this.gameDataService.addVehicle(type)
      this.activeVehicles = this.gameDataService.getActiveVehicles()
      this.gameDataService.spend(this.prices[0])
      this.spawnVehicle()
    } 
  }
  spawnVehicle(){
    let index = this.gameDataService.getNumberOfType().car1
    index++
    let town = document.getElementById("game-container");
    let gameContainer = document.getElementById('game-container')
    const pathWidth = 60*this.scale; 
    let vehicle = document.createElement('img')
    vehicle.id = 'car'+index
    vehicle.classList.add('path1')
    vehicle.style.position = 'absolute'
    vehicle.style.height = 30*this.scale+'px'
    vehicle.setAttribute('src',"./../../../assets/Car1.svg")
    vehicle.style.transform = 'rotate(90deg)'
    gameContainer!.append(vehicle)
    console.log(vehicle);
    index += 1
    console.log(index);
    
    let pathRect = town!.getBoundingClientRect();
    console.log(pathRect);
    
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
  //clearInterval(id:number){
  //  console.log(this.intervals);
  //  clearInterval(this.intervals[id])
  //  this.intervals.splice(id,1)
  //  console.log(this.intervals);
  //}
}
