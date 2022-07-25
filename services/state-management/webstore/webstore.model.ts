export enum STATE {


  //ACTION STATES

  GET_USER_REWARD_LIST = '_get_user_rewards_list',
  GET_USER_APPLIED_DISCOUNTS = '_get_user_applied_promotion_discounts',
  DELETE_APPLIED_PROMO = '_delete_applied_promo',
  APPLY_PROMO_CODE = '_apply_promo_code',


  REDEEM_USER_REWARD = '_redeem_user_reward',

  GET_SELECTED_PRODUCT = '_get_selected_product',
  SELECT_PRODUCT = '_select_product',
  UPDATE_SELECTED_PRODUCT = '_update_selected_product',

  GET_LOCAL_PRODUCTS = '_get_local_products',
  GET_PRODUCTS = '_get_products',
  GET_DISPENSARY_PRODUCTS = '_get_dispensary_products',
  GET_PRODUCT_SIDEBAR = '_get_product_sidebar',
 

  UPDATE_CART  = '_update_variation_cart', 
  ADD_ITEM_TO_CART = '_add_item_cart',
  DELETE_ITEM_FROM_CART = '_delete_item_cart',
  EMPTY_CART = '_empty_cart',
  GET_CART = '_get_cart',

 

  //RECEIVING STATES

  ON_SESSION_EXPIRED = '__on_session_expired', 

  ON_RESULT_SELECTED_PRODUCT = '_on_result_selected_product',  
  ON_RESULT_GET_PRODUCTS = '_on_result_get_products',  
  ON_RESULT_GET_PRODUCT_SIDEBAR = '_on_result_get_product_sidebar',  
  ON_GET_PRODUCTS_LOADING ='_on_get_products_loading',


  

  ON_RESULT_ADD_ITEM_TO_CART = '_on_result_add_item_cart',
  ON_RESULT_DELETE_ITEM_FROM_CART = '_on_result_delete_item_cart',
  ON_RESULT_EMPTY_CART = '_on_result_empty_cart',
  ON_RESULT_GET_CART = '_on_result_get_cart',
  ON_CART_COUNT = '_on_cart_count',
  ON_CART_DISPENSARY_ERROR = '_on_cart_dispensary_error', 
  

  ON_RESULT_GET_USER_REWARD_LIST = '_on_result_get_user_rewards_list',
  ON_RESULT_REDEEM_USER_REWARD = '_on_result_redeem_user_reward',
  ON_RESULT_GET_USER_APPLIED_DISCOUNTS = '_on_result_get_user_applied_discounts',
  ON_RESULT_DELETE_APPLIED_PROMO = '_on_result_delete_applied_promo',
  ON_RESULT_APPLY_PROMO_CODE = '_on_result_apply_promo_code',


  //RECEIVING - ERROR STATES  
  ON_ERROR_GET_PRODUCTS = '_on_error_get_products',
  ON_ERROR_GET_PRODUCT_SIDEBAR = '_on_error_get_product_sidebar',
  ON_ERROR_GET_LOCAL_PRODUCTS = '_on_error_get_local_products',

  
}

export interface IActionParams {
  state: string;
  payload?: object | any;
}

export interface IActionResult {
  state: string;
  payload?: object | any;
}
