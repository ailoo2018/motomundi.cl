export const useProductsUtils = () => {

  const findProductItemByFeatures = (product, colorId, sizeId) => {
    return product.productItems.find(f => f.colorId === colorId && f.sizeId === sizeId)
  }

  const requiresFeatureSelect = product =>  {

    if(product.productItems.length === 1 && product.productItems[0].colorId === 0){
      return false
    }

    return true
  }

  const isInStock = product => {

    if(product.type === 0)
      return product.productItems?.some(f => f.quantityInStock > 0) || false

    if(!(product.composite?.length > 0))
      return false

    for(var p of product.composite){
      if(p.product.productItems?.some(pit => pit.quantityInStock >0))
        return true
    }

    return false
  }

  return {
    findProductItemByFeatures,
    requiresFeatureSelect,
    isInStock,
  }
}
