import { Component, OnInit, ChangeDetectionStrategy, Input, ChangeDetectorRef } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { IProduct } from 'src/app/models';
import { PosMainService } from 'src/app/services/pos/pos-main/pos-main.service';
import { PosSideService } from 'src/app/services/pos/pos-side/pos-side.service';
import { PosService } from 'src/app/services/pos/pos.service';

@Component({
  selector: 'app-pos-main',
  templateUrl: './pos-main.component.html',
  styleUrls: ['./pos-main.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PosMainComponent implements OnInit {
  public _product$: Observable<IProduct> = null;

  private _unsubscribe$ = new Subject<any>();

  public posMode : string;

  constructor(
      private _posService: PosService,
      private _posMainService: PosMainService,
      private _posSideService : PosSideService,
      private _changeDetectorRef : ChangeDetectorRef
    ) {

      this._posService.posMode
          .pipe( takeUntil(this._unsubscribe$) )
          .subscribe(
            (successResponse: any) => {
                this.posMode = successResponse;
                this._changeDetectorRef.markForCheck();
            },
            (errorResponse: any) => {
              console.log('[POS_MODE] fail :', errorResponse)
            }
      );
    }

  ngOnInit(): void {
    this._product$ = this._posMainService.getCurrentProduct;
  }

  ngOnDestroy() {
    this._unsubscribe$.next();
    this._unsubscribe$.complete();
  }

}
