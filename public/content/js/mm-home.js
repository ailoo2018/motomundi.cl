var imagesInScroll = 5;
var carrouselCounter = {idx: 1};
//var recentlyAddedIdx = 1;
//var bestDealsAddedIdx = 1;

jQuery(function () {


//    jQuery('#content_scroller').jScrollPane({showArrows: true, horizontalGutter: 10});
    jQuery('#mycarousel').jcarousel({wrap: 'circular', initCallback: mycarousel_initCallback, scroll: imagesInScroll});
    jQuery('#bestsellercarousel').jcarousel({wrap: 'circular', initCallback: bestseller_initCallback, scroll: imagesInScroll});
    jQuery('#mycarousel2').jcarousel({
        wrap: 'circular',
        initCallback: bestdealsbox_initCallback,
        scroll: imagesInScroll
    });
    //  jQuery('#mycarousel3').jcarousel({ wrap: 'circular', initCallback: videos_initCallback, scroll: 3 });

    var myClose = function (hash) {
        jQuery('#previewContent').html('');
        hash.w.fadeOut('0', function () {
            hash.o.remove();
        });
    };
    jQuery('#previewLayer').jqm({onHide: myClose});

    jQuery('.previewButton').click(function () {
        jQuery('#previewContent').html('<iframe width="640" height="360" src="http://www.youtube.com/embed/' + jQuery(this).data("prod") + '" frameborder="0" allowfullscreen></iframe>');
        jQuery('#previewLayer').jqmShow(200); //show previewLayer
    });

});

function mycarousel_initCallback(carousel) {
    var pages = parseInt(carousel.size() / imagesInScroll);
    if ((carousel.size() % imagesInScroll) > 0)
        pages += 1;

    initNav2(pages, '#recentlyaddedbox2');
};

function bestdealsbox_initCallback(carousel) {
    var pages = parseInt(carousel.size() / imagesInScroll);
    if ((carousel.size() % imagesInScroll) > 0)
        pages += 1;

    initNav2(pages, '#bestdealsbox');
};


function bestseller_initCallback(carousel) {
    var pages = parseInt(carousel.size() / imagesInScroll);
    if ((carousel.size() % imagesInScroll) > 0)
        pages += 1;

    initNav2(pages, '#bestsellerbox');
};
function videos_initCallback(carousel) {
    var pages = parseInt(carousel.size() / 3);
    if ((carousel.size() % 3) > 0)
        pages += 1;

    initNav2(pages, '#videosbox');
}


function initNav2(pages, ctlId) {
    var bestDealsAddedIdx = 1;
    jQuery(ctlId + ' .jcarousel-skin-tango .jcarousel-next-horizontal').bind('click', function () {
        jQuery(ctlId + ' .jcarousel-control .img_' + bestDealsAddedIdx).attr('src', '/Content/images/control_dot.gif');
        bestDealsAddedIdx = (bestDealsAddedIdx % pages) + 1;
        jQuery(ctlId + ' .jcarousel-control .img_' + bestDealsAddedIdx).attr('src', '/Content/images/control_dot_active.gif');
    });
    jQuery(ctlId + ' .jcarousel-skin-tango .jcarousel-prev-horizontal').bind('click', function () {
        jQuery(ctlId + ' .jcarousel-control .img_' + bestDealsAddedIdx).attr('src', '/Content/images/control_dot.gif');
        bestDealsAddedIdx = (bestDealsAddedIdx % pages) - 1;
        if (bestDealsAddedIdx == 0)
            bestDealsAddedIdx = pages;
        if (bestDealsAddedIdx < 0)
            bestDealsAddedIdx = pages - 1;
        jQuery(ctlId + ' .jcarousel-control .img_' + bestDealsAddedIdx).attr('src', '/Content/images/control_dot_active.gif');
    });
    jQuery(ctlId + ' .jcarousel-control img').bind('click', function () {
        var idx = this.id.substr(4);
        carousel.scroll(jQuery.jcarousel.intval(((idx - 1) * bestDealsAddedIdx) + 1));
        this.src = '/Content/images/control_dot_active.gif';
        jQuery(ctlId + ' .jcarousel-control .img_' + bestDealsAddedIdx).attr('src', '/Content/images/control_dot.gif');
        bestDealsAddedIdx = idx;

        return false;
    });

}

