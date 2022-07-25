import { Component, OnInit, ChangeDetectionStrategy, Output, Input, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { PosScanner } from 'src/app/models/pos/pos-scanner';
import { PosMainService } from 'src/app/services/pos/pos-main/pos-main.service';
import { PosService } from 'src/app/services/pos/pos.service';

@Component({
  selector: 'app-pos-scan',
  templateUrl: './pos-scan.component.html',
  styleUrls: ['./pos-scan.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PosScanComponent implements OnInit {

  public selectedId : string;
  public posMode : string;

  public scanner$: Observable<PosScanner>;

  constructor(
    private _posService : PosService,
  ) {
    this.scanner$ = this._posService.posScanner;
  }

  ngOnInit(): void {
    this.selectedId = 'medical';
  }

  onBack() {
    // this._posMainService.setPosDebitPaymentStatus('waiting');
    // this._posMainService.setPosPaymentMode('menu');
    // this._posService.setTransactionComplete(false);
    // this._posService.setPosMode('register')
  }

  onSelectId(id){
    this.selectedId = id;
  }

  tmpScanned() {
    // TODO something here
    this._posService.setPosScanner(null);
  }

}
