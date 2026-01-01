
jQuery(document).ready(
function () {
    jQuery("span.plus").parent().parent().find('ul').css('display', 'none');
    jQuery(".collapsible").click(function () {
        jQuery(this).parent().find('ul').slideToggle(150);

        if (jQuery(this).parent().find('span').attr('class') == 'plus') {
            jQuery(this).parent().find('span').attr('class', 'minus');
        } else {
            jQuery(this).parent().find('span').attr('class', 'plus');
        }
    });
}
);

jQuery().ready(
function () {
    jQuery('.minipdp').bind(
	{
	    mouseenter: function () {
	        var prod_uid = jQuery(this).attr('data-produid');
	        jQuery('.minipdp').children('.minipdpcontainer').hide();
	        jQuery(this).children('.minipdpcontainer').data('hover', true);
	        if (jQuery(this).children('.minipdpcontainer').html() != 'empty') {
	            if (jQuery(this).children('.minipdpcontainer').html() == '') {
	                jQuery(this).children('.minipdpcontainer').load('/Product/MiniPdp.rails?sku=' + '&prod_uid=' + prod_uid,
					function () {
					    if (jQuery(this).html().replace(/^\s+|\s+$/g, '') != '' && jQuery(this).data('hover') == true) {
					        jQuery('.minipdp').children('.minipdpcontainer').hide();
					        var thedivid = '#' + jQuery(this).children('.minipdpswatches').attr('id');
					        jQuery(this).fadeIn(200, function () { scrolldivShowArrows(thedivid); });
					    }
					    if (jQuery(this).html().replace(/^\s+|\s+$/g, '') == '') {
					        jQuery(this).html('empty');
					    }
					});
	            } else {
	                jQuery('.minipdp').children('.minipdpcontainer').hide();
	                var thedivid = '#' + jQuery(this).children('.minipdpcontainer').children('.minipdpswatches').attr('id');
	                jQuery(this).children('.minipdpcontainer').fadeIn(200, function () { scrolldivShowArrows(thedivid); });
	            }
	        }
	    },
	    mouseleave: function () {
	        jQuery('.minipdp').children('.minipdpcontainer').hide();
	        jQuery(this).children('.minipdpcontainer').data('hover', false);
	    }
	});
});

function scrolldiv(thedivid, updown) {
    if (isNumber( jQuery(thedivid).data('clickcount')) == false) {
        jQuery(thedivid).data('clickcount', 0);
    }
    if (updown == 'up') {
        jQuery(thedivid).data('clickcount', parseInt(jQuery(thedivid).data('clickcount')) + 1);
    } else {
        jQuery(thedivid).data('clickcount', parseInt(jQuery(thedivid).data('clickcount')) - 1);
    }
    var animationOffset = jQuery(thedivid).outerHeight() * jQuery(thedivid).data('clickcount');
    jQuery('.minipdpuparrow').show();
    jQuery('.minipdpdownarrow').show();
    if (animationOffset < 0 - (jQuery(thedivid).children().outerHeight() - 10)) {
        jQuery(thedivid).data('clickcount', parseInt(jQuery(thedivid).data('clickcount')) + 1);
        return false;
    }
    if (animationOffset > 0) {
        jQuery(thedivid).data('clickcount', 0);
        return false;
    }
    jQuery(thedivid).children().animate({ "marginTop": animationOffset + "px" }, "fast", "swing", function () { scrolldivShowArrows(thedivid) });
    return false;
}

function scrolldivShowArrows(thedivid) {
    if (jQuery(thedivid).data('clickcount') == false) {
        jQuery(thedivid).data('clickcount', 0);
    }
    var animationOffset = jQuery(thedivid).outerHeight() * (jQuery(thedivid).data('clickcount') - 1);
    jQuery('.minipdpuparrow').show();
    jQuery('.minipdpdownarrow').show();
    if (animationOffset < 0 - (jQuery(thedivid).children().outerHeight() - 10)) {
        jQuery('.minipdpdownarrow').hide();
    }
    if (jQuery(thedivid).data('clickcount') > -1) {
        jQuery('.minipdpuparrow').hide();
    }
}


function isNumber(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}