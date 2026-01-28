// here
$ = jQuery;
(
  function () {
    "use strict"

    function ProductDetailCtrl($scope, $attrs, $sce, $http) {
      $scope.showVideo = false

      $scope.productForm = {
        selectedColor: null,
        selectedSize: null,
        showPriceTooltip: false,
      }

      $scope.page = {
        showPriceTooltip: false,
        showSeenCheaperForm: false,
        showAddToCartWarning: false,
        showShippingOptions: false,
        showSizeChart: false,
        isWishList: false,
        reviewsOffset: 0,
        reviewsPageSize: 5,
      }

      $scope.seenCheaperForm = {
        url: "",
        price: null,
        email: null,
        telephone: null,
        name: null,

      }

      $scope.ratingCriteria = {
        selected: "TODOS",
        ratingSelected: 0,
        orderBy: 'date',
        orderDir: 'desc',
        withVideos: false,
        withFotos: false,
        offset: 0,
        limit: 5,
        rating: 0,
      }



      $scope.ooskmsg = "agotado"

      $scope.product = ailoo.viewData.product

      $scope.sendSeenCheaper = function(){
        $scope.page.showSeenCheaperForm =false

        $http.post( "/Product/SeenCheaper.rails", $scope.seenCheaperForm).then(function (ret) {
          $scope.stores = ret.data.stores
        }).catch(function (error) {
          alert(error)
        })

      }

      $scope.showImageZoom = function (e, $event) {

        $event.preventDefault()

        var imgsArray = []
        var pswpEl = document.querySelectorAll(".pswp")[0]

        $(".product-photo .product-photo-carousel a").each(function () {
          imgsArray.push({ src: $(this).attr("href"), w: 1200, h: 1200 })
        })

        var initConfig = {
          index: e,
          closeEl: true,
          captionEl: true,
          fullscreenEl: true,
          zoomEl: true,
          shareEl: true,
          counterEl: true,
          arrowEl: true,
          preloaderEl: true,
          bgOpacity: .75,
          history: false,
        }

        var n = new PhotoSwipe(pswpEl, PhotoSwipeUI_Default, imgsArray, initConfig)
        n.init()
      }


      $scope.getProductAvailableSizes = function(prd, assoc){
        var avlSizes = []
        var map = {}
        for(var size of prd.sizes){
          for(var pit of prd.productItems){
            if(pit.sizeId == size.id && (pit.colorId == assoc.colorId || assoc.colorId == 0) && pit.isInStock && !map[size.id]) {
              avlSizes.push(size)
              map[size.id] = size
            }
          }
        }
        console.log("*** avlSizes", avlSizes)
        
        return avlSizes
      }

      $scope.closeGallery = function () {
        $scope.showVideo = false
        setTimeout(function () {
          $(".modal-video-wrapper").css("bottom", "-" + 9 * screen.width / 16 + "px")
        }, 250)
      }

      $scope.isSizeAvailable = function(size){

        var colorId = 0
        var sizeId = 0
        if(size != null)
          sizeId = size.id
        if($scope.productForm.selectedColor != null)
          colorId = $scope.productForm.selectedColor.id

        for(var pit of $scope.product.productItems){
          if(
            ((colorId > 0 && pit.colorId == colorId) || colorId == 0) &&
                        ((sizeId > 0 && pit.sizeId == sizeId) || sizeId == 0)
          ){
            return pit.isInStock
          }
        }

        return false
      }

      $scope.isSizeSelected = function(size){
        var selSize = $scope.productForm.selectedSize
        
        return selSize != null && selSize.id == size.id
      }

      var isSizeDialogOpen = false

      function onFeaturesChanged(){
        var pit = $scope.getSelectedProductItem()
        if((pit != null || !$scope.product.requiresFeatureSelect) && $scope.isSizeAvailable($scope.productForm.selectedSize)){
          $scope.page.showShippingOptions = true
        }else{
          $scope.page.showShippingOptions = false
        }


        if($scope.productForm.selectedSize != null &&  !$scope.isSizeAvailable($scope.productForm.selectedSize)) {
          $(".size-oosk").show()
        }else
          $(".size-oosk").hide()

      }

      $scope.doFeaturesChanged = onFeaturesChanged

      $scope.showShippingDialog = function(){
        $(".shipping-options__modal").show()
      }

      $scope.hideShippingDialog = function(){
        $(".shipping-options__modal").hide()
      }

      $scope.showStockDialog = function(){

        $(".shop-lookup__modal").show()
        var pit = $scope.getSelectedProductItem()


        $http.get( "/Product/Stock.rails?productItemId=" + pit.id).then(function (ret) {
          $scope.stores = ret.data.stores
        }).catch(function (error) {
          alert(error)
        })

      }

      $scope.hideStockDialog = function(){
        $(".shop-lookup__modal").hide()
      }


      $scope.onSelectSize = function(size){
        $scope.productForm.selectedSize = size
        onFeaturesChanged()
      }

      $scope.hideOoskDialog = function(){
        $(".size-oosk").hide()
        $scope.productForm.selectedSize = null
        isSizeDialogOpen = false
      }


      $scope.openYoutubeVideo = function (t) {

        if (motocard.viewData.is_mobile) {
          $scope.showVideo = $sce.trustAsResourceUrl("//www.youtube.com/embed/" + t + "?autoplay=1")
          setTimeout(function () {

            var width = Math.min(window.innerWidth, 1100)

            $(".modal-video-wrapper").css("bottom", 0)
            $(".modal-video-wrapper").css("height", 9 * width / 16 + "px")
            $("div.modal-video-wrapper > div > iframe").css("width", width + "px")
            $("div.modal-video-wrapper > div > iframe").css("height", 9 * width / 16 + "px")
          }, 250)
        }

      }

      $scope.selectColor = function(color){
        $scope.productForm.selectedColor = color

        for(var img of $scope.product.images){
          if(img.featureId == color.id){
            $('#carousel-nav-dot-' + img.id).click()
            break
          }
        }

        onFeaturesChanged()


      }

      $scope.onSizeChange = function(assoc){
        assoc.selectedSizeError =null
        onFeaturesChanged()
      }

      $scope.isColorAvailable = function(color){
        if($scope.productForm.selectedSize != null){
          for(var pit of $scope.product.productItems){
            if(pit.colorId == color.id && pit.sizeId == $scope.productForm.selectedSize.id && pit.isInStock){
              return true
            }
          }

        }else{
          for(var pit of $scope.product.productItems){
            if(pit.colorId == color.id && pit.isInStock){
              return true
            }
          }
        }
        
        return false
      }

      $scope.isColorSelected = function(color){
        return ($scope.productForm.selectedColor != null && $scope.productForm.selectedColor.id == color.id)
      }

      $scope.getColorImage = function(color){

        for(var img of $scope.product.images){
          if(img.featureId == color.id)
            return  img.imageURL
        }

        if($scope.product.colors && $scope.product.colors.length <= 1 && $scope.product.images != null && $scope.product.images.length > 0){
          return $scope.product.images[0].imageURL
        }

        return null
      }

      const productType = {
        SINGLE: 0,
        COMPOSITE: 1,
        DISCOUNT_RULE: 2,
      }

      $scope.addToCart = function(){

        if($scope.product.type == 0) {
          var pit = $scope.getSelectedProductItem()
          if ($scope.product.requiresFeatureSelect && pit == null) {
            $scope.page.showAddToCartWarning = true
            
            return
          } else if (pit == null) {
            pit = $scope.product.productItems[0]
          }

          $http.post("/Cart/AddToCart.rails", {
            productType: productType.SINGLE,
            productItemId: pit.id,
            quantity: 1,
          }).then(function(response){
            window.location.href = ("/Product/ShoppingCart.rails")
          }).catch(function(error){
            alert(error.message)
          })

          // window.location.href = ("/Product/AddToCart.rails?productItemId=" + pit.id);
        }else{

          var associations = $scope.product.composite.associations
          var packContents = []
          for(var assoc of associations){
            var sizeId = assoc.sizeId
            if(assoc.selectedSizeId && assoc.selectedSizeId > 0)
              sizeId = parseInt(assoc.selectedSizeId)
            else{
              if(assoc.requiresSizeSelect) {
                assoc.selectedSizeError = "Debe seleccionar talla"
                
                return
              }
            }
            var colorId = assoc.colorId
            if(assoc.selectedColorId && assoc.selectedColorId > 0)
              colorId = parseInt(assoc.selectedColorId)
            else{
              if(assoc.requiresColorSelect) {
                assoc.selectedColorError = "Debe seleccionar talla"
                
                return
              }

            }

            var pit = null
            for(var prdItem of assoc.product.productItems){
              if(prdItem.sizeId == sizeId && prdItem.colorId == colorId) {
                pit = prdItem
                break
              }
            }


            packContents.push({
              sizeId: sizeId,
              colorId: colorId,
              quantity: assoc.quantity,
              productItemId: pit ? pit.id : null,
            })
          }


          $http.post("/Cart/AddToCart.rails", {
            productType: productType.COMPOSITE,
            productId: $scope.product.id,
            quantity: 1,
            packContents: packContents,
          }).then(function(response){
            window.location.href = ("/Product/ShoppingCart.rails")
          }).catch(function(error){
            alert(error.message)
          })
        }
      }

      $scope.reviewStats = null
      $scope.getReviewStats = function(){
        $http.get("/Product/ReviewStats.rails?productId=" + $scope.product.id).then(function(ret){
          $scope.reviewStats = ret.data

          $scope.reviewStats.stars = Math.floor($scope.reviewStats.avgRating*2)

          $scope.reviewStats["5"] = 0
          $scope.reviewStats["4"] = 0
          $scope.reviewStats["3"] = 0
          $scope.reviewStats["2"] = 0
          $scope.reviewStats["1"] = 0

          for(var r of $scope.reviewStats.groups){
            $scope.reviewStats["" + r.ratingGroup] = r.totalReviews / $scope.reviewStats.totalReviews * 100
          }
        })
      }
      $scope.getReviewStats()

      $scope.getReviewInitial = function(review){
        if(review.party != null && review.party.name != null && review.party.name.length > 0){
          return review.party.name[0].toUpperCase()
        }

        return "A"
      }

      $scope.getReviewerName = function(review){
        if(review.party != null && review.party.name != null){
          var arr = review.party.name.split(' ')
          
          return formatName( arr[0] )
        }

        return "Anónimo"
      }

      $scope.selectTodos = function(){
        $scope.ratingCriteria.selected = "TODOS"
        $scope.ratingCriteria.rating = 0
        $scope.ratingCriteria.offset = 0
        $scope.ratingCriteria.orderBy = "date"
        $scope.ratingCriteria.orderDir = "DESC"
        $scope.reviews = []
        $scope.listReviews()

      }

      $scope.selectMejorValorado = function(){
        $scope.ratingCriteria.selected = "MEJOR_VALORADO"
        $scope.ratingCriteria.rating = 0
        $scope.ratingCriteria.offset = 0
        $scope.ratingCriteria.orderBy = "rating"
        $scope.ratingCriteria.orderDir = "DESC"
        $scope.reviews = []
        $scope.listReviews()
      }

      $scope.selectPeorValorado = function(){
        $scope.ratingCriteria.selected = "PEOR_VALORADO"
        $scope.ratingCriteria.rating = 0
        $scope.ratingCriteria.offset = 0
        $scope.ratingCriteria.orderBy = "rating"
        $scope.ratingCriteria.orderDir = "ASC"
        $scope.reviews = []
        $scope.listReviews()
      }

      function formatName(str) {
        // Remove extra spaces
        str = str.trim()

        // Capitalize the first letter of each word
        const words = str.split(" ")
        const formattedWords = words.map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())

        return formattedWords.join(" ")
      }

      $scope.selectRating = function(idx){
        $scope.ratingCriteria.rating = idx
        $scope.ratingCriteria.offset = 0
        $scope.reviews = []
        $scope.listReviews()
      }

      $scope.listReviews = function(){

        $scope.ratingCriteria.productId = $scope.product.id

        $http.post("/Product/ListReviews.rails", $scope.ratingCriteria).then(
          function(ret){

            $scope.reviews = $scope.reviews.concat(ret.data.reviews)

            if(ret.data.reviews)
              $scope.ratingCriteria.offset += ret.data.reviews.length
          },
        )
      }

      $scope.reviews = []
      $scope.listReviews()

      $scope.getIsShowCbo = function(){
        if(!$scope.product.sizes || $scope.product.sizes.length < 4)
          return false

        for(var size of $scope.product.sizes){
          if(size.name.length > 6)
            return true
        }

        return false
      }

      $scope.getSelectedProductItem = function(){
        var colorId = 0
        var sizeId = 0

        if(!$scope.product.requiresFeatureSelect)
          return $scope.product.productItems[0]

        if($scope.productForm.selectedSize != null)
          sizeId = $scope.productForm.selectedSize.id
        if($scope.productForm.selectedColor != null)
          colorId = $scope.productForm.selectedColor.id

        for(var pit of $scope.product.productItems){
          if(pit.colorId == colorId && pit.sizeId == sizeId){
            $scope.page.showAddToCartWarning = false
            
            return pit
          }
        }

        return null
      }

      $scope.getPrice = function(){
        var pit = $scope.getSelectedProductItem()
        if(pit != null)
          return pit.price
        
        return $scope.product.price
      }

      $scope.getInsallmentAmount = function(){
        if($scope.product.financing.length > 0)
          return $scope.getPrice() / $scope.product.financing[0].installments
        
        return 0
      }

      $scope.getMsrp = function(){
        var pit = $scope.getSelectedProductItem()
        if(pit != null)
          return pit.msrp
        
        return $scope.product.msrp
      }

      $scope.getDiscountAmount = function(){
        var pit = $scope.getSelectedProductItem()
        if(pit != null ){
          return Math.abs( pit.msrp - pit.price ) 
        }
        
        return $scope.product.msrp - $scope.product.price
      }

      $scope.getDiscountPercent = function(){
        var pit = $scope.getSelectedProductItem()
        if(pit != null ){
          return pit.discountPercent
        }
        
        return $scope.product.discount.percent
      }

      $scope.addToWishList = function(){

        if($scope.product.isWished == null)
          $scope.product.isWished = false

        $scope.product.isWished = !$scope.product.isWished
        $http.get("/AJAX/AddToWishList.rails?addRemove=" + ($scope.product.isWished ? "1" : "0") + "&productId=" + $scope.product.id).then(function (ret) {


        }).catch(function (error) {
          alert(error)
        })
      }

      $scope.hasDiscount = function(){
        var pit = $scope.getSelectedProductItem()
        if(pit != null ){
          return Math.abs( pit.msrp - pit.price ) > 0
        }

        return $scope.product.hasDiscount
      }

      //            initOwl(jQuery, window, document);

      setTimeout(function () {


        initEasyZoom(jQuery)
        initPhotoSwipe(this,  photoSwipe    )

        initProductPhotoContainer()
        initCarusels1()
        initCarusels2()


        if($scope.product.colors.length > 0){
          $scope.selectColor($scope.product.colors[0])
        }

        if(!$scope.product.requiresFeatureSelect){
          $scope.page.showShippingOptions =true
        }


        /*              setTimeout( function() {
                    var aaa = $('#carousel-nav-dot-' + $scope.product.images[0].id);
                    $('#carousel-nav-dot-' + $scope.product.images[0].id).click();
                }, 250);
*/

        // init carousels
        /*             $(".items-carousel.owl-carousel").owlCarousel({
                    loop: !1,
                    nav: !0,
                    dots: !1,
                    lazyLoad: !0,
                    margin: 10,
                    navText: ['<i class="icon-previous"></i>', '<i class="icon-next"></i>'],
                    responsive: {0: {items: 2, slideBy: 2}, 641: {items: 3, slideBy: 3}, 1101: {items: 4, slideBy: 4}},
                    onTranslated: function () {
                        lazyLoader.update()
                    }
                });*/
      }, 20)

      //initCarusels();


      /********************* share **************************/
      $scope.showShare = false

      $scope.onMouseEnter = function(evt) {
        $scope.showShare = true
      }

      $scope.onMouseLeave = function() {
        $scope.showShare = false
      }

      $scope.getCurrentUrl = function() {
        return encodeURIComponent(window.location.href)
      }

      $scope.getPageTitle = function() {
        return encodeURIComponent(document.title)
      }

      $scope.shareWhatsapp = function() {
        var url = 'https://api.whatsapp.com/send?text=' + $scope.getPageTitle() + '%20' + $scope.getCurrentUrl()
        window.open(url, '_blank')
      }

      $scope.shareTelegram = function() {
        var url = 'https://t.me/share/url?url=' + $scope.getCurrentUrl() + '&text=' + $scope.getPageTitle()
        window.open(url, '_blank')
      }

      $scope.shareTwitter = function() {
        var url = 'https://twitter.com/intent/tweet?url=' + $scope.getCurrentUrl() + '&text=' + $scope.getPageTitle()
        window.open(url, '_blank')
      }

      $scope.shareFacebook = function() {
        var url = 'https://www.facebook.com/sharer/sharer.php?u=' + $scope.getCurrentUrl()
        window.open(url, '_blank')
      }

      $scope.shareEmail = function() {
        var subject = $scope.getPageTitle()
        var body = 'Revisa esta página: ' + window.location.href
        var url = 'mailto:?subject=' + subject + '&body=' + encodeURIComponent(body)
        window.location.href = url
      }

      $scope.getSizeName = function(size){
        if(size.name.toUpperCase() === "TAMAÑO UNICO")
          return "UNICA"
        
        return size.name
      }

      /******************** /share *********************/



      $http.get("/AJAX/IsInWishList.rails?productId=" + $scope.product.id).then(function(ret){
        $scope.product.isWished = ret.data.isInWishList
      })

    }

    var module = angular.module("productDetail", [])
    module.controller("ProductDetailCtrl", [
      "$scope",
      "$attrs",
      "$sce",
      "$http",
      ProductDetailCtrl,
    ])

    motocard.addAngularModule("productDetail")
  }
)()
jQuery(".easyzoom a").on("click", function (e) {
  e.preventDefault()
})
