import { Component, OnInit } from '@angular/core';
import { PosService } from 'src/app/services/pos/pos.service';

@Component({
  selector: 'app-lockscreen',
  templateUrl: './lockscreen.component.html',
  styleUrls: ['./lockscreen.component.scss']
})
export class LockscreenComponent implements OnInit {

  public value: string = "";
  public isInvalid: boolean = false;
  public isLoading: boolean = false;
  public message: string = "";

  constructor(private _posService: PosService) { }

  ngOnInit() {
  }

  onChanging() {
    // we check value if it match with our
    this.isInvalid = false;

    if (this.value == '1234') {
      this.isLoading = true;
      this.message = "Success! Please wait for a while....";
      setTimeout(() => {
        this._posService.unlockPos();
      }, 1000);
      return;
    }

    if (this.value.length > 4) {
      this.isInvalid = true;
    }
  }

}
