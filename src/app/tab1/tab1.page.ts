import { Component,OnInit } from '@angular/core';
import {WeatherService} from '../weather.service';
import{Storage} from '@ionic/storage';
import { logging } from 'protractor';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page  {
weather:any;
  constructor(private weatherService:WeatherService, private storage:Storage) {} //added storage

    //store data for API
  WeatherObj ={
    temp: 0,
    description: '',
    name: '',
    img: '',
    country:'',
    condition:'',
    feels:'',
    humid:'',
    pressure:'',
    time:''
  }
  //country object to retrive a city
  country:{
    city:string;
  }
 
  //Used this Lifecycle hooks to automatically load stored location in settings
  //onIgnit didnt work
  ionViewDidEnter(){

    this.storage.get('country').then((val)=>{
      if(val!=null ){
        this.country =JSON.parse(val);

      }else{
        //set city to Galway as default
        this.country ={
          city: 'Galway',
        }
      }

      //function getWeather to take all the data from API
      this.weatherService.GetWeather(this.country.city).subscribe((data)=>{

        //get particular data from API
        this.WeatherObj.temp=data['current']['temp_c'];
        this.WeatherObj.name=data['location']['name'];
        this.WeatherObj.time=data['location']['localtime'];
        this.WeatherObj.country=data['location']['country'];
        this.WeatherObj.condition=data['current']['condition']['text'];
        this.WeatherObj.feels=data['current']['feelslike_c'];
        this.WeatherObj.humid=data['current']['humidity'];
        this.WeatherObj.img=data['current']['condition']['icon'];
        this.WeatherObj.pressure=data['current']['pressure_mb'];
      });
    });
    
    

  }
  
}
