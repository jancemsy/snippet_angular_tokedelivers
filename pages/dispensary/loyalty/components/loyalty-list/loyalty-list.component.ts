import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BehaviorSubject } from 'rxjs';
import { PromosDiscounts } from 'src/app/models';
import { EditLoyaltyComponent } from '../edit-loyalty/edit-loyalty.component';

@Component({
  selector: 'app-loyalty-list',
  templateUrl: './loyalty-list.component.html',
  styleUrls: ['./loyalty-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoyaltyListComponent implements OnInit {
  @Input() loyaltyOffers$: BehaviorSubject<PromosDiscounts[]>;
  @Output() onUpdate = new EventEmitter<any>();

  constructor(
    private _modalService: NgbModal,
  ) { }

  ngOnInit(): void {
  }

  onEditLoyalty(item) {
    const modalRef = this._modalService.open(EditLoyaltyComponent,
      { backdrop : 'static', keyboard : false, centered : true ,size: 'lg' , windowClass : 'edit-loyalty-modal' });

    modalRef.componentInstance.item = item;
    modalRef.result.then((result) => {
        this.onUpdate.emit();
        // this._addDiscountPromoState.reset();
    }, (reason) => {
        this.onUpdate.emit();
        // this._addDiscountPromoState.reset();
    });;
  }

}
