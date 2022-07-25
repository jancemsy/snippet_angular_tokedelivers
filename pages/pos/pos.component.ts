import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { PosService } from 'src/app/services/pos/pos.service';

@Component({
  selector: 'app-pos',
  templateUrl: './pos.component.html',
  styleUrls: ['./pos.component.scss']
})
export class PosComponent implements OnInit {

  public posMode$: Observable<string>;

  constructor(
    private _posService: PosService,
  ) {
    this.posMode$ = this._posService.posMode;
  }

  ngOnInit(): void {

  }
}
