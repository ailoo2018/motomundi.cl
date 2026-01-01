
angular.module("mm").controller("TireCtrl", function ($scope) {
//   $scope.filterTree.tires.widths.unshift({ id: 0, name: "Todas"});
//  $scope.filterTree.tires.aspects.unshift({ id: 0, name: "Todas"});
 //  $scope.filterTree.tires.rims.unshift({ id: 0, name: "Todas"});

//    if(filterTree != null && filterTree.tires != null)
  //      $scope.tireFilterModel = filterTree.tires;
    $scope.selectedWidth = "0";
    $scope.selectedAspect = "0";
    $scope.selectedRim = "0";

    // alert("in: " + $scope.context);

    $scope.$watch("selectedWidth", function(newVal, oldVal){
        $scope.onSelected("width", newVal);
    });
    $scope.$watch("selectedAspect", function(newVal, oldVal){
        $scope.onSelected("height", newVal);
    });
    $scope.$watch("selectedRim", function(newVal, oldVal){
        $scope.onSelected("rim_size", newVal);
    });

    $scope.$on('filterUpdated', function(event, data){
        var tires = context.findAllByName("tire");
        if(tires != null && tires.length === 1 && tires[0].value != null){
            var tiresArr = tires[0].value.split("|");
            if(tiresArr.length === 3){
                $scope.selectedWidth = tiresArr[0];
                $scope.selectedAspect = tiresArr[1];
                $scope.selectedRim = tiresArr[2];
            }
        }
    });

    $scope.onSelected = function(sel, newVal){
        if(newVal == "0" || newVal == "" || newVal == undefined)
            return;

        var tireSelectCtrl = $("tire_" + sel);
        var removeFilter = $("tire_" + sel + "_remove");
        tireSelectCtrl.setStyle({ position: "absolute", zIndex: -100 });
        removeFilter.innerHTML = "<span class='remove'></span><span>" + newVal + "</span>";
        removeFilter.show();

        if($scope.selectedWidth == null)
            $scope.selectedWidth = 0;
        if($scope.selectedAspect == null)
            $scope.selectedAspect = 0;
        if($scope.selectedRim == null)
            $scope.selectedRim;

        context.addParam("tire", $scope.selectedWidth + "|" + $scope.selectedAspect + "|" + $scope.selectedRim, "");
        $scope.$emit('contextChanged', { message: "tire selected" });

    };

    $scope.remove = function(sel){
        var tireSelectCtrl = $("tire_" + sel);
        var removeFilter = $("tire_" + sel + "_remove");

        tireSelectCtrl.value = "";
        removeFilter.hide();
        tireSelectCtrl.setStyle({ position: "static", zIndex: "" });

        if(sel === "width")
            $scope.selectedWidth = "0";
        if(sel === "height")
            $scope.selectedAspect = "0";
        if(sel === "rim_size")
            $scope.selectedRim= "0";
        context.addParam("tire", $scope.selectedWidth + "|" + $scope.selectedAspect + "|" + $scope.selectedRim, "");
        $scope.$emit('contextChanged', { message: "tire selected" });

    }

});

