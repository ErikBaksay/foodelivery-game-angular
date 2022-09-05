import { GameDataService } from './../../services/game-data.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-game-map-container',
  templateUrl: './game-map-container.component.html',
  styleUrls: ['./game-map-container.component.sass']
})
export class GameMapContainerComponent implements OnInit {

  activeVehicles : string[] = []

  constructor(private gameDataService : GameDataService) { }

  ngOnInit(): void {
    this.activeVehicles = this.gameDataService.getActiveVehicles()
    let town = document.getElementById("game-container");
    let gameContainer = document.getElementById('game-container')
    const pathWidth = 60;
    let index = -1
    this.activeVehicles.forEach((vehicleID)=>{
      index += 1        
        let vehicle = document.createElement('img')
        vehicle.id = 'car'+index
        vehicle.classList.add('path1')
        vehicle.style.position = 'absolute'
        vehicle.style.height = '30px'
        vehicle.setAttribute('src',"./../../../assets/Car1.svg")
        vehicle.style.transform = 'rotate(90deg)'
        gameContainer!.append(vehicle)
        console.log(vehicle);
        index += 1
        console.log(index);
        
        //let vehicle = document.getElementById(vehicleID);
        let pathRect = town!.getBoundingClientRect();
        console.log(pathRect);
        
        // full-width 600
        // track width 400
        // shift 15
        let path1width = 410
    
        let startingPoint = {
          x: (pathRect.width/6 + pathWidth/4).toString()+'px',
          y: (pathRect.height/6 + 10).toString()+'px', //maybe fix 10
        };
        vehicle!.style.left = startingPoint.x;
        vehicle!.style.top = startingPoint.y;
    
        /* eslint-disable */
        setTimeout(()=>{
          console.log(vehicle);
          
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
          }
        },index*1000)
      }
    )  
  }
}
