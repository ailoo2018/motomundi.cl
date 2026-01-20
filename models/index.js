const SaleItemType = Object.freeze({
  SINGLE: 0,
  COMPOSITE: 1,
  DISCOUNT_RULE: 2,
})


const CartItemType = Object.freeze({
  Product: 0,
  Coupon: 1,
  Discount: 2,
  Pack: 3,
})

export { SaleItemType, CartItemType }
