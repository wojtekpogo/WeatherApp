import { Injectable } from '@angular/core';
import { HTTP } from '@ionic-native/http/ngx';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs'
import{Storage} from '@ionic/storage'

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  //variables
  apiKey ='f671eb6f10254d9abf5144258201704';
  url;
  iconurl;
  iconnumber;
  
  constructor(private httpClient: HttpClient,private storage:Storage) {
    this.url='http://api.weatherapi.com/v1/current.json?key='+this.apiKey+'&q='
    this.iconurl='//cdn.weatherapi.com/weather/64x64/day/'
   }



    GetWeather(city) :Observable<any>{
    // return this.httpClient.get('http://api.weatherapi.com/v1/current.json?key=f671eb6f10254d9abf5144258201704&q='+this.city);
     return this.httpClient.get(this.url+city) //API link attached with city variable
     
    }

    GetIcon(weather):Observable<any>
    {
      return this.httpClient.get(this.iconurl+weather+'.png')
    }




  

 
}
