import { Component, Input, OnInit } from '@angular/core'; 
import { Colors } from '../../shared/icon-colors.data';

@Component({
  selector: 'app-circle-bar',
  templateUrl: './circle-bar.component.html',
  styleUrls: ['./circle-bar.component.scss'],
})
export class CircleBarComponent implements OnInit {
  @Input() item: any = null;
  percentage: number = 60;
  color: string = '#eeeeee'; 
  icon: any = 'https://cdn.tokedelivers.com/icons/Allspice.svg'; //TODO: transfer this to cnd path config 
  icon_color : string  = 'red';  
  percentage_string: string = '0,100'; //percentage left 
  caption: any = '';

  constructor() {} 
  ngOnDestroy() {} 
  ngOnInit(): void {  
    if( Colors[this.item.icon]  ) {
      this.icon_color =  Colors[this.item.icon];
      this.icon = `https://cdn.tokedelivers.com/icons/${this.item.icon}.svg`;  
      this.icon = this.icon.replace(" ","%20");
    }   

    let percentage  =  this.item.score * 10; //0 to 10 * 10 = percentage 
    this.percentage_string = 100 -  percentage + ',100'; 
    this.caption = this.item.name;   
  }
}
