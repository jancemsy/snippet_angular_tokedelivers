import { Component, Input, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { Observable } from 'rxjs/Observable';
import { takeUntil } from 'rxjs/operators';
import { PosAlert } from 'src/app/models/pos/pos-alert.model';
import { PosService } from 'src/app/services/pos/pos.service';

@Component({
  selector: 'app-pos-alert-info',
  templateUrl: './pos-alert-info.component.html',
  styleUrls: ['./pos-alert-info.component.scss']
})
export class PosAlertInfoComponent implements OnInit {

  @Input() time:number = 5000;
  public posAlert$: Observable<PosAlert>;
  private timeout: any;
  private _unsubscribe$ = new Subject<any>();
  private alert: PosAlert;



  constructor(
    private _posService: PosService,
  ) { }

  ngOnInit() {
    this.posAlert$ = this._posService.posAlert;

    this.posAlert$
      .pipe( takeUntil(this._unsubscribe$) )
      .subscribe(
        (result: PosAlert) => {
          this.alert = result;
          if (result && result.activate) {
            this.timeoutHandler();
          }
        }
      )
  }

  ngOnDestroy() {
    this._unsubscribe$.next();
    this._unsubscribe$.complete();
  }

  private timeoutHandler() {
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
    setTimeout(() => {
      this.alert.activate = false;
      this._posService.setPosAlert(this.alert);
    }, this.time);
  }



}
