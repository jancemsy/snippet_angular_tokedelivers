import { Component, OnInit, ChangeDetectionStrategy, Input, EventEmitter, Output } from '@angular/core';
import { LoyaltyMember } from 'src/app/models';

@Component({
  selector: 'app-loyalty-members',
  templateUrl: './loyalty-members.component.html',
  styleUrls: ['./loyalty-members.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoyaltyMembersComponent implements OnInit {
  @Input() loyaltyMembers: LoyaltyMember[] = [];
  @Output() memberSelected = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
    console.log('this.loyaltyMembers: ', this.loyaltyMembers);
  }

  onMemberSelected(member) {
    this.memberSelected.emit(member);
  }
}
