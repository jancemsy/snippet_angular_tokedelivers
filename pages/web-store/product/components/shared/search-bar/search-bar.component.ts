import { Component, Input, OnInit, Output,EventEmitter} from '@angular/core';

 

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit{  
  @Output('search') search: EventEmitter<any> = new EventEmitter(); 
  @Input() onkey : boolean = false; 
  _search: string = "";
  

  constructor(      
  ) {   
    
  }  

  enterSearch(){
    if(this.onkey){
      this.clickSearch(); 
    }
  }


  clickSearch(){ 
    this.search.emit(this._search);
  }

  ngOnDestroy(){ 
  }

  ngOnInit(): void {     
  } 
}
