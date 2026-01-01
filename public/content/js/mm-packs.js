angular.module("mm").controller("packCtrl", function ($scope, mmservice) {

	function Pack() {
	}

	$scope.isShowPackDialog = false;


	Pack.prototype.getProducts = function () {
		var prds = [];
		angular.forEach(this.products, function (value) {
			prds.push(value)
		});
		prds.splice(0, 0, this.mainProduct);
		return prds;
	};

	Pack.prototype.getSavings = function () {
		var prds = this.getProducts();
		var savings = 0;

		angular.forEach(prds,
		  function (value) {
			  savings = savings + value.basePrice - value.finalPrice;
		  });

		return savings;
	};
	Pack.prototype.getTotal = function () {
		var prds = this.getProducts();
		var total = 0;

		angular.forEach(prds,
		  function (value) {
			  total = total + value.finalPrice;
		  });

		return total;
	};

	function Product() {
	};

	Product.prototype.hasColor = function () {
		return this.productFeatures != null && this.productFeatures.length > 0 &&
		  this.productFeatures[0].color != null &&
		  this.productFeatures[0].color.id != 0;
	};
	Product.prototype.hasSize = function () {
		if (this.productFeatures == null || this.productFeatures.length == 1)
			return true;
		return this.productFeatures != null && this.productFeatures.length > 0 &&
		  this.productFeatures[0].size != null &&
		  this.productFeatures[0].size.id != 0;
	};


	$scope.packLoaded = false;

	mmservice.findPacks(jQuery("#productId").val(), {
		success: function (data) {

			if (data == null || data.packs == null || data.packs.length == 0) {
				jQuery(".pack-container").hide();
				return;
			}

			for (var i = 0; i < data.packs.length; i++) {
				var pack = data.packs[i];

				angular.forEach(pack.products,
				  function (value) {
					  value.selectedSize = {id: 0};
					  value.selectedColor = {id: 0};
					  value.availableSizes = $scope.getAvailableSizes(value);
					  value.availableColors = $scope.getAvailableColors(value);
					  value.__proto__ = Product.prototype;

				  });

				pack.mainProduct.selectedSize = {id: 0};
				pack.mainProduct.selectedColor = {id: 0};
				pack.mainProduct.availableSizes = $scope.getAvailableSizes(pack.mainProduct);
				pack.mainProduct.availableColors = $scope.getAvailableColors(pack.mainProduct);
				pack.mainProduct.__proto__ = Product.prototype;

				pack.__proto__ = Pack.prototype;
			}

			$scope.packs = data.packs;
			//$scope.pack = pack;

			$scope.packLoaded = true;
		}
	});


	$scope.loading = false;


	$scope.addPackToCart = function ($event, pack) {


		var isValid = true;
		angular.forEach(pack.getProducts(), function (prod) {
			if (prod.hasColor() && prod.selectedColor.id === 0) {
				isValid = false;
				jQuery('.selectPackColor' + pack.id + '_' + prod.id).webuiPopover({
					width: 140,
					trigger: 'sticky',
					autoHide: true,
					multi: true
				});
				return;
			}

			if (prod.hasSize() && prod.selectedSize.id === 0) {
				isValid = false;
				jQuery('.selectPackSize' + pack.id + '_' + prod.id).webuiPopover({
					width: 140,
					trigger: 'sticky',
					autoHide: true,
					multi: true
				});
				return;
			}

		});

		if (!isValid)
			return;


		jQuery(".add-pack-to-cart-" + pack.id).prop("disabled", true);
		jQuery(".add-pack-to-cart-" + pack.id).removeClass("plain-green");
		jQuery(".add-pack-to-cart-" + pack.id).addClass("disabled");
		jQuery(".pack-add-" + pack.id).removeClass("fa-caret-right");
		jQuery(".pack-add-" + pack.id).addClass("loading");

		$scope.loading = true;
		mmservice.addPackToCart(pack,
		  {
			  success: function (result) {
				  console.log("AddToCart:: " + JSON.stringify(result.data));
				  window.location.href = "/Product/ShoppingCart.rails";
			  }
		  });
	}

	$scope.getAvailableColors = function (product) {
		if (product == null)
			return [];
		if (product.colors != undefined && product.colors == null)
			return [];

		var colors = [];
		var idx = [];

		var sizeId = 0;
		if (product.selectedSize != null) {
			sizeId = product.selectedSize.id;
		}

		angular.forEach(product.colors,
		  function (value) {

			  var hasStock = false;
			  angular.forEach(product.stock, function (stk) {
				  if (stk.colorId == value.id && (sizeId == 0 || sizeId == stk.colorId) && stk.quantity > 0)
					  hasStock = true;
			  });


			  if (hasStock
				&& idx.indexOf(value.id) === -1) {
				  colors.push(value);
				  idx.push(value.id);
			  }
		  });

		if (colors.length > 0 && sizeId == 0)
			colors.splice(0, 0, {id: 0, name: "Color"});

		return colors;
	};


	$scope.getAvailableSizes = function (product) {
		if (product == null)
			return [];
		if (product.sizes != undefined && product.sizes == null)
			return [];

		var colorId = 0;
		if (product.selectedColor != null) {
			colorId = product.selectedColor.id;
		}

		var sizes = [];
		var idx = [];
		angular.forEach(product.sizes,
		  function (value) {

			  var hasStock = false;
			  angular.forEach(product.stock, function (stk) {
				  if (stk.sizeId == value.id && (colorId == 0 || colorId == stk.colorId) && stk.quantity > 0)
					  hasStock = true;
			  });

			  if (hasStock && idx.indexOf(value.id) === -1) {
				  sizes.push({id: value.id, name: value.name});
				  idx.push(value.id);
			  }
		  });

		if (sizes.length > 0)
			sizes.splice(0, 0, {id: 0, name: "Talla"});

		return sizes;
	};


	$scope.onChangeSize = function (pack, product) {
		jQuery(".pack-item-options select").webuiPopover('destroy');
	};


	$scope.onChangeColor = function (pack, product) {
		product.availableSizes = $scope.getAvailableSizes(product);
		if (product.availableSizes.length > 0)
			product.selectedSize = product.availableSizes[0];
		jQuery(".pack-item-options select").webuiPopover('destroy');
	};

	$scope.expandPack = function (pack) {
		var $packCollapsed = $("#pack-collapsed-" + pack.id);
		var $packExpanded = $("#pack-" + pack.id);
		$packCollapsed.css("width", $packCollapsed.width() + "px");
		$packCollapsed.css("position", "absolute");
		$packCollapsed.css("z-index", "1000");

		setTimeout(function () {
			$packCollapsed.fadeOut(200),
			  setTimeout(function () {
				  $packCollapsed.remove()
			  }, 300)
		}, 200);
		$packExpanded.hide();
		$packExpanded.removeClass("hide-for-small-only");
		$packExpanded.slideDown();

	};

	$scope.selectedPack = null;
	$scope.showPackDialog = function (pack) {
		$scope.isShowPackDialog = true;
		$scope.selectedPack = pack;
		$scope.packProducts = $scope.getPackProducts(pack);
	}
	$scope.hidePackDialog = function () {
		$scope.isShowPackDialog = false;
	}

	$scope.getPackProducts = function (pack) {
		var products = [];

		if (pack && pack.mainProduct) {
			products.push(pack.mainProduct);
			products.push(pack.products);
		}
		return products;
	}


	var owlConfig = {
		items: 1,
		loop: true, // Loop the carousel
		autoplay: true, // Autoplay the carousel
		autoWidth: false,
		responsive: {
			0: {
				items: 1
			}
		},
		dots: true,
		nav: true,
		navText: ['<i class="icon-previous"></i>', '<i class="icon-next"></i>'],
	};
	console.log("config", owlConfig);
	jQuery("#packmodal .keen-slider").owlCarousel(owlConfig);


});

