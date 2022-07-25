import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core'; 

@Component({
  selector: 'app-register-payment-box',
  templateUrl: './payment-box.component.html',
  styleUrls: ['./payment-box.component.scss'] 
})
export class PaymenBoxComponent implements OnInit {

  @Input() step : number = 1;
  @Output() new_step = new EventEmitter<any>();
  
  constructor() { }

  ngOnInit(): void {
  }

  public clickStep(_step){
    this.new_step.emit({ step : _step}); 
  }



}
