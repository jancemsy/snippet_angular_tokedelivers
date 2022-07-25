import { Component, NgZone, OnDestroy, OnInit } from '@angular/core';

import { CustomerService } from 'src/app/services/customers/customer.service';
import { CardAddressComponent} from 'src/app/shared/modules/customer-shared/components/card-address/card-address.component';
import { Subject } from 'rxjs';

import { CheckoutService } from 'src/app/services/checkout/checkout.service';
import { takeUntil } from 'rxjs/operators';

import { Cart } from './models/cart';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from 'src/app/shared/components/confirmation-dialog/confirmation-dialog.component';
import { CustomAlertDialogComponent } from 'src/app/shared/components/custom-alert-dialog/custom-alert-dialog.component';
import { BsModalService } from 'ngx-bootstrap/modal';
import { PaymentMethodListComponent } from 'src/app/shared/components/payments/payment-method-list/payment-method-list.component';
import { PaymentGatewaysService } from 'src/app/services/gateways/payment-gateways.service';
import { RedeemRewardsDialogComponent } from './components/redeem-rewards-dialog/redeem-rewards-dialog.component';
import { CardIdentificationComponent } from 'src/app/shared/modules/customer-shared/components/card-identification/card-identification.component';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})

export class CheckoutComponent implements OnInit, OnDestroy {

  private _unsubscribe$ = new Subject<any>();
  address: any = {};
  customer: any = {};
  personal_info = {
    first_name: null,
    last_name: null,
    birth_date: null
  };
  canPlaceOrder: boolean = false;
  paymentItem: any = {};
  isEdit: boolean = false;
  shipping_type: string = "Delivery";
  user: any = {};
  identification: any = {};

  cart: any = {};
  selectedItems: any = [];
  selectedVariant: number;
  updatedQty: number;

  promoCodeInvalid: boolean;
  promoAlertMessage: string;

  discounts: any = [];
  discount_total: number = 0.00;

  discountsExpanded: boolean = false;

  is_show_reward_popup: boolean = false;
  is_discount_show : boolean = false; 

  constructor(
    private checkoutService: CheckoutService,
    private toastr: ToastrService,
    private dialog: MatDialog,
    private modalService: BsModalService,
    private customerService: CustomerService,
    private _paymentGateway: PaymentGatewaysService,
    private _ngZone: NgZone
  ) { }

  ngOnInit(): void {
    this.getCheckoutPageData();

    this.modalService.config.class = "modal-xl bg-img-home modal-bg-transparent modal-no-border modal-rounded";
    this.modalService.config.ignoreBackdropClick = true;
  }

  getCheckoutPageData()
  {
    this.checkoutService
    .getCheckoutPageData()
    .pipe(takeUntil(this._unsubscribe$))
    .subscribe(
      (res: any) => {

        this.user = res.data[0].user;

        this.address = res.data[0].default_profile;
        this.customer = res.data[0];
        this.identification = res.data[0].identification;
        this.paymentItem = res.data[0].payment_options[0];
        this.personal_info = res.data[0].user;
        this.personal_info.birth_date = new Date(this.personal_info.birth_date);

        if(this.paymentItem)
        {
          if(!this.paymentItem.payment_method.logo)
          {
            this.paymentItem.payment_method.logo = "../../../../assets/images/payments/" + this.paymentItem.payment_method.name.toLowerCase() + ".svg";
          }
        }

        if(res.data[0].cart){

          if(res.data[0].cart.items.length != 0)
            {

              let subtotal: number = 0.00;

              for(let item of res.data[0].cart.items)
              {
                subtotal += (item.item.price * item.quantity);
              }

              // Get discounts
              this.checkoutService.getDiscounts()
                                  .pipe(takeUntil(this._unsubscribe$))
                                  .subscribe(
                                    (discountRes: any) => {

                                      for(let discount of discountRes.data.discountsAndPromos)
                                      {
                                        let discountDetails = {
                                          name: discount.promo.name,
                                          value: -Math.abs(discount.discount_value)
                                        };

                                        this.discounts.push(discountDetails);

                                        this.discount_total += parseFloat(discount.discount_value);
                                      }



                                      let tax: number = 0;
                                      this.cart = {
                                        id: res.data[0].cart.cart_id,
                                        items: res.data[0].cart.items,
                                        subtotal: subtotal,
                                        discounts: -Math.abs(this.discount_total),
                                        tax: subtotal * (tax / 100),
                                        total: subtotal - tax - this.discount_total
                                      }
                                    }
                                  );

            }else{
              if(localStorage.getItem('_cart') != null)
              {
                this.saveLocalCartItems();
              }
            }

        }

        // Check if returned data has personal info
        if(this.personal_info.first_name && this.personal_info.last_name && Object.keys(this.cart).length !== 0)
        {
          this.canPlaceOrder = true;
        }
      }
    );
  }

  selectType(type)
  {
    this.shipping_type = type;
  }

  editCart()
  {
    this.isEdit = true;
  }

  saveLocalCartItems()
  {
    console.log('check');
    let local_cart = JSON.parse(localStorage.getItem('_cart'));
    let cart_items = [];

    console.log(local_cart);

    if(local_cart)
    {
      for(let item of local_cart)
      {

        let item_details = {
          product_variant_id: item.product_variation_id,
          dispensary_id: item.dispensary_id,
          quantity: item.qty
        };

        cart_items.push(item_details);
      }

      let body = {
        itemobject: cart_items
      }

      this.checkoutService.saveLocalCartItems(body)
                          .pipe(takeUntil(this._unsubscribe$))
                          .subscribe(
                            (res: any) => {
                              this.getCheckoutPageData();
                            }
                          );
    }

  }

  updateItem(qty, variant_id, item_id)
  {
    // console.log(qty, variant_id, item_id);
    let body = {
      cart_item_id: item_id,
      product_variation_id: variant_id,
      quantity: qty
    };

    this.checkoutService.updateCartItem(body)
                        .pipe(takeUntil(this._unsubscribe$))
                        .subscribe(
                          (res: any) => {
                            this.toastr.info(res.message);
                            this.getCheckoutPageData();
                          }
                        );
  }

