import { Component, Input, OnInit} from '@angular/core';

 

@Component({
  selector: 'app-percent-bar',
  templateUrl: './percent-bar.component.html',
  styleUrls: ['./percent-bar.component.scss']
})
export class PercentBarComponent implements OnInit{  

  @Input() item : any = null; 
  percentage : number = 60;
  percent_string : string = ""; 
  caption: any = "xxxxx";  
  

  constructor(      
  ) {   
    
  }  

  ngOnDestroy(){ 
  }

  ngOnInit(): void {    
    this.percentage = this.item.score * 10; //0-10 * 10 = percentage 
    this.caption =this.item.name;  

    this.percent_string = this.percentage + "px";
  } 
}
