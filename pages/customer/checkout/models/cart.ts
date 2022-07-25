export interface Cart {
    cart_id: number;
    cart_items: [
      {
        variant_id: number;
        product_id: number;
        product_name: string;
        image: string;
        size: number;
        unit: string;
        price: number;
        qty: number;
      }
    ];
  };