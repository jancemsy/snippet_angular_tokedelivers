import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core'; 

@Component({
  selector: 'app-register-pillbox',
  templateUrl: './register-pill.component.html',
  styleUrls: ['./register-pill.component.scss'] 
})
export class RegisterPillComponent implements OnInit {

  @Input() step : number = 1;
  @Output() new_step = new EventEmitter<any>();
  
  constructor() { }

  ngOnInit(): void {
  }

  public clickStep(_step){
    this.new_step.emit({ step : _step}); 
  }



}
