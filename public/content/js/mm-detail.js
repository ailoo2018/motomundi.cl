



function featureChanged(price) {
    var features = "";

    if (document.getElementById("features") != null)
        features = document.getElementById("features").value;

    jQuery('#loaderImg').show();

    var url = '/Product/Availability.rails?productId=';
    url += document.getElementById("productId").value;

    if (features != "") {
        var featuresArr = features.split(',');

        for (i = 0; i < featuresArr.length; i++) {
            url += "&featuresIds=" + featuresArr[i];
        }
    }

    if(price != null)
        jQuery('#price').html(price);
    jQuery.get(url, function (data) {
        jQuery('#loaderImg').hide();
        jQuery('#result').html(data);
        
        var validate_nostock = jQuery("#validate_nostock").val();
        if (validate_nostock == 1) {
            jQuery("#btn-cart").prop("disabled", true);
        } else {
            jQuery("#btn-cart").prop("disabled", false);
        }
    });
}


jQuery(document).ready(function () {
    jQuery(".msdropdown").msDropdown();
    jQuery('#qaLayer').jqm({
        ajax: '@href',
        trigger: 'a.qabtn',
        toTop: true,
        target: "#jqmTarget",
        ajaxText: '<div id="loading" ><div class="loading-indicator"><img src="/Content/images/large-loading.gif" width="32" height="32" style="margin-right:8px;float:left;vertical-align:top;"/><br /><span id="loading-msg">Cargando...</span></div></div><div style="height: 300px"/>'
    });


    jQuery('#jqmClose').click(function () {
        jQuery('#qaLayer').jqmHide(200);
    });
    jQuery('#qabtn').click(function () {
        jQuery('#qaLayer').jqmShow(200);
    });
    jQuery('#sharephotobtn').click(function () {
        jQuery('#qaLayer').jqmShow(200);
    });
    jQuery('#btnWorld').click(function () {
        window.location = "http://www.motomundi.net";
    });

});


// composite=123:23:1,234:23


var compositeFeatureSelectionDialog = (function($) {
    var configMap = {};
    var conf;
    var callback
    var composite = [];

    onFeatureChanged2 = function (productId, featureId, type) {
        var compositeItem = composite.find(function(item, idx, array) {
            return (item.productId == productId);
        });

        if (compositeItem == null) {
            compositeItem = { productId: productId, colorId: 0, sizeId: 0 };
            composite.push(compositeItem);
        }

        compositeItem[type] = featureId;
    }

    show = function () {
        var $dlg = $("#comp-ftr-sel-dlg");
        $dlg.find('.ftr-sel-row').empty();
        var $tbl = $("<table>");
        $tbl.appendTo($dlg.find('.ftr-sel-row'));

        conf.composite.forEach(function (c, index) {
            var $tr = $('<tr>').appendTo($tbl);

            var $td = $("<td>");
            $td.attr("width", "30%");
            $td.append($("<img src='" + c.product.image + "'>"));

            $tr.append($td);

            $td = $("<td>");
            $tr.append($td);
            $td.append("<h4>" + c.product.name + "</h4>");

            if (c.colors != null && c.colors.length > 0) {
                var id = "color-" + c.product.id;

                $("<label for='" + id + "'>").text("Color: ").appendTo($td);
                var $selColor = $("<select id='" + id + "' style='width: 90%;'>");
                $selColor.append($("<option>").attr('value', 0).text("[Seleccione Color]"));
                $td.append($selColor);
                c.colors.forEach(function (cf) {
                    $selColor.append($("<option>").attr('value', cf.id).text(cf.description));
                });

                $selColor.change(function() {
                    onFeatureChanged2(c.product.id, $selColor.val(), "colorId");
                });

                $td.append($("<br/>"));
            }
            if (c.sizes != null && c.sizes.length > 0) {
                var id = "size-" + c.product.id;
                $("<label for='" + id + "'>").text("Tamaño: ").appendTo($td);

                var $selSize = $("<select id='" + id + "' style='width: 90%;'>").appendTo($td);
                $selSize.append($("<option>").attr('value', 0).text("[Seleccione Tamaño]"));
                c.sizes.forEach(function (cf) {
                    $selSize.append($("<option>").attr('value', cf.id).text(cf.description));
                });

                $selSize.change(function () {
                    onFeatureChanged2(c.product.id, $selSize.val(), "sizeId");
                });


            }
            

            $('<tr><td colspan="2"><hr/></td></tr>').appendTo($tbl);


        });

        $btnOk = $dlg.find("#btn-composite-ok");
        $btnOk.click(onComprar);

        $dlg.dialog({ width: 600 });

    };

    onComprar = function() {
        callback(composite);
    }

    setCallback = function (cb) {
        callback = cb;
    };

    initModule = function ($container, config) {
        conf = config;
        return true;
    };

    return {
        initModule: initModule,
        show: show,
        setCallback: setCallback

    };
}(jQuery));
/* end composite feature selection dialog */

var detailPage = (function ($) {

    var conf = null;

    onAddToCart = function () {

        if (conf.product.type == 1 && conf.product.requiresFeatureSelect) {
            compositeFeatureSelectionDialog.setCallback(function(composite) {
                var urlParams = "";
                composite.forEach(function (item, idx) {
                    if (urlParams.length > 0)
                        urlParams += ",";
                    urlParams += "" + item.productId + ":" + item.colorId + ":" + item.sizeId;
                });

                doAddToCart(urlParams);
            });
            compositeFeatureSelectionDialog.show();
            return;
        }

        doAddToCart("");

    }

    doAddToCart = function (composite) {

        var url = "/Product/AddToCart.rails?productId=" + conf.product.id;

        if (conf.product.type == 0 && conf.product.requiresFeatureSelect && document.getElementById("features") != null) {
            var featuresIds = document.getElementById("features").value;
            var featuresArr = featuresIds.split(',');

            for (i = 0; i < featuresArr.length; i++) {
                if (featuresArr[i] == 0) {
                    alert("Debe seleccionar las caracteristicas del producto antes de agregarlo al carro de compras.");
                    return;
                }

                url += "&featuresIds=" + featuresArr[i];
            }
        }
        url += "&composite=" + composite;

        if (fbq) {
            fbq('track', 'AddToCart', {
                content_name: 'Shopping Cart',
                content_ids: conf.product.id,
                content_type: 'product',
                value: conf.price.amount,
                currency: conf.price.unit
            });
        }


        window.location = url;
    }

    initModule = function ($container, config) {
        
        conf = config;
        $(".btn-cart").click(onAddToCart);
        if (conf.product.type == 1 || !conf.product.requiresFeatureSelect) {
            if ($(".product-options-ctrls"))
                $(".product-options-ctrls").hide();

            if ($(".btn-cart span span") != null && conf.product.type == 1 && conf.product.requiresFeatureSelect)
                $(".btn-cart span span").text("Opciones");

            featureChanged(null);
        }
        compositeFeatureSelectionDialog.initModule($("#dialog"), config);
        
        return true;
    }

    return { initModule: initModule };
})(jQuery);



