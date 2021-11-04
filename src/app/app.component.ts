import { Component } from '@angular/core';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

@Injectable({
  providedIn: 'root'
})

export class AppComponent {
  title = 'Cypress-Vorstellung';
  gemuese:string[] = [];
  frucht:string ="";
  selected:number = 0;

  times:TimeFrame[] = [
        { frame: "Mehrmal in der Woche" , num: 1},
        { frame: "Einmal pro Woche" , num: 2},
        { frame: "Einmal pro Monat" , num: 3},
        { frame: "Einmal pro Jahr" , num: 4},
        { frame: "Keine Ahnung" , num: 5}
  ];

  constructor(private http: HttpClient){
  this.http.get('assets/gemuese.txt', {responseType: 'text'}).subscribe(data => {this.gemuese = data.replace(/[\r\n]/g,'').split(';')});
  }

  status:number = 0;

  public clickTesten(){    
    this.status = 1;
  }
  clickSpass(){
    this.status = 2;
  }
  
  clickKeinSpass(){
    this.status = 3;  
  }
  clickNeuerVersuch(){
    this.status = 1;  
  }

  clickBesteFrucht(){
    if(this.frucht){
      this.status = 4;
    }
  }

  isGemuese():boolean{
    let gemueseBool = false;
    this.gemuese.forEach(element => {
      if(this.frucht.toLowerCase() === element.toLowerCase()){
        gemueseBool = true;
      }
    });
    return gemueseBool;
  }

  clickKP(){
    if(this.selected){
      this.status= 5;
    }
  }

  changeSelection(event:number){
    this.selected =event;
    
  }

}
interface TimeFrame{
  frame:string;
  num:number;
}