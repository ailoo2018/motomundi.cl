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
    return product.productItems?.some(f => f.quantityInStock > 0) || false
  }

  return {
    findProductItemByFeatures,
    requiresFeatureSelect,
    isInStock,
  }
}
