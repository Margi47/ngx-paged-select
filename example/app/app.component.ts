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
    var filteredCities = CITIES.filter(x => x.name.toLowerCase().indexOf(data.filter) == 0);
    this.allCities = filteredCities.slice(0, (data.page-1)*10+10);

console.log(this.allCities);
console.log(filteredCities);

    if(this.allCities.length == filteredCities.length){
      this.hasMoreOptions = false;
      console.log(this.hasMoreOptions);
    }
  }
  
  showCity(data){
    this.selectedOption = data;
  }
}
