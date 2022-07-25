import { Component, Input, Output, EventEmitter, OnInit,OnDestroy} from '@angular/core';
import {WebstoreStateService, STATE } from 'src/app/services/state-management/webstore'; 
import {ICartRewards, ICartRewardLoyalty} from 'src/app/models/'; 
import { Subscription } from 'rxjs'; 
import { ToastrService } from 'ngx-toastr'; 

@Component({
  selector: 'app-reward-popup',
  templateUrl: './reward.html',
  styleUrls: ['./reward.scss']
})
export class RewardPopupComponent implements OnInit ,OnDestroy {  
  @Output() reward_parent = new EventEmitter<any>();
  
  reward:ICartRewardLoyalty = null;
  points_rewards:ICartRewards =  null;
 
  private subscription: Subscription = new Subscription(); 
  constructor( 
    private _store: WebstoreStateService, private _toastr: ToastrService  
  ) {}   
  
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {     
    this._store.do({ state: STATE.GET_USER_REWARD_LIST, payload: {refresh : true } });       

    this.subscription.add(
      this._store.sync(STATE.ON_RESULT_GET_USER_REWARD_LIST, (data) => {      
        if(data.success){
          this.points_rewards = data.data; 
        }  
      }) 
    ); 
    
    this.subscription.add(
      this._store.sync(STATE.ON_RESULT_REDEEM_USER_REWARD, (data) => {      
        console.log("reward result", data);
        if(data.success){
          this.reward_parent.emit({ success : true, reward: this.reward });
        }else{
          this._toastr.error("There is a problem redeeming this reward.");
        }
      }) 
    ); 
  } 
  
  public clickRedeem(reward ){
    this.reward = reward; 

    if(this.points_rewards.points === 0){
      this.reward_parent.emit({  success : false });
    }else{ 
      this._store.do({ state: STATE.REDEEM_USER_REWARD, payload: { reward_id : this.reward.id} });              
    }
  }

 
  public clickClose(){
    this.reward_parent.emit({ close : true }); 
  }

}