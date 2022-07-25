import { Component, OnInit, Input} from '@angular/core'; 
import { IProductItem } from 'src/app/models/';
 

@Component({
  selector: 'app-profile-stats',
  templateUrl: './profile-stats.component.html',
  styleUrls: ['./profile-stats.component.scss']
})
export class ProfileStatsComponent implements OnInit{  
   
  @Input() product : IProductItem = null; 

 
  constructor(      
  ) {   
  }  

  ngOnDestroy(){ 
  }

  ngOnInit(): void {       
  } 

  public clickClose(){ 
  }
}
