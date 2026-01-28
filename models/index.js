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

const Departments = Object.freeze({
  Road: 10018,
  Mx: 116190,
  CafeRacer: 118485,
  LifeStyle: 116189,

})

export { SaleItemType, CartItemType, Departments }
