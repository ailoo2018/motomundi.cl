/* version 1.3 */

function encodeAmpersands(str) {
    return (""+str).replace(/&/g, '%26');
}

function FilterContext() {
    this.params = [];
    this.to = 0;
    this.from = 0;
    this.sword = "";
    this.facetMap = {
        "brandId" : 1,
        "categoryId": 2,
        "categories": 2,
        "tagsIds": 4,
        "modelId": 5,
        "models": 5,
        "colors": 6,
        "sizeId": 7,
        "showLatest" : 8,
        "showOnlyDiscounts" : 9,
        "facets" : 11
    };


    this.getPage = function () {
        for(var p of this.params) {
            if(p.name === "page")
                return p.value
        }
        return 1;
    }

    this.getOrderBy = function () {
        for(var p of this.params) {
            if(p.name === "orderBy")
                return p.value
        }
        return "name:asc";
    }


    this.isPageLevelFilter = function(type, id)    {
        var prms = jQuery.grep(this.params,
            function (v) {
                if(id !== undefined)
                    return v.name == type && v.value == id;
                return v.name == type;
            });

        if (prms != null && prms.length > 0)
            return prms[0].isPageLevel;
        return false;
    };

    this.hasFilter = function(type, notPageLevel )    {
        var prms = jQuery.grep(this.params,
            function (v) {
                if(notPageLevel)
                    return v.name == type && !v.isPageLevel;
                return v.name == type;
            });

        if (prms != null && prms.length > 0)
            return true;
        return false;
    };

    this.findAllByName = function(name){
        var prms = jQuery.grep(this.params,
            function (v) {
                return v.name == name;
            });

        return prms;

    };

    this.getPriceFrom = () => { return this.from }

    this.getPriceTo = () => { return this.to }

    this.getSword = () => { return this.sword; }

    this.addParam = function (name, value, desc, isPageLevel) {

        if(isPageLevel == undefined)
            isPageLevel =false;

        if (
                name == "page" ||
                name == "showLatest" ||
                name == "showOnlyDiscounts" ||
                name == "orderBy" ||
                name == "sword" ||
                name == "manufacturerId" ||
                name == "yearId" ||
                name == "bikeModelId" ||
                name == "bikeBrandId" ||
                name == "bikeYear" ||
                name == "tire"
        ) {
            this.params = jQuery.grep(this.params,
                function(v) {
                    return v.name != name;
                });

            if(name === "sword")
                this.sword = value;

        } else {
            this.params = jQuery.grep(this.params, function (v) {
                return !(v.name == name && v.value == value);
            });

        }

        if(desc === undefined)
            desc = "";

        this.params.push({ "name": name, "value": value, "desc": desc, isPageLevel: isPageLevel, type : this.facetMap[name] });
    };

    this.removeParam = (id, type) => {
        this.params = this.params.filter(p => !(p.value == id ));

    }

    this.remove = function(name, id) {
        this.params = jQuery.grep(this.params, function (v) {
            if (id == null || name == "tire")
                return v.name != name;
            return !(v.name == name && v.value == id);
        });

        if (name == "brandId")
            filterTree.models = [];

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

    this.getUrl = function(baseUrl) {
        var url = "/ProductJson/ListProducts.rails?a=1";

        if (baseUrl) {
            url = baseUrl;
        }

        for (var i = 0; i < this.params.length; i++) {
            var p = this.params[i];

            // do not include page level filters if a filter of the same type is selected by user
            url += "&" + this.params[i].name + "=" + encodeURIComponent(this.params[i].value);
//            url += "&" + this.params[i].name + "=" + encodeAmpersands(this.params[i].value);
        }



        if (this.to > 0)
            url = url + "&from=" + this.from + "&to=" + this.to;

        return (url);
    };

    this.getAnchor = function() {
        var url = "";
        for (var i = 0; i < this.params.length; i++) {
            var p = this.params[i];
            url += "&" + this.params[i].name + "=" + this.params[i].value

            if(this.params[i].desc !== undefined     && this.params[i].desc !== "")
                url += "=" + this.params[i].desc;
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

