/* version 1.2 */

function FilterContext() {
    this.params = [];
    this.to = 0;
    this.from = 0;


    this.hasFilter = function(type)
    {
        var prms = jQuery.grep(this.params,
            function (v) {
                return v.name == type;
            });

        if (prms != null && prms.length > 0)
            return true;
        return false;
    }

    this.addParam = function (name, value, desc) {

        if (
            name == "brandId" ||
                name == "page" ||
                name == "orderBy" ||
                name == "sword" ||
                name == "manufacturerId" ||
                name == "yearId" ||
                name == "bikeModelId" ||
                name == "tire"
        ) {
            this.params = jQuery.grep(this.params,
                function(v) {
                    return v.name != name;
                });
        } else {
            this.params = jQuery.grep(this.params, function (v) {
                return !(v.name == name && v.value == value);
            });

        }

        this.params.push({ "name": name, "value": value, "desc": desc });
    };
    this.remove = function(name, id) {
        this.params = jQuery.grep(this.params, function (v) {
            if (id == null || name == "tire")
                return v.name != name;
            return !(v.name == name && v.value == id);
        });

        if (name == "brandId")
            filterTree.models = [];

//        if (name == "categoryId")
  //          this.addParam(name, id, name);

    };

    this.removeAllOfType = function (name) {
        this.params = jQuery.grep(this.params, function (v) {
            return v.name != name;
        });
    };

    this.applies = function (name, id) {
        for (var i = 0; i < this.params.length; i++) {
            if (this.params[i].name == name && this.params[i].value == id)
                return true;
        }

        return false;
    };
    this.empty = function() {
        this.params = [];
    };
    this.findParam = function(name) {
        for (var i = 0; i < this.params.length; i++) {
            if (this.params[i].name == name)
                return this.params[i];
        }

        return null;
    },
    this.getBike = function() {
        if (this.findParam("bikeModelId")) {
            return "Moto " + this.findParam("manufacturerId").desc + " " + this.findParam("bikeModelId").desc + " " + this.findParam("yearId").desc;
        }

        return "";
    };
    this.removeBike = function() {
        this.params = jQuery.grep(this.params, function(v) { return (v.name != "manufacturerId" && v.name != "bikeModelId" && v.name != "yearId"); });

    };

    this.getPriceFrom = () => { return this.from }
    this.getPriceTo = () => { return this.to }

    this.getUrl = function(baseUrl) {
        var url = "/ProductJson/ListProducts.rails?a=1";

        if (baseUrl) {
            url = baseUrl;
        }

        for (var i = 0; i < this.params.length; i++) {
            var p = this.params[i];
            url += "&" + this.params[i].name + "=" + this.params[i].value;
        }

        if (this.to > 0)
            url = url + "&from=" + this.from + "&to=" + this.to;

        return url;
    };
    this.getAnchor = function() {
        var url = "";
        for (var i = 0; i < this.params.length; i++) {
            var p = this.params[i];
            url += "&" + this.params[i].name + "=" + this.params[i].value + "=" + this.params[i].desc;
        }

        if (this.to > 0)
            url = url + "&from=" + this.from + "&to=" + this.to;

        return url;

    };
    this.getFilters = function() {
        var filter = [];

        for (var i = 0; i < this.params.length; i++) {
            if (this.params[i].name != "bikeModelId" && this.params[i].name != "manufacturerId" && this.params[i].name != "yearId" && this.params[i].name != "page" && this.params[i].name != "orderBy")
                filter.push(this.params[i]);
        }


        return filter;
    };

};



function emptySel(selId) {
    var yearsSel = document.getElementById(selId);
    var len = yearsSel.length;
    for (i = len - 1; i > 0; i--) {
        $("#" + selId).msDropdown().data("dd").remove(i);
    }

}

