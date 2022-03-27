import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styles: [
  ]
})
export class HomePageComponent implements OnInit {

  
  constructor() { 
   
  }

  ngOnInit(): void {
    document.getElementById('nextBTN')?.click();
  }

}
