import { Component, OnInit } from '@angular/core';
import { flipAnimation  } from 'src/app/shared/animations';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
  animations: [flipAnimation],
})
export class LandingComponent implements OnInit {

  step : number = 1; 

  constructor() { }

  ngOnInit(): void {
  }

}
