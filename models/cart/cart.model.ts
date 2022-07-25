export interface ICartItem {
  id:number; 
  uuid? : any | string; 
  dispensary_id : number ;
  dispensary_name : string;
  product_variation_id : number; 
  thumb: string;
  brand: string;
  title: string; 
  amount: number | string;
  qty: number;  
  measurement: string; 
  variations?: any[]; //for reference 
} 

export interface ICartRewardLoyalty{
  id: number;
  name:string;
  discount: number; 
  tradein_for: number; 
}
export interface ICartRewards{ 
  loyalties:ICartRewardLoyalty[];
  points: number;  
}
export interface ICartPointsRewardItem {
  amount_off: number;
  allocated_points: number; 
} 
 