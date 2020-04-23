import { Component } from '@angular/core';
import {Storage} from '@ionic/storage'; //import for storage properties
import { NavController } from '@ionic/angular';
import { async } from '@angular/core/testing';
import { Geolocation } from '@ionic-native/geolocation/ngx';


@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  
  //variables
  city:string;
  

  constructor(public navCtrl:NavController, private storage:Storage,
    private geolocation:Geolocation) {  //Storage Added

    this.storage.get('country').then((val)=>{

      //if there's something there
      if(val !=null){
        let country =JSON.parse(val);
        this.city =country.city;
      }
      else{
        //set to galway as default
        this.city = 'Galway';
      }
    });
    
  }


//Save location function
//Saves the location and then passes it to URL
  saveLocation(){
    let country ={
      city:this.city
    }
    //testing
    console.log(country);

    this.storage.set('country', JSON.stringify(country));

    //navigate to homepage
   //this.navCtrl.navigateForward('/tabs/tab1');
    
  }


  //navigate to geolocation page
  openGeolocalPage()
  {
    this.navCtrl.navigateForward('/geolocation');
    //this.navCtrl.navigateRoot('/geolocation');
  }

  

}
