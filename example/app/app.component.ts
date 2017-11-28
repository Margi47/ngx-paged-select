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
  hasMoreOptions: boolean;
  selectedOptions: any;
  multiple: boolean;
  
  ngOnInit(){
    this.hasMoreOptions = true;
    this.multiple = false;
  }
  
  loadData(data){
    var filteredCities = CITIES.filter(x => x.name.toLowerCase().indexOf(data.filter) == 0);
    this.allCities = filteredCities.slice(0, (data.page-1)*10+10);

    if(this.allCities.length == filteredCities.length){
      this.hasMoreOptions = false;
    }
  }
  
  showCity(data){       
      this.selectedOptions = data;
  }
  
  toggleMultiple(){
      this.multiple = !this.multiple;
      this.selectedOptions = null;
  }
}
