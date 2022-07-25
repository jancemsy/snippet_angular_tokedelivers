import { Component, OnInit, ChangeDetectionStrategy, Input, AfterViewInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { BehaviorSubject } from 'rxjs';

import { rewardsHistory } from 'src/app/@dummies';

@Component({
  selector: 'app-rewards-details',
  templateUrl: './rewards-details.component.html',
  styleUrls: ['./rewards-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RewardsDetailsComponent implements AfterViewInit, OnInit {
  @Input() history$ = new BehaviorSubject<any>([]);
  @Input() rewards$ = new BehaviorSubject<any[]>(null);
  @Input() selected: any;

  availableRewards: any[] = [];


  rewardsList: any[];
  selectedReward: any;

  constructor(
    private modalRef: BsModalRef,
  ) {
    this.history$.next(rewardsHistory);
  }

  ngOnInit(): void {
  }

  get activeReward() {
    let id = this.selected;
    id = typeof id === 'number' ? id : parseInt(id, 10);

    return this.rewardsList.find(item => item.id === id)
  }

  ngAfterViewInit() {
    if (this.rewards$) {
      this.rewards$.subscribe(rewards => {
        if (rewards) {
          this.rewardsList = rewards;
          console.log('rewards: ', rewards);

          this.selectedReward = this.activeReward;
          this.availableRewards = this.selectedReward.available;
          console.log('selected: ', this.selectedReward);
        }
      });
    }
  }

  onRewardSelected() {
    console.log('this.selected: ', this.selected);
    this.selectedReward = this.activeReward;
    console.log('this.selectedReward ', this.selectedReward);
  }

  onClose() {
    this.modalRef.hide();
  }
}