angular.module("mm").directive('owlCarouselDirective', ['$timeout', function ($timeout) {
	return {
		restrict: 'A',
		scope: {
			owlOptions: '='
		},
		link: function (scope, element, attrs) {

			// Default options
			var defaultOptions = {
				loop: true,
				margin: 10,
				nav: true,
				dots: true,
				responsive: {
					0: {items: 1},
					600: {items: 3},
					1000: {items: 4}
				}
			};

			var initCarousel = function () {
				// Destroy carousel if it was previously initialized
				if (element.data('owl.carousel')) {
					element.trigger('destroy.owl.carousel');
				}

				// Wait for DOM update to complete after ng-repeat finishes
				$timeout(function () {
					// Merge default options with any user-provided options
					var options = angular.extend({}, defaultOptions, scope.owlOptions || {});

					// Initialize OwlCarousel
					console.log("Init carrousel directive: ", options)
					element.owlCarousel(options);

					console.log('OwlCarousel initialized after ng-repeat');
				}, 100); // Short timeout to ensure DOM is ready
			};

			// Watch for changes in the collection that feeds the ng-repeat
			if (attrs.owlCarouselWatchData) {
				scope.$parent.$watchCollection(attrs.owlCarouselWatchData, function (newVal) {
					if (newVal && newVal.length > 0) {
						initCarousel();
					}
				});
			} else {
				// If no watch data is specified, initialize after DOM is ready
				initCarousel();
			}
		}
	};
}]);
