import { Component, OnInit } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';  //added geolocation
import{Storage} from '@ionic/storage';
import {WeatherService} from '../weather.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-geolocation',
  templateUrl: './geolocation.page.html',
  styleUrls: ['./geolocation.page.scss'],
})
export class GeolocationPage{
  //variables
  long:number
  lat:number
  
  //added geolocation, weather service and navcontroller as an argument to constructor
  constructor(private geolocation:Geolocation, 
    private storage:Storage,public navCtrl:NavController,
    private weatherService:WeatherService) { 
    
    this.storage.get('location').then((val)=>{

      //if there's something there
      if(val !=null){
        let location =JSON.parse(val);
        this.long =location.long;
        this.lat = location.lat;
      }
      else{
        //default coordinates
        this.long = 53.4239;
        this.lat = 7.9407;
      }
    });
  } //added as an argument in the constructor

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
     //location object to get a location from storage
  location:{
    lat:number;
    long:number;
  }

  ionViewWillEnter() {
    //--------------------------------------------------------------------------------
    //for location
    this.storage.get('location').then((value)=>{  //it returns the promise hence .then
      if(value!=null){
        this.location =JSON.parse(value);
        //this.long =location.long;
        //this.lat = location.lat;
      }else{
        //set city to Galway as default
        this.location ={
          lat: 0,
          long: 0
        }
      }

      //function getWeather to take all the data from API
      this.weatherService.GetLocation(this.location.lat, this.location.long).subscribe((data)=>{

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


  //get location function
  getLocation()
  {
    this.geolocation.getCurrentPosition().then((resp) => {
      this.lat = resp.coords.latitude
      this.long = resp.coords.longitude
      
      //combine them with ',' to pass to the api
      //this.city2 = this.lat+','+this.long;
      console.log(this.lat, this.long);
     }).catch((error) => {
       console.log('Error getting location', error);
     });

     let location ={
      lat:this.lat,
      long:this.long,
   
    }
    this.storage.set('location', JSON.stringify(location));
    //testing
    console.log(location);
    this.navCtrl.navigateForward('/geolocation');
  
  }
  backToSettings()
  {
    this.navCtrl.navigateForward('/tabs/tab3');
  }
}
