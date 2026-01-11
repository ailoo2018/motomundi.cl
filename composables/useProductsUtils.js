export const useProductsUtils = () => {

  const findProductItemByFeatures = (product, colorId, sizeId) => {
    return product.productItems.find(f => f.colorId === colorId && f.sizeId === sizeId);
  }


  return {
    findProductItemByFeatures,
  };
};
