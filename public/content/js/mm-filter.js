var module = angular.module("filterModule", []);

angular.module("filterModule").controller("FilterCtrl", function ($scope, $http, $compile, $timeout) {

    var ADDING = 1;
    var REMOVING = 2;

    var ctrl = this;
    var facetMap = {
        brand: 1,
        category: 2,
        tag: 4,
        model: 5,
        color: 6,
        size: 7,
        bikeModelId: 10,
        priceRange: 12,
        bikeYear: 14,
        1: "brands",
        2: "categoryId",
        4: "tagsIds",
        5: "models",
        6: "colors",
        7: "sizes",
        8: "showLatest",
        9: "showOnlyDiscounts",
        10: "bikeModelId",
        11: "facets",
        12: "priceRange",
        13: "minDiscount",
        14: "bikeYear"
    };

    $scope.filterTree = filterTree;
    $scope.originalFilters = filterTree.selectedFilters;
    $scope.context = context;
    $scope.params = context.params;
    $scope.selTab = 'all';
    $scope.orderBy = "name:asc";
    $scope.lastFilterType = 0


    function getTypeByParamName(param){
        for(var key in facetMap){
            if(facetMap[key] === param){
                return parseInt( key )
            }
        }
    }

    if($scope.filterTree.context.categoryId){
        $scope.context.addParam("categoryId", $scope.filterTree.context.categoryId, "");
    }
    if($scope.filterTree.context.bikeBrandId){
        $scope.context.addParam("bikeBrandId", $scope.filterTree.context.bikeBrandId, "");
    }
    if($scope.filterTree.context.bikeModelId){
        $scope.context.addParam("bikeModelId", $scope.filterTree.context.bikeModelId, "");
    }
    if($scope.filterTree.context.bikeYear){
        $scope.context.addParam("bikeYear", $scope.filterTree.context.bikeYear, "");
    }
    if($scope.filterTree.sword && $scope.filterTree.sword.length > 0){
        $scope.context.addParam("sword", $scope.filterTree.sword, "");
    }




    initPagination(filterTree.currentPage, filterTree.totalPages);

    $scope.$watch("orderBy", function(newVal, oldVal){
        if(newVal == null || newVal === oldVal)
            return;
        context.addParam("page", 1, "");
        context.addParam("orderBy", newVal);
        loadProducts(getUrl(), "", true);
    });


    $scope.$on('contextChanged', function (event, args) {
        loadProducts(getUrl(), args.facetType, true);
    });

    $scope.$on('filterUpdated', function(event, data){

        angular.forEach($scope.filterTree.selectedFilters, function(filter){
            var facet = findFacet( filter.id, filter.type);
            if(facet != null) {
                if(facet.count == 0 ) {
                    $scope.filterTree.selectedFilters = $scope.filterTree.selectedFilters.filter( s => s.id == facet.id)
                    // context.removeParam( facet.id, facet.type);
                    // console.log("context.remove", context.params)
                    // document.location.hash = context.getAnchor();
                    // console.log(context.getAnchor());
                    // facet.isSelected = false;
                }else
                    facet.isSelected = true;
            }

        });

    });

    var all = null;
    function getAllFacets() {

        if(all != null)
            return all;

        var all = [];
        all = all.concat($scope.filterTree.brands);
        all = all.concat($scope.filterTree.colors);
        all = all.concat($scope.filterTree.sizes);
        all = all.concat($scope.filterTree.models);

        for(var attrCat of $scope.filterTree.items){
            for(var attr of attrCat.facets){
                all.push(attr);
            }
        }

        all = all.concat($scope.filterTree.items);
        all = all.concat($scope.filterTree.categories);
        if($scope.filterTree.priceRanges != null)
            all = all.concat($scope.filterTree.priceRanges);

        return all;
    }

    function findFacet(facetId, facetType){

        var  all = getAllFacets();
        for(var item of  all) {
            if (item.id == facetId && item.type == facetType) {
                return item;
            }
        }

        return null;
    }

    function initPagination(currentPage, totalPages) {
        $scope.pages =[];
        var start = Math.max(1, currentPage - 3);
        var end = Math.min(totalPages, currentPage + 3);

        if (start > 1)
            $scope.pages.push({isCurrent: (currentPage === 1), pageNumber: 1, jumpsToNext: start > 2});


        for (var i = start; i <= end; i++)
            $scope.pages.push({isCurrent: (currentPage === i), pageNumber: i});

        if (end < totalPages) {
            $scope.pages[$scope.pages.length - 1].jumpsToNext =
                ($scope.pages[$scope.pages.length - 1].pageNumber <= (totalPages - 1));

            $scope.pages.push({
                isCurrent: (currentPage === totalPages),
                pageNumber: totalPages
            });
        }

    }

    // add page loaded filters
    context.from = 0;
    context.to = $scope.filterTree.maxPrice;
    angular.forEach($scope.filterTree.selectedFilters, function (item) {
        context.addParam(facetMap[item.type], item.id, "", true);
    });

    if($scope.filterTree.sword != null && $scope.filterTree.sword.length > 0){
        context.addParam("sword", $scope.filterTree.sword, "Búsqueda")
    }

    function getQueryString() {
        var page = context.getPage();
        var selectedFilters = $scope.getSelectedFilters();
        var params = new URLSearchParams();


        // current page filters

        for(var item of filterTree.selectedFilters){
            params.append(facetMap[item.type], item.id);
        }

        params.set("page", page);
        params.set("from", context.getPriceFrom());
        params.set("to", context.getPriceTo());
        params.set("orderBy", context.getOrderBy())

        var sword = context.getSword();
        if( sword && sword.length > 0 ){
            params.set("sword", sword)
        }

        for(var filter of selectedFilters){
            var paramName = facetMap[filter.type];
            params.append(paramName, filter.id);
        }
        return params.toString();
    }

    function getUrl() {

        return "/ProductJson/ListProducts.rails?" + getQueryString();
    }

    function getAnchor() {
        return getQueryString();
    }

    $scope.onPrevPage = function(){
        var curPage = Math.max(1, filterTree.currentPage - 1);
        context.addParam("page", curPage);
        loadProducts(getUrl(), null, false);
    };

    $scope.onNextPage = function(){
        var curPage = Math.min(filterTree.currentPage + 1, filterTree.totalPages);
        context.addParam("page", curPage);
        loadProducts(getUrl(), null, false);
    };

    $scope.gotoPage = function(page){
        context.addParam("page", page);
        loadProducts(getUrl(), null, false);
    };

    $scope.removeAllFilters = function(){
        var selectedFilters = $scope.getSelectedFilters();
        for(var f of selectedFilters){
            f.isSelected = false;
        }

        loadProducts(getUrl(), null, false);
    }

    $scope.removeFilter = function (facet) {
/*
        if($scope.filterTree.selectedFilters.length === 1)
            return;
*/

        facet.isSelected = false


        loadProducts(getUrl(), null, true);
    };

    $scope.getTotalSelected = function(type, attrCat){
        let count = 0;
        var all = getAllFacets();
        for(var selectedFacet of all){
            if(type == selectedFacet.type && selectedFacet.isSelected) {
                count++;
            }
        }

        return count;
    }

    $scope.isPriceSelected = function() {

    }

    $scope.toggle = function(tab){
        $scope.selTab = tab;

        if(!context.isPageLevelFilter("showOnlyDiscounts")) // if discount at page level we cannot remove
            context.addParam("showOnlyDiscounts", tab === 'discount' ? 1 : 0);
        if(!context.isPageLevelFilter("showLatest")) // if discount at page level we cannot remove
            context.addParam("showLatest", tab === 'new' ? 1 : 0);
        loadProducts(getUrl(), tab, true);
    };

    $scope.isSelected = function (facet) {
        return (facet.isSelected != undefined) ? facet.isSelected : false;
    };

    $scope.selectFacet = function (facet) {
        facet.isSelected = facet.isSelected != undefined ? !facet.isSelected : true;

        if (facet.isSelected) {
            context.addParam(facetMap[facet.type], facet.id, facet.name);
            $scope.isAddingOrRemoving = ADDING;
        } else {
            $scope.isAddingOrRemoving = REMOVING;
            context.remove(facetMap[facet.type], facet.id);
        }

        loadProducts(getUrl(), facet.type, true);
    };

    function scollToTopResult() {
        var target = jQuery("#resultscontainer");

        if (target.length) {
            jQuery('html, body').animate({
                scrollTop: target.offset().top - 210
            }, 500, function () {
            });
        }
    }

    function findFacetInRet(id, lst) {
        if (lst == null)
            return null;
        for (var i = 0; i < lst.length; i++) {
            if (lst[i].id == id)
                return lst[i];
        }
        return null;
    }

    function findInRet(id, lst) {
        if (lst == null)
            return null;
        for (var i = 0; i < lst.length; i++) {
            if (lst[i].Id == id)
                return lst[i];
        }
        return null;
    }

    $scope.getSelectedFilters = function(){
        return getAllFacets().filter(a => a.isSelected);
    }

    $scope.getSelectedFiltersCount = function(){
        return $scope.getSelectedFilters().length;
    }

    $scope.havingCount = function(arr, type){

        if(type == 1 && $scope.lastFilterType == 5){

            if($scope.getSelectedFilters().some(f => f.type === 5))
                return arr.filter(a => a.count > 0)
            return arr;
        }

         if(type === 5 ) {

             if(!$scope.getSelectedFilters().some(f => f.type === 1))
                 return arr;

            var modelsWithSelectedParents =  arr.filter(a => a.parent != null && $scope.isSelected( a.parent ) )
            return modelsWithSelectedParents;
        }

        return arr;
    }

    $scope.expandFacetGroup = function(facetGroup){
        if(facetGroup.isExpanded == null)
            facetGroup.isExpanded = false;
        facetGroup.isExpanded = !facetGroup.isExpanded;
    };

    $scope.getOrderByDescription = function(orderBy){
        if(orderBy === 'name:asc')
            return "Nombre";
        if(orderBy === 'newest:desc')
            return "Novedades";
        if(orderBy === 'bestseller')
            return "Más vendidos";
        if(orderBy === 'price:asc')
            return "Precio (de menor a mayor)";
        if(orderBy === 'price:desc')
            return "Precio (de mayor a menor)";
    }

    $scope.isLoading = false;
    // todo: this function should be at the level of a higher controller. FilterCtrl should only notify when the filter changed
    // TODO when category is selected and no child categories are returned, subtract 1 from num filters selected
    // TODO when price is selected, add to filters selected. Also selected price is not reflected in controls when reload paged

    function loadProducts(url, type, resetPage) {
        jQuery("#loadingprods").show();
        jQuery("#listado_pagination_footer").empty();
        scollToTopResult();
        if(resetPage)
            context.addParam("page", 1);

        $scope.lastFilterType = type
        $scope.isLoading = true;
        jQuery('#resultscontainer')
            .fadeOut('medium', function () {

                $http({
                    url: url,
                    method: "GET",
                }).then(function (ret) {

                    $scope.isLoading = false;
                    var data = ret.data;
                    jQuery('#resultscontainer').show();

                    var linkFn = $compile(data.ListHtml);
                    var content = linkFn($scope);
                    var pageElement = angular.element(document.getElementById("resultscontainer"));

                    pageElement.empty();
                    pageElement.append(content);

                    document.location.hash = getAnchor();

                    if (true || type != facetMap.brand) { // do not update brand count if we selected facet type brand
                        for (var j = 0; j < $scope.filterTree.brands.length; j++) {
                            var brand = $scope.filterTree.brands[j];
                            var b = findInRet(brand.id, data.Brands);
                            brand.count = 0;
                            if (b != null)
                                brand.count = b.Count;
                        }
                    }

                    for (var j = 0; j < $scope.filterTree.items.length; j++) {
                        var item = $scope.filterTree.items[j];
                        var it = findInRet(item.id, data.Tags);
                        item.count = 0;
                        if (it != null)
                            item.count = it.Count;
                    }



                    // enlazar marca con modelo
                   if (type != facetMap.model) { // do not update model
                        for (var j = 0; j < $scope.filterTree.models.length; j++) {
                            var model = $scope.filterTree.models[j];
                            var it = findInRet(model.id, data.Models);
                            model.count = 0;
                            model.parentId = 0;
                            if (it != null) {
                                model.count = it.Count;
                                model.parent =  $scope.filterTree.brands.find( b => b.entityId == it.ParentId);
                       //         if(model.parent)
                         //           model.name = model.parent.name + " " + model.name;
                            }
                        }


                    }


            //        $scope.filterTree.models = $scope.filterTree.models.sort(function (a, b) {  a.name.localeCompare(b.name)})

                    if (type != facetMap.color) { // do not update colors
                        for (var j = 0; j < $scope.filterTree.colors.length; j++) {
                            var color = $scope.filterTree.colors[j];
                            var it = findInRet(color.id, data.Colors);
                            color.count = 0;
                            if (it != null)
                                color.count = it.Count;
                        }
                    }

                    if (type != facetMap.category) { // do not update categories
                        for (var j = 0; j < $scope.filterTree.categories.length; j++) {
                            var category = $scope.filterTree.categories[j];
                            var cat = findInRet(category.id, data.Categories);
                            category.count = 0;
                            if (cat != null)
                                category.count = cat.Count;
                        }
                    }

                    for (var j = 0; j < $scope.filterTree.sizes.length; j++) {
                        var size = $scope.filterTree.sizes[j];
                        var sz = findInRet(size.id, data.Sizes);
                        size.count = 0;
                        if (sz != null)
                            size.count = sz.Count;
                    }


                    var remoteFacets = [];
                    angular.forEach(data.facetGroups, function(remoteFacetGroup){
                        angular.forEach(remoteFacetGroup.facets, function(remoteFacet){
                            remoteFacets.push(remoteFacet);
                        });
                    });


                    angular.forEach($scope.filterTree.facetGroups, function(localFacetGroup){
                        angular.forEach(localFacetGroup.facets, function(localFacet){
                            localFacet.count = 0;
                            for(var i=0; i < remoteFacets.length;i++){
                                if(remoteFacets[i].id == localFacet.id){
                                    localFacet.count =remoteFacets[i].count;
                                }
                            }
                        });
                    });


                    filterTree.currentPage = data.currentPage;
                    filterTree.totalPages = data.totalPages;
                    $scope.filterTree.hasDiscountCount = data.hasDiscountCount;
                    $scope.filterTree.isNewCount = data.isNewCount;
                    $scope.filterTree.tires = data.tires;
              //      $scope.filterTree.selectedFilters = data.selectedFilters;
                    console.log("$scope.filterTree.selectedFilters", $scope.filterTree.selectedFilters)

                    var selectedPriceRange = $scope.filterTree.selectedFilters.find(sf => sf.type ===  12);
                    if(selectedPriceRange) {
                        var priceRangeArray = selectedPriceRange.id.split("_");
                        if(priceRangeArray.length == 2){
                            $scope.minPrice = parseInt(priceRangeArray[0]);
                            $scope.maxPrice = roundUp(parseInt(priceRangeArray[1]));

                            if($scope.minPrice === 0 && $scope.maxPrice === $scope.maxSliderValue){
                                $scope.filterTree.selectedFilters = $scope.filterTree.selectedFilters.filter(sf => sf.type !== 12);
                            }
                        }

                    }

                    if(!(type == "new" || type == "discount"))
                        $scope.filterTree.totalItems = data.totalItems;


                    initPagination(data.currentPage, data.totalPages);

                    jQuery("#loadingprods").hide();

                    $scope.$broadcast('filterUpdated', $scope.filterTree);
                });
            });
    }

    // we group yes/no properties into a virtual options group
    $scope.isOptionsExpanded = false; // open or collapse options group
    $scope.hasOptions = false;

    var optionsFacets = [];
    angular.forEach($scope.filterTree.facetGroups, function(fg){
        if(fg.propertyType == 3){
            $scope.hasOptions = true;

            var yesIdx = 0;
            if(fg.facets[0].length > 1 && fg.facets[0].name == "0")
                yesIdx = 1;

            optionsFacets.push({
                type: 11, // facet type
                name: fg.name,
                count: fg.facets[yesIdx] != null ? fg.facets[yesIdx].count : 0,
                id: fg.facets[yesIdx].id
            })
        }
    });

    if($scope.hasOptions){
        $scope.filterTree.facetGroups.push({
            id: 0,
            name: "Opciones",
            type: 3,
            facets: optionsFacets
        });
    }


    angular.forEach($scope.filterTree.facetGroups, function(fg){

        if(fg.propertyType == 3){
            $scope.hasOptions = true;
        }
    });


    $scope.getOptions = function(){
        var options = [];
        angular.forEach($scope.filterTree.facetGroups, function(fg){
            if(fg.propertyType == 3){
                options.push(fg);
            }
        });

        return options;

    };

    function getHeightFromDivToBottom(divId) {
        // Get the div element by its ID
        var divElement = document.getElementById(divId);
        if(!divElement)
            return;

        // Get the bounding rectangle of the div
        var boundingRect = divElement.getBoundingClientRect();

        // Get the height of the viewport
        var viewportHeight = window.innerHeight;

        // Calculate the distance from the bottom of the div to the bottom of the viewport
        var distanceToBottom = viewportHeight - boundingRect.bottom;

        return distanceToBottom;
    }
    function roundUp(number) {
        if (number >= 100 && number < 1000) {
            return Math.ceil(number / 10) * 10;
        } else if (number >= 1000 && number < 10000) {
            return Math.ceil(number / 100) * 100;
        } else if (number >= 10000 && number < 100000) {
            return Math.ceil(number / 1000) * 1000;
        } else if (number >= 100000 && number < 1000000) {
            return Math.ceil(number / 10000) * 10000;
        } else if (number >= 1000000 && number < 10000000) {
            return Math.ceil(number / 100000) * 100000;
        } else {
            return number;
        }
    }

    $scope.$watch("minPrice", function(newVal, oldVal){
/*
        if(newVal === 0 && $scope.maxPrice === $scope.maxSliderValue){
            $scope.filterTree.selectedFilters = $scope.filterTree.selectedFilters.filter(sf => sf.type !==  12);
            console.log("Selected filters ", $scope.filterTree.selectedFilters);
        }
*/

    });
    $scope.$watch("maxPrice", function(newVal, oldVal){
/*
        if(newVal === $scope.maxSliderValue && $scope.minPrice === 0){
            $scope.filterTree.selectedFilters = $scope.filterTree.selectedFilters.filter(sf => sf.type !==  12);
        }
*/

    });


    $scope.minPrice = 0;
    $scope.maxPrice = roundUp($scope.filterTree.maxPrice);
    $scope.maxSliderValue = roundUp($scope.filterTree.maxPrice);

    $scope.updatePriceRange = function(){
        $scope.context.to = $scope.maxPrice;
        $scope.context.from = $scope.minPrice;

        loadProducts(getUrl(), null, true);
    };


    $scope.filterTree = filterTree;
    $scope.slider = {
        options: {
            floor: 0,
            ceil: $scope.maxSliderValue,
            step: 1000,
            minRange: 0,
            translate: function (value) {
                return '$' + value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
            }
        }
    };

    $scope.isShowFilters = false;

    ctrl.hasEntered = false;
    ctrl.closeTimer = null;

    $scope.onMouseEnter = function(evt) {
        ctrl.hasEntered = true;
        if (ctrl.closeTimer) {
            $scope.isShowFilters = true;
            $timeout.cancel(ctrl.closeTimer);
            ctrl.closeTimer = null;
        }
    }
    $scope.onMouseLeave = function() {
        if (ctrl.hasEntered) {
            ctrl.closeTimer = $timeout(function() {
                $scope.isShowFilters = false;
                $scope.$apply();
            }, 700);
            /*
            ctrl.closeTimer = setTimeout(() => {
                $scope.isShowFilters = false;
            }, 500); // 500ms delay before closing*/
        }
    }

    $scope.showFilters = function () {
        $scope.isShowFilters = !$scope.isShowFilters;
        $scope.filterControlHeight = getHeightFromDivToBottom("show-filter-btn") - 10;

        if($scope.isShowPrecio)
            $timeout(function () {
                $scope.$broadcast('rzSliderForceRender');
            }, 100);

    }

    $scope.showPrecio = function () {
        $scope.isShowPrecio = !$scope.isShowPrecio;
        if($scope.isShowPrecio)
            $timeout(function () {
                $scope.$broadcast('rzSliderForceRender');
            }, 100);
    }


    // load url
    if(document.location.hash != null && document.location.hash.length > 0){
//        context.empty();

        var hashstr = document.location.hash.substring(1);
        var params = hashstr.split("&");
        for(const param of params){

            var paramValue = param.split("=");
            if(!paramValue > 1)
                continue;
            const type = getTypeByParamName(paramValue[0]);


            if(paramValue[0] === "to")
                context.to = paramValue[1];
            else if(paramValue[0] === "from")
                context.from = paramValue[1];
            else
                context.addParam(paramValue[0], decodeURIComponent(paramValue[1]), paramValue[2]);

            const all = getAllFacets();
            for(var a of all){
                if(a.type === type && a.id == paramValue[1]){
                    a.isSelected = true;
                }
            }

        }
        var url = getUrl();
        loadProducts(url, null, false);
    }


});
motocard.addAngularModule("filterModule");