  deleteItem(item_id)
  {
    let dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: "Are you sure you want to delete this item?"
    });

    dialogRef.afterClosed().pipe(takeUntil(this._unsubscribe$)).subscribe(
      (confirmed: boolean) => {
        if(confirmed)
        {
          this.checkoutService.deleteCartItem(item_id)
                        .pipe(takeUntil(this._unsubscribe$))
                        .subscribe(
                          (res: any) => {
                            this.toastr.info(res.message);

                            if(Object.keys(this.cart).length !== 0)
                            {
                              localStorage.setItem("_cart", null);
                              this.cart = {};
                              this.canPlaceOrder = false;
                            }

                            this.getCheckoutPageData();
                          }
                        );
        }
      }
    );
  }

  changeQty(event, cart_id)
  {
    console.log(event.target.value, cart_id);
  }

  doneEdit()
  {
    this.isEdit = false;
  }

  ngOnDestroy()
  {
    this._unsubscribe$.next();
    this._unsubscribe$.complete();
  }

  placeOrder()
  {
    let order_details = [];

    for(let item of this.cart.items)
    {
      let detail = {
        dispensary_id: item.dispensary.id,
        product_variant_id: item.item.product_variant_id,
        coupon_id: 1,
        inventory_id: item.item.inventories.id,
        quantity: item.quantity
      };

      order_details.push(detail);

    }

    let body = {
      "profile_id": this.address.profile_id,
      "payment_option_id": this.paymentItem.id,
      "cart_id": this.cart.id,
      "type": this.shipping_type,
      "subtotal": this.cart.subtotal,
      "discount": this.cart.discount,
      "sales_tax": this.cart.tax,
      "total": this.cart.total,
      "order_details": order_details,
      "first_name": this.personal_info.first_name,
      "last_name": this.personal_info.last_name,
      "birth_date": this.personal_info.birth_date
    }

    // console.log(body);

    this.checkoutService.placeOrder(body)
                        .pipe(takeUntil(this._unsubscribe$))
                        .subscribe(
                          (res: any) => {
                            if(res.success)
                            {

                              this.emptyCart();

                            }
                          }
                        );

  }

  emptyCart()
  {
    this.checkoutService.emptyCart(this.cart.id)
                        .pipe(takeUntil(this._unsubscribe$))
                        .subscribe(
                          (res: any) => {

                            localStorage.setItem("_cart", null);

                            let custom_alert_data = {
                              icon: "fa-check",
                              title: "Thank you, your order has been placed",
                              subtitle: "Please check your email for order confirmation and additional information or visit Your Profile."
                            }

                            let dialogRef = this.dialog.open(CustomAlertDialogComponent, {
                              data: custom_alert_data
                            });

                            this._ngZone.runOutsideAngular(() => {
                              setTimeout(() => {
                                window.location.reload();
                              }, 5000);
                            });
                          }
                        );
  }

  onOpenAddresses()
  {
    const initialState = {
      user_id: this.customer.user.id,
      addresses: this.customer.user.profiles
    }
    let modalShow = this.modalService.show(CardAddressComponent, { initialState });
    modalShow.onHide
      .pipe( takeUntil(this._unsubscribe$) )
      .subscribe(() => {
        this.customerService.getCustomer(this.customer.customer_id)
        .subscribe(
          (successResponse: any) => {

            this.getCheckoutPageData();

          },
          (errorResponse: any) => {
            console.log('[CS][PERSONAL_INFORMATION] fail', errorResponse);
          }
        )
      })
  }

  viewPaymentMethods() {
    this._paymentGateway.customerPaymentOptions = this.customer.payment_options;
    this._paymentGateway.customerInfo = this.customer;
    const modalInstance = this.modalService.show(PaymentMethodListComponent);

    modalInstance.content._onClose
      .pipe(takeUntil(this._unsubscribe$))
      .subscribe(
        (res: any) => {
          this.paymentItem = res;
        }
      );
  }

  onOpenCardIdentification() {
    console.log("[PERSONAL_INFORMATION] opens card identification modal");
    const initialState = {
      user_id: this.customer.user.id
    }
    this.modalService.show(CardIdentificationComponent, { initialState });
  }

  updatePersonalInfo()
  {
    // Check if returned data has personal info
    if(this.personal_info.first_name && this.personal_info.last_name)
    {
      console.log(this.personal_info.first_name);
      this.canPlaceOrder = true;
    }
  }

  usePromoCode(code)
  {
    let body = {
      code: code,
      dispensary_id: this.cart.items[0].dispensary.id
    };

    this.checkoutService.verifyPromoCode(body)
                        .pipe(takeUntil(this._unsubscribe$))
                        .subscribe(
                          (res: any) => {
                            let discount = {
                              name: res.data[0].name,
                              value: -Math.abs(res.data[0].discount_value)
                            };

                            this.discount_total += parseFloat(res.data[0].discount_value);

                            this.discounts.push(discount);
                            this.cart.discounts = -Math.abs(this.discount_total);
                            this.cart.total = this.cart.subtotal - this.discount_total;
                            this.promoCodeInvalid = false;
                            this.promoAlertMessage = "Promo code is valid!";
                          },
                          error => {
                            this.promoCodeInvalid = true;
                            this.promoAlertMessage = error.message;
                          }
                        );
  }

  expandDiscounts()
  {
    this.discountsExpanded = true;
  }

  shrinkDiscounts()
  {
    this.discountsExpanded = false;
  }

  openRedeemRewardsDialog(){

    this.checkoutService.getLoyalties()
                        .pipe(takeUntil(this._unsubscribe$))
                        .subscribe(
                          (res: any) => {

                            let dialogRef = this.dialog.open(RedeemRewardsDialogComponent, {
                              data: res.data,
                              width: "568px",
                              height: "auto"
                            });
                        
                            dialogRef.afterClosed().pipe(takeUntil(this._unsubscribe$))
                                                   .subscribe(
                                                     (res: any) => {
                                                        console.log(res);
                                                     }
                                                    );
                            

                          }
                        )
  
  }

}
