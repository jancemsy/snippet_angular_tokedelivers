import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BehaviorSubject } from 'rxjs';
import { Customer } from 'src/app/models/customer/customer.model';

import { RewardsDetailsComponent } from './rewards-details/rewards-details.component';

@Component({
  selector: 'app-rewards',
  templateUrl: './rewards.component.html',
  styleUrls: ['./rewards.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RewardsComponent implements OnInit {
  @Input() member$: BehaviorSubject<Customer>;
  @ViewChild('cardSlider') cardSlider: ElementRef;

  rewards: any[] = [];

  atTop = true;
  atBottom = false;

  constructor(
    private _modalService: BsModalService,
  ) {
  }

  ngOnInit(): void {
    if (this.member$) {
      this.member$.subscribe((member) => {
        if (member) {
          this.rewards = member.rewards;
        }
      });
    }
  }

  scroll(direction: string) {
    const card = 245;
    const { nativeElement } = this.cardSlider;
    const { scrollLeft } = nativeElement;

    switch(direction) {
      case 'right':
        this.atTop = false;
        const prevScrollValue = scrollLeft;
        nativeElement.scrollLeft = scrollLeft + card;

        if (prevScrollValue && prevScrollValue === nativeElement.scrollLeft) {
          this.atBottom = true;
        } else {
          this.atBottom = false;
        }

        break;

      case 'left':
        this.atBottom = false;
        if (scrollLeft >= card) {
          this.atTop = false;
          nativeElement.scrollLeft = scrollLeft - card;
        } else {
          nativeElement.scrollLeft = 0;
          this.atTop = true;
        }
        break;
    }
  }

  onRewardSelected(item) {
    const options: NgbModalOptions = {
      centered: true,
      windowClass: 'reward-details',
      size: 'lg'
    };

    const modalRef = this._modalService.show(RewardsDetailsComponent, options);
    modalRef.content.selected = item.id;
    modalRef.content.rewards$.next(this.rewards);


  }

}
