import { Component, OnInit } from '@angular/core';
import {CITIES} from './mock-cities';
import {City} from './city';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  allCities: City[];
  hasMoreOptions = true;
  selectedOption: City;
  
  ngOnInit(){
    this.allCities = CITIES.slice(0, 10);
  }
  
  loadData(data){
    var nextData = CITIES.slice((data.page-1)*10, (data.page-1)*10+10);
    this.allCities = this.allCities.concat(nextData);
    if(data.page == 4){
      this.hasMoreOptions = false;
    }
  }
  
  showCity(data){
    this.selectedOption = data;
    console.log(this.selectedOption);
  }
}
