

angular.module("motorbikeForm", []).controller("MotorbikeFormCtrl", function ($scope, $rootScope){

    $scope.motorbikeBrands = [];
    $scope.motorbikeModels = [];
    $scope.motorbikeYears = [];
    $scope.sendDisable = true;


        return;
    $scope.motorbikeBrand = $scope.motorbikeBrands[0];

    $scope.$watch("motorbikeBrand", function(newVal, oldVal){
        if(newVal == null || newVal.id == 0)
            return;

//        $rootScope.$emit("contextChanged", { field: "motorbikeBrand" });

//        context.addParam("bikeBrandId", newVal.id, newVal.name);

        $scope.motorbikeModelsLoading = true;


        mmservice.listModels(newVal.id, {
            success: function(result){

                $scope.motorbikeModels = result;
                $scope.motorbikeModelsLoading = false;

                var empty = { id: 0, name: "SELECCIONA MODELO..."};
                $scope.motorbikeModels.unshift(empty);
                $scope.motorbikeModel = empty;

            }
        });
    });


    $scope.$watch("motorbikeModel", function(newVal, oldVal){
        if(newVal == null || newVal.id == 0)
            return;

        $scope.motorbikeYearsLoading = true;
      //  context.addParam("bikeModelId", newVal.id, newVal.name);
        mmservice.listBikeYears(newVal.id, {
            success: function(result){
                $scope.motorbikeYears = result;
                $scope.motorbikeYearsLoading = false;
                var empty = { id: 0, name: "SELECCIONA AÑO..."};
                $scope.motorbikeYears.unshift(empty);
                $scope.motorbikeYear = empty;

            }
        });
    });

    $scope.$watch("motorbikeYear", function(newVal, oldVal){
        if(newVal == null || newVal.id == 0) {
            $scope.sendDisable = true;
            return;
        }

        $scope.sendDisable = false;
        context.addParam("bikeYear", newVal.id, newVal.name);

//        alert(context.getPath("/Product/ListProducts.rails?a=1"));
    });

    $scope.filterMotorbikeProducts= function(e){
        window.location.href = context.getUrl("/Product/ListProducts.rails?a=1");
    };

    $scope.motorbikeBrandsLoading = true;
    mmservice.listMotorBikeBrands({
        success: function(result){
            $scope.motorbikeBrands = result.data;

            var empty = { id: 0, name: "SELECCIONA MARCA..."};
            $scope.motorbikeBrand = empty;
            $scope.motorbikeBrands.unshift(empty);
            $scope.motorbikeBrandsLoading = false;
        }
    });
});