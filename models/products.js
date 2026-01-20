import { isEqual } from "@/utils/lists.js"


const ProductFeatureType = Object.freeze({
  Size: 0,
  Color: 1,
})

const ProductType = Object.freeze({
  Simple: 0,
  Composite: 1,
})


const ProductHelper = {
  getProductItemByFeatures(product, features){

    features = features.filter(f => f > 0)
    for(var pit of product.productItems){
      const pfetatures = [ pit.colorId, pit.sizeId].filter(f => f > 0)
      if(isEqual(features, pfetatures)){
        return pit
      }
    }

    return null
  },
  requiresFeatureSelect(product) {

    if(product.productItems.length === 1 && product.productItems[0].colorId === 0){
      return false
    }

    return true
  },
  requiresColorSelect(product) {
    if(!ProductHelper.requiresFeatureSelect(product)) {
      return false
    }

    if(product.features.some(f => f.type === 1))
      return true

    return false
  },

  requiresSizeSelect(product) {
    if(!ProductHelper.requiresFeatureSelect(product)) {
      return false
    }

    if(product.features.some(f => f.type === 0))
      return true

    return false
  },
}

export { ProductHelper, ProductFeatureType, ProductType }
