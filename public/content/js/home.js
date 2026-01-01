var app = angular.module("mm");

var nlModal;
var nlPopover;

var CURRENCIES = {
    "CLP": {symbol: "$"},
    "USD": {symbol: "US$"},
    "EUR": {symbol: "€"},
    "GBP": {symbol: "£"}

};

app.factory('debounce', function ($timeout) {
    return function (callback, delay) {
        var timeoutId;
        return function () {
            var context = this;
            var args = arguments;
            $timeout.cancel(timeoutId);
            timeoutId = $timeout(function () {
                callback.apply(context, args);
            }, delay);
        };
    };
});

angular.module('mm')
  .service('DepartmentService', ['$cookies', function($cookies) {

      // Cookie configuration
      var cookieConfig = {
          // Cookie expiration - 30 days by default
          expires: new Date(new Date().getTime() + 30 * 24 * 60 * 60 * 1000),
          // Path where cookie is accessible - root path by default
          path: '/'
      };

      // Cookie name
      var DEPARTMENT_COOKIE_NAME = 'currentDepartment';

      return {
          // Set the current department
          setCurrentDepartment: function(department) {
              $cookies.put(DEPARTMENT_COOKIE_NAME, department, cookieConfig);
          },

          // Get the current department
          getCurrentDepartment: function() {
              return $cookies.get(DEPARTMENT_COOKIE_NAME);
          },

          // Check if a department is selected
          hasDepartment: function() {
              return !!this.getCurrentDepartment();
          },

          // Clear the department cookie
          clearDepartment: function() {
              $cookies.remove(DEPARTMENT_COOKIE_NAME, { path: cookieConfig.path });
          }
      };
  }]);


angular.module("mm").controller("BlogSearchCtrl", function ($scope, $uibModal, $http, $timeout, debounce, DepartmentService) {
    $scope.sword = "";
    $scope.isShowSearch = false;

    $scope.searchSelector = {
        id: "blog_search",
        isShow: false,
        sword: "",
        next: 'model-selector',
        selected: null,
        index: 0,
        filtered: null
    };

    $scope.entries = [];

    $scope.showSearchResults = function (selector) {
//        $scope.isShowSearch = true;
    }



    $scope.handleKeyDown = function (event, selector) {
        scope = $scope;
//        $scope.searchSelector.isShowSearch = true;
        switch (event.keyCode) {
            case 9:
                event.preventDefault();  // Prevent the default tab action
                $timeout(function () {
                    var nextEl = document.getElementById(selector.next);
                    if (nextEl != null)
                        nextEl.focus();
                }, 0);
                break;
            case 38: // Up arrow
                scope.lastKey = 'Down Arrow';
                selector.index--;
                selector.isShow = true;
                if (selector.index <= 0)
                    selector.index = 0;

                break;
            case 40: // Down arrow
                selector.isShow = true;
                scope.lastKey = 'Up Arrow';
                selector.index++;
                if (selector.index > selector.filtered.length - 1)
                    selector.index = selector.filtered.length - 1;

                break;
            case 13: // Enter
                selector.isShow = false;
                selector.selected = $scope.entries[selector.index];
                selector.sword = selector.selected.name;

                if (selector.selected != null)
                    $scope.openBlog(selector.selected.id);

                break;
            default:
                scope.lastKey = 'Other Key';
                //           selector.isShow = true;
                selector.index = 0;

                if ($scope.sword.length > 3) {
                    $scope.search();
                }

        }

        $scope.onSelectEntry = function (entry) {
            $scope.openBlog(entry.id);
        }

        $scope.openBlog = function (entryId) {
            window.location = "/Blog/View.rails?id=" + entryId;
        }

        $scope.search = debounce(function () {
            $http.get("/Blog/Search.rails?sword=" + $scope.sword).then(function (ret) {
                $scope.entries = ret.data.entries;
                $scope.searchSelector.isShow = $scope.entries.length > 0;
            });
        }, 300);


    }

});

angular.module("mm").controller('EventsCtrl', function ($scope, $http, $timeout) {


    $scope.fetchEvents = function () {
        $http.post("/Events/List.rails", {}).then(function (ret) {
                $scope.events = ret.data;
            }
        );
    }

    $scope.isShowRecommend = false;
    $scope.showRecommendEventForm = function () {
        $scope.isShowRecommend = true;
    }

    $scope.closeRecommend = function () {
        $scope.isShowRecommend = false;
    }

    $scope.eventForm = {
        title: "",
        startDate: new Date(),
        endDate: null,
        location: "",
        email: "",
        phone: "",
        summary: "",
        eventUrl: ""
    };

    $scope.onRecommendEvent = function () {
        $http.post("/Events/Recommend.rails", $scope.eventForm).then(function (ret) {
            $scope.isShowRecommend = false;

            $scope.showMessage = true;
            $timeout(function () {
                $scope.showMessage = false;
            }, 2000);

        });
    }

    $scope.fetchEvents();

});

angular.module("mm").controller('FullcalendarCtrl', function ($scope, $http) {

    var date = new Date();
    var d = date.getDate();
    var m = date.getMonth();
    var y = date.getFullYear();

    /* event source that pulls from google.com */
    $scope.eventSource = {
        url: "http://www.google.com/calendar/feeds/usa__en%40holiday.calendar.google.com/public/basic",
        className: 'gcal-event',           // an option!
        currentTimezone: 'America/Chicago' // an option!
    };

    /* event source that contains custom events on the scope */

    /*$scope.events = [
        {title:'Game racing', start: new Date(y, m, 6, 16, 0), className: ['b-l b-2x b-info'], location:'Hongkong', info:'The most big racing of this year.'},
    ];
*/

//   $scope.events = [];
    $scope.fetchEvents = function () {
        $http.post("/Events/List.rails", {}).then(function (ret) {
                $scope.eventSources.push([]);
                for (var e of ret.data) {
                    $scope.eventSources[0].push({
                        title: e.title,
                        start: new Date(e.startDate),
                        end: new Date(e.endDate),
                        startDate: e.startDate,
                        endDate: e.endDate,
                        url: "",
                        className: ['b-l b-2x b-info'],
                        location: e.location,
                        info: e.summary
                    });
                }
            }
        );
    }

    $scope.fetchEvents();


    /* alert on dayClick */
    $scope.precision = 400;
    $scope.lastClickTime = 0;
    $scope.alertOnEventClick = function (date, jsEvent, view) {
        var time = new Date().getTime();
        if (time - $scope.lastClickTime <= $scope.precision) {
            $scope.events.push({
                title: 'New Event',
                start: date,
                className: ['b-l b-2x b-info']
            });
        }
        $scope.lastClickTime = time;
    };
    /* alert on Drop */
    $scope.alertOnDrop = function (event, delta, revertFunc, jsEvent, ui, view) {
        $scope.alertMessage = ('Event Droped to make dayDelta ' + delta);
    };
    /* alert on Resize */
    $scope.alertOnResize = function (event, delta, revertFunc, jsEvent, ui, view) {
        $scope.alertMessage = ('Event Resized to make dayDelta ' + delta);
    };

    $scope.overlay = $('.fc-overlay');
    $scope.alertOnMouseOver = function (event, jsEvent, view) {
        $scope.event = event;
        $scope.overlay.removeClass('left right top').find('.arrow').removeClass('left right top pull-up');
        var wrap = $(jsEvent.target).closest('.fc-event');
        var cal = wrap.closest('.calendar');
        var left = wrap.offset().left - cal.offset().left;
        var right = cal.width() - (wrap.offset().left - cal.offset().left + wrap.width());
        var top = cal.height() - (wrap.offset().top - cal.offset().top + wrap.height());
        if (right > $scope.overlay.width()) {
            $scope.overlay.addClass('left').find('.arrow').addClass('left pull-up')
        } else if (left > $scope.overlay.width()) {
            $scope.overlay.addClass('right').find('.arrow').addClass('right pull-up');
        } else {
            $scope.overlay.find('.arrow').addClass('top');
        }
        if (top < $scope.overlay.height()) {
            $scope.overlay.addClass('top').find('.arrow').removeClass('pull-up').addClass('pull-down')
        }
        (wrap.find('.fc-overlay').length == 0) && wrap.append($scope.overlay);
    }

    /* config object */
    $scope.uiConfig = {
        calendar: {
            height: 700,
            editable: true,
            header: {
                left: 'prev',
                center: 'title',
                right: 'next'
            },
            dayClick: $scope.alertOnEventClick,
            eventDrop: $scope.alertOnDrop,
            eventResize: $scope.alertOnResize,
            eventMouseover: $scope.alertOnMouseOver
        }
    };

    /* add custom event*/
    $scope.addEvent = function () {
        $scope.events.push({
            title: 'New Event',
            start: new Date(y, m, d),
            className: ['b-l b-2x b-info']
        });
    };

    /* remove event */
    $scope.remove = function (index) {
        $scope.events.splice(index, 1);
    };

    /* Change View */
    $scope.changeView = function (view, calendar) {
        $('.calendar').fullCalendar('changeView', view);
    };

    $scope.today = function (calendar) {
        $('.calendar').fullCalendar('today');
    };

    /* event sources array*/
    $scope.eventSources = [];
});

angular.module("mm").controller("BlogCommentsCtrl", function ($scope, $uibModal, $http, $timeout, $element) {
    $scope.commentForm = {
        comment: "",
        email: "",
        author: "",
        postId: 0,
        accept: false
    };

    var commentsDiv = $element.find('#comment-post-id')[0];
    $scope.postId = commentsDiv.getAttribute('data-post-id');

    $scope.isSaving = false;
    $scope.showMessage = false;


    $scope.$on("commentAComment", function (event, data, callback) {
        data.postId = $scope.commentForm.postId;
        $http.post("/Blog/PostComment.rails", data).then(function (ret) {

            if (callback)
                callback(ret.data);

            $scope.showMessage = true;
            $timeout(function () {
                $scope.showMessage = false;
            }, 2000);
        }).catch(function () {
            $scope.isSaving = false;
        });
    });

    $scope.sendComment = function () {
        $scope.isSaving = true;
        $http.post("/Blog/PostComment.rails", $scope.commentForm).then(function () {

            $scope.isSaving = false;

            $scope.showMessage = true;
            $timeout(function () {
                $scope.showMessage = false;
            }, 2000);
        }).catch(function () {
            $scope.isSaving = false;
        });
    }

    $scope.getComments = function () {
        $http.get("/Blog/GetComments.rails?postId=" + $scope.postId).then(function (ret) {
            $scope.comments = ret.data;
        });
    }

    $scope.getComments();


});

angular.module("mm").controller("BlogCtrl", function ($scope, $uibModal, $http, $timeout, $cookies, $sce, $compile, $window) {
    $scope.showBlogMenu = false;


});

angular.module("mm").controller("AppCtrl", function ($scope, $uibModal, $http, $timeout, $cookies, $sce, $compile, $window, DepartmentService) {
    var scope = $scope;
    var uibModal = $uibModal;
    var timeout = $timeout;
    var cookies = $cookies;


    var lastScrollTop = 0;
    var SCROLL_FROM_TOP = 1;

    // Function to handle scroll event
    var headerElement = document.querySelector('.header-container');

    if (headerElement != null) {
        angular.element($window).bind('scroll', function () {
            var currentScrollTop = $window.pageYOffset || document.documentElement.scrollTop;
            var headerElement = document.querySelector('.header-container');

            if (currentScrollTop > SCROLL_FROM_TOP && currentScrollTop < lastScrollTop) {
                // Scrolling up
                headerElement.classList.add('sticky-header');
            }
            if (currentScrollTop <= SCROLL_FROM_TOP || currentScrollTop > lastScrollTop) {
                // Scrolling down
                headerElement.classList.remove('sticky-header');
            }

            lastScrollTop = currentScrollTop;
            $scope.$apply();
        });
    }


    var departments = {
        3222: "/cafe-racer",
        13672: "/motocross-enduro-trial"
    };

    $scope.selectedDepartment =0;
    $scope.selectDepartment = function(departmentId, url) {
        console.log("Current dpartment", departmentId);
        $scope.selectedDepartment = departmentId;
        DepartmentService.setCurrentDepartment(departmentId);

        window.location= url;
    };

    // Check if a specific department is selected (for UI highlighting)
    $scope.isDepartmentSelected = function(departmentId) {
        return $scope.selectedDepartment === departmentId;
    };

    $scope.isWished = function (prodId) {
        if ($scope.wished != null) {
            if ($scope.wished[prodId] != null)
                return $scope.wished[prodId];
        }
        return false;
    }

    $scope.addRemoveToWishList = function (productId, event) {
        var buttonElement = angular.element(event.currentTarget);
        var addRemove = "1";
        if (buttonElement.hasClass("wished"))
            addRemove = "0";

        $http.get("/Ajax/AddToWishList.rails?productId=" + productId + "&addRemove=" + addRemove)
            .then(function (ret) {
                if (addRemove === "1")
                    buttonElement.addClass('wished');
                else
                    buttonElement.removeClass('wished');
            });
    }

    /******* cart **************/
    /*    $scope.$watch('isCartOpen', function(newVal, oldVal){
            if(newVal)
                $scope.loadCart();
        });*/


    $scope.loadingCart = false;
    $scope.loadCart = function () {
        $scope.loadingCart = true;
        $http.get("/cart/cart.rails").then(function (ret) {
            $scope.loadingCart = false;
            $scope.cart = ret.data.cart;

            angular.forEach($scope.cart.items, function (item) {
                item.isLoading = false;
            });

        });
    }

    $scope.getCartTotalItems = function () {

        var total = 0;

        if ($scope.cart) {
            angular.forEach($scope.cart.items, function (item) {
                total += item.quantity;
            });
        }
        return total;

    }

    $scope.loadCart();

    /************* user menu *************/
    $scope.isShowUserMenu = false;
    $scope.currentUser = null;
    $scope.wished = {};
    $http.get("/Ajax/CurrentUser.rails").then(function (ret) {
        if (ret.data.id) {
            $scope.currentUser = ret.data;

            if ($scope.currentUser.wishlist != null) {
                for (var wid of $scope.currentUser.wishlist) {
                    $scope.wished["" + wid] = true;
                }
            }

        } else {
            $scope.currentUser = null;
        }
    });

    $scope.logout = function () {
        $http.get("/Ajax/DoLogout.rails").then(function (ret) {
            location.reload();
        });
    }

    $scope.isUserLoggedIn = function () {
        return $scope.currentUser != null;
    }

    $scope.getUserInitials = function () {
        if ($scope.currentUser != null)
            return $scope.currentUser.initials;
        return null;
    }

    $scope.toggleUserMenu = function () {
        $scope.isShowUserMenu = !$scope.isShowUserMenu;
    }

    ///// mobile-menu
    $scope.isMenuOpen = false;
    $scope.isCartOpen = false;
    $scope.isSearchOpen = false;
    $scope.showMainMenu = true;
    $scope.menuTitle = "Inicio";

    $scope.toggleMenu = function () {
        $scope.isMenuOpen = !$scope.isMenuOpen;
    };

    $scope.toggleSearch = function () {
        $scope.isSearchOpen = !$scope.isSearchOpen;
    }


    $scope.backToHome = function () {
        $scope.showMainMenu = true;
        $scope.menuTitle = "Inicio";
        $scope.menuTitleUrl = "";
        $scope.navSec = "";
    }

    $scope.loadMenu = function (menu, title, url) {
        $scope.menuTitle = title;
        $scope.menuTitleUrl = url;
        $http.get("/Menu/LoadMenu.rails?menuId=" + menu).then(function (response) {
            $scope.showMainMenu = false;

            var html = response.data;
            var compiledHtml = $compile(html)($scope);
            angular.element(document.getElementById('navSec')).append(compiledHtml);

            if (false) {
                $scope.navSec = $sce.trustAsHtml(response.data);

                var contentElement = angular.element(document.getElementById('navSec'));
                $compile(contentElement.contents())($scope);
            }

        });
    }

    $scope.showLogin = function () {

    }

    $scope.toggleCart = function () {
        console.log("toggleCart: " + !$scope.isCartOpen)
        $scope.isCartOpen = !$scope.isCartOpen;
    }
    //// end mobile-menu

    ///// login
    $scope.isShowLogin = false;

    $scope.openLogin = function () {
        $scope.isShowLogin = true;
    }

    $scope.closeLogin = function () {
        $scope.isShowLogin = false;
    }

    //// end login


    if (jQuery('.nl-popup')) {
        jQuery('.nl-popup').click(function () {
            doNlPopup();
        });

        jQuery('#nl-subscribebtn').click(function () {

            var o = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            var email = jQuery("#nl-email").val();

            if (!o.test(email)) {
                jQuery(".error").show();
                return;
            }

            jQuery(".error").hide();

            var acceptTemrs = (jQuery("#gdpr-legal-accept-newsletter").prop("checked"));
            if (!acceptTemrs) {
                if (nlPopover != null)
                    nlPopover.webuiPopover("hide");
                nlPopover = jQuery("#nl-checkbox-label").webuiPopover({
                    trigger: "manual",
                    animation: "pop",
                    multi: true,
                    width: 270
                });
                nlPopover.webuiPopover("show");
                return;
            }
            if (nlPopover != null)
                nlPopover.webuiPopover("hide");
            jQuery("#nl-loading").show();
            jQuery.post("/ajax/register.rails", JSON.stringify({email: email}), function (response) {
                nlModal.jqmHide();
                jQuery("#nl-loading").hide();
            }, 'json');
        });

        jQuery('.nl-close').click(function () {
            jQuery('#nlpopup').jqmHide(200);
        });
    }


    if (app != null)
        app.popups.push({
            delay: 10,
            shouldShow: function (cookies) {
                return true;
            },
            callback: function (uibModal, timeout, cookies, popupClosed) {
                jQuery.getJSON("/Ajax/ShowNewsletter.rails", {}, function (response) {
                    if (response.showNewsletter && popupClosed) {
                        setTimeout(doNlPopup, 4000, popupClosed);
                    } else {
                        if (popupClosed)
                            popupClosed();
                    }
                });

            }
        });


    /* brands banner carrusel */
    jQuery(".brands-container").owlCarousel(
        {
            loop: true,
            autoplay: true,
            autoWidth: true
        }
    );

    if (jQuery('.slick-track')) {
        var slickTrack = jQuery(".slick-track").owlCarousel({
//            items: 3, // Show only one owl at a time
            responsive: {
                0: {
                    items: 1 // 0px and up
                },
                600: {
                    items: 2 // 768px and up
                },
                900: {
                    items: 3 // 768px and up
                }
            },

            loop: true
        });

        jQuery('.slider-arrows .next').click(function () {
            slickTrack.trigger('next.owl.carousel');
        });

        jQuery('.slider-arrows .prev').click(function () {
            slickTrack.trigger('prev.owl.carousel');
        });


    }

    /* home carrusel */

    if (jQuery(".home-carousel")) {
        var owl = jQuery(".home-carousel").owlCarousel({
            items: 1, // Show only one owl at a time
            loop: true, // Loop the carousel
            autoplay: true, // Autoplay the carousel
            autoplayTimeout: 4500, // Autoplay interval in milliseconds
            autoplayHoverPause: true, // Pause autoplay on hover
        });

        if (window.innerWidth > 768) {
        if(jQuery(".swiper-slide-selector__container"))
            jQuery(".swiper-slide-selector__container").show();
        }

        jQuery(".swiper-slide-selector").click(function () {
            var item = jQuery(this).data('owl-item');
            owl.trigger('to.owl.carousel', item);

            // Remove active class from all buttons
            jQuery(".swiper-slide-selector").removeClass('active');

            // Add active class to the clicked button
            jQuery(this).addClass('active');
        });
        owl.on('changed.owl.carousel', function (event) {
            var currentItem = event.item.index - 2;
            console.log("current item: " + currentItem);
            jQuery(".swiper-slide-selector").removeClass('active');
            jQuery(".swiper-slide-selector[data-owl-item='" + currentItem + "']").addClass('active');
        });
    }

    if (jQuery(".marquee-group")) {
        jQuery(".marquee-group").owlCarousel({
            items: 1,
            margin: 10,
            loop: true, // Loop the carousel
            autoplay: true, // Autoplay the carousel
            //            autoplayTimeout: 3000, // Autoplay interval in milliseconds
            autoplayHoverPause: true, // Pause autoplay on hover
        });
    }

    if (jQuery(".swiper-wrapper")) {
        jQuery(".swiper-wrapper").owlCarousel({
            items: 1,
            loop: true, // Loop the carousel
            autoplay: true, // Autoplay the carousel
            autoWidth: true
        });
    }


    initCountdown();

    $scope.showPopups = function () {
        var app = angular.module("mm");
        if (app.popups == null || app.popups.length == 0)
            return;
        var popup = app.popups.shift();
        if (popup.shouldShow == null || popup.shouldShow(cookies)) {
            timeout(popup.callback, popup.delay, true, $uibModal, $timeout, $cookies, $scope.showPopups);
        } else {
            timeout($scope.showPopups, 50);
        }
    };
    timeout($scope.showPopups, 50);

})
    .directive('countdownWidget', function () {
        return {
            restrict: 'E',
            scope: {
                endTime: '@'
            },
            template: `
            <div class="countdown">
                <div>{{ days }}
                <span class="countdown-text">días</span>
                </div>
                <div class="countdown__dots" > : </div>
                <div>{{ hours }}
                <span class="countdown-text">horas</span>
                </div>
                <div class="countdown__dots" > : </div>
                <div>{{ minutes }}
                <span class="countdown-text">minutos</span>
                </div>
                <div class="countdown__dots"> : </div>
                <div>{{ seconds }}
                    <span class="countdown-text">segundos</span>
                </div>
            </div>
        `,
            controller: ['$scope', '$interval', function ($scope, $interval) {
                function calculateTimeLeft() {
                    var endTime = new Date($scope.endTime).getTime();
                    var now = new Date().getTime();
                    var timeLeft = endTime - now;

                    $scope.days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
                    $scope.hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                    $scope.minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
                    $scope.seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

                    if (timeLeft < 0) {
                        $interval.cancel(countdownInterval);
                        $scope.days = $scope.hours = $scope.minutes = $scope.seconds = 0;
                    }
                }

                var countdownInterval = $interval(calculateTimeLeft, 1000);
                calculateTimeLeft();  // Initial call to set values immediately
            }]
        };
    })
    .directive("owlCarousel", function () {
        return {
            restrict: 'E',
            transclude: false,
            link: function (scope) {
                scope.initCarousel = function (element) {
                    console.log('initCarousel');

                    // provide any default options you want
                    var defaultOptions = {};
                    var customOptions = scope.$eval($(element).attr('data-options'));
                    // combine the two options objects
                    for (var key in customOptions) {
                        defaultOptions[key] = customOptions[key];
                    }
                    // init carousel
                    var curOwl = $(element).data('owlCarousel');
                    if (!angular.isDefined(curOwl)) {
                        $(element).owlCarousel(defaultOptions);
                    }
                    scope.cnt++;
                };
            }
        };
    }).directive('owlCarouselItem', [
    function () {
        return {
            restrict: 'A',
            transclude: false,
            link: function (scope, element) {
                // wait for the last item in the ng-repeat then call init
                if (scope.$last) {
                    console.log('lst element');
                    scope.initCarousel(element.parent());
                }
            }
        };
    }
]);


angular.module("mm").controller("WishListCtrl", function ($scope, $http, $timeout, $rootScope) {


    $scope.favorites = [];
    $scope.isShowShare = false;

    $scope.showShareDialog = function () {
        $scope.isShowShare = true;
    }

    $scope.removeItem = function (prodId) {
        $timeout(function () {
            $scope.favorites = $scope.favorites.filter(obj => obj.id !== prodId);
        }, 1000);

    }

    $scope.listFavorites = function () {
        $http.get("/ajax/favorites.rails").then(function (ret) {
            $scope.favorites = ret.data.favorites;
        });
    };

    $scope.listFavorites();

});
angular.module("mm").controller("AddressesCtrl", function ($scope, $http, $timeout, $rootScope) {
    $scope.addresses = null;
    $scope.isAddAddress = false;


    $scope.listAddresses = function () {
        $http.get("/Account/ListAddresses.rails").then(function (ret) {
            $scope.addresses = ret.data.addresses;
        });

    };

    $scope.setDefault = function (addr) {

        $http.get("/Account/SetDefaultAddress.rails?id=" + addr.id).then(function () {
                for (var ad of $scope.addresses) {
                    ad.isDefault = false;
                }
                addr.isDefault = true;
            }
        );
    }

    $scope.addAddress = function () {
        window.location = '/Account/EditAddress.rails';
    }

    $scope.deleteAddress = function (address) {
        $http.get("/Account/DeleteAddress.rails?id=" + address.id).then(function (ret) {
            $scope.addresses = $scope.addresses.filter(item => item.id !== address.id);
        });
    }

    $scope.listAddresses();

});
angular.module("mm").controller("EditAddressCtrl", function ($scope, $http, $timeout, $rootScope, $location) {
    $scope.addresses = null;
    $scope.loading = false;

    $scope.comunas = [{name: "Chile", name: "Argentina"}];

    var addressId = 0;

    if ($location.search() != null)
        addressId = $location.search().id;


    $scope.findAddress = function (addressId) {
        $http.get("/Account/FindAddress.rails?id=" + addressId).then(function (ret) {
            $scope.address = ret.data;
        });
    };
    $scope.comunaChanged = function () {
        console.log('Selected country:', $scope.selectedCountry);
        // You can add more logic here to handle the change event
    };

    $scope.searchComunas = function (sword) {
        $http.get("/Account/SearchComuna.rails?sword=" + sword).then(function (ret) {
            $scope.comunas = ret.data.comunas;
        });
    }

    $scope.saveAddress = function () {
        $scope.loading = true;
        $http.post("/Account/SaveAddress.rails", $scope.address).then(function () {
            $scope.loading = false;
            window.location = "/cuenta/direcciones";
        });
    }


    if (addressId > 0)
        $scope.findAddress(addressId);
    else {
        $scope.address = {
            id: 0
        };
    }

});

angular.module("mm").controller("AccountCtrl", function ($scope, $uibModal, $http, $timeout, $cookies, $sce, Upload) {


    $scope.loading = false;
    //$scope.isChangePassword =false;
    $scope.profile = {
        fname: '',
        lname: '',
        birthdate: null,
        phone: null,
        email: null
    };

    $scope.selectedStyles = {
        sport: false,
        cafeRacer: false,
        touring: false,
        urban: false,
        offroad: false,
        adventure: false
    };

    $scope.passwordForm = {
        password: '',
        passwordError: null,
        oldPassword: '',
        oldPasswordError: null,
        password_confirmation: '',
        confirmationError: null,
        loading: false
    };

    $scope.emailForm = {
        isEdit: false,
        isLoading: false,
        email: '',
        password: '',
        error: null
    };
    $scope.isShowCropDialog = false;
    $scope.imageCropped = '';
    $scope.cropImageForm = {
        isLoading: false
    };

    $scope.uploadAvatar = function () {
        document.getElementById('fileAvatar').click();
    };
    $scope.$watch('file', function () {
        if ($scope.file) {
            // $scope.uploadFile($scope.file);

            var reader = new FileReader();
            reader.onload = function (event) {
                $scope.$apply(function ($scope) {
                    $scope.imageOriginal = event.target.result;
                    $scope.isShowCropDialog = true;
                    $timeout(function () {
                        jQuery(".cropper-area").click();
                    }, 20);
                });
            };
            reader.readAsDataURL($scope.file);


        }
    });

    $scope.saveCroppedImage = function () {
        // Convert base64 to blob
        function dataURItoBlob(dataURI) {
            var byteString = atob(dataURI.split(',')[1]);
            var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
            var ab = new ArrayBuffer(byteString.length);
            var ia = new Uint8Array(ab);
            for (var i = 0; i < byteString.length; i++) {
                ia[i] = byteString.charCodeAt(i);
            }

            return new Blob([ab], {type: mimeString});
        }

        var blob = dataURItoBlob($scope.imageCropped);
        var file = new File([blob], "croppedImage.jpg", {type: blob.type});

        // Upload to server
        $scope.avatarUrl = null;
        $scope.cropImageForm.isLoading = true;
        Upload.upload({
            url: '/Ajax/UploadAvatar.rails', // Your API endpoint
            data: {file: file}
        }).then(function (resp) {
            $scope.cropImageForm.isLoading = false;
            $scope.isShowCropDialog = false;
            $scope.avatarUrl = resp.data.path;
//            $scope.imageCropped = new Blob([ab], {type: mimeString});

        }, function (error) {
            $scope.cropImageForm.isLoading = false;

        });
    };


    $scope.savePassword = function () {

        if (isNullOrEmpty($scope.passwordForm.password)) {
            $scope.passwordForm.passwordError = "Debe ingresar un valor";
            return;
        } else {
            $scope.passwordForm.passwordError = null;
        }
        if (isNullOrEmpty($scope.passwordForm.oldPassword)) {
            $scope.passwordForm.oldPasswordError = "Debe ingresar un valor";
            return;
        } else {
            $scope.passwordForm.oldPasswordError = null;
        }
        if (isNullOrEmpty($scope.passwordForm.password_confirmation)) {
            $scope.passwordForm.confirmationError = "Debe ingresar un valor";
            return;
        } else {
            $scope.passwordForm.confirmationError = null;
        }

        if ($scope.passwordForm.password_confirmation != $scope.passwordForm.password) {
            $scope.passwordForm.confirmationError = "Las contraseñas no coinciden";
            return;
        } else {
            $scope.passwordForm.confirmationError = null;
        }


        $scope.passwordForm.loading = true;
        $http.post("/ajax/updatepassword.rails", $scope.passwordForm)
            .then(function (ret) {
                $scope.passwordForm.loading = false;
                $scope.isChangePassword = false;
            }).catch(function () {
            $scope.passwordForm.oldPasswordError = "La contraseña es incorrecta";
        });
    }

    if (userConfiguration != null) {
        $scope.userData = userConfiguration;
        if ($scope.userData.party != null) {
            $scope.profile.fname = $scope.userData.party.fname;
            $scope.profile.lname = $scope.userData.party.lname;
            $scope.profile.email = $scope.userData.email;
            if ($scope.userData.party.birthdate != null)
                $scope.profile.birthdate = new Date($scope.userData.party.birthdate);
            $scope.profile.gender = "" + $scope.userData.party.gender;
            $scope.profile.phone = $scope.userData.party.phone;
            $scope.profile.partyId = $scope.userData.party.id;
            $scope.profile.receiveNewsletter = $scope.userData.party.receiveNewsletter;
            $scope.profile.configuration = $scope.userData.party.configuration;
            if ($scope.profile.configuration == null)
                $scope.profile.configuration = {};
            else {
                $scope.selectedStyles.sport = $scope.userData.party.configuration.styles.sport;
                $scope.selectedStyles.cafeRacer = $scope.userData.party.configuration.styles.cafeRacer;
                $scope.selectedStyles.touring = $scope.userData.party.configuration.styles.touring;
                $scope.selectedStyles.urban = $scope.userData.party.configuration.styles.urban;
                $scope.selectedStyles.offroad = $scope.userData.party.configuration.styles.offroad;
                $scope.selectedStyles.adventure = $scope.userData.party.configuration.styles.adventure;
            }

            if ($scope.profile.fname == null || $scope.profile.fname.length == 0) {
                $scope.profile.fname = $scope.userData.party.name;
            }

            $scope.emailForm.email = $scope.profile.email;
            $scope.avatarUrl = userConfiguration.avatar;
        }
    }

    if (false) {
        $http.get("/ajax/configuration.rails").then(function (ret) {
            $scope.userData = ret.data;
            if ($scope.userData.party != null) {
                $scope.profile.fname = $scope.userData.party.fname;
                $scope.profile.lname = $scope.userData.party.lname;
                if ($scope.userData.party.birthdate != null)
                    $scope.profile.birthdate = new Date($scope.userData.party.birthdate);
                $scope.profile.gender = "" + $scope.userData.party.gender;
                $scope.profile.phone = $scope.userData.party.phone;
                $scope.profile.partyId = $scope.userData.party.id;
                $scope.profile.receiveNewsletter = $scope.userData.party.receiveNewsletter;
                $scope.profile.configuration = $scope.userData.party.configuration;
                if ($scope.profile.configuration == null)
                    $scope.profile.configuration = {};
                else {
                    $scope.selectedStyles.sport = $scope.userData.party.configuration.styles.sport;
                    $scope.selectedStyles.cafeRacer = $scope.userData.party.configuration.styles.cafeRacer;
                    $scope.selectedStyles.touring = $scope.userData.party.configuration.styles.touring;
                    $scope.selectedStyles.urban = $scope.userData.party.configuration.styles.urban;
                    $scope.selectedStyles.offroad = $scope.userData.party.configuration.styles.offroad;
                    $scope.selectedStyles.adventure = $scope.userData.party.configuration.styles.adventure;
                }

                if ($scope.profile.fname == null || $scope.profile.fname.length == 0) {
                    $scope.profile.fname = $scope.userData.party.name;
                }

            }

        });
    }


    $scope.updateEmail = function () {

        if (!validateEmail($scope.emailForm.email)) {
            $scope.emailForm.error = "El email no es valido";
            return;
        } else {
            $scope.emailForm.error = null;
        }

        $scope.emailForm.isLoading = true;

        $http.post("/ajax/UpdateEmail.rails", $scope.emailForm).then(function (ret) {
            $scope.profile.email = $scope.emailForm.email;
            $scope.emailForm.isEdit = false;
            $scope.emailForm.isLoading = false;
            $scope.emailForm.error = null;
        }).catch(function (ret) {
            $scope.emailForm.isLoading = false;
            $scope.emailForm.error = "Error";
            if (ret.data.message) {
                $scope.emailForm.error = ret.data.message;
            }
        });
    }

    $scope.saveProfile = function () {
        $scope.loading = true;
        $scope.profile.configuration.styles = $scope.selectedStyles;
        $http.post("/ajax/saveprofile.rails", $scope.profile).then(function (ret) {
            $scope.loading = false;
        }).catch(function (ret) {
            $scope.loading = false;
            if (ret.data.message) {
                alert(ret.data.message);
            } else {
                alert("error" + JSON.stringify(ret));
            }
        });
    }
});

angular.module("mm").controller("OrdersCtrl", function ($scope, $element, $uibModal, $http, $timeout, $location) {

    $scope.limit = 5;

    var element = $element[0];
    if (element.getAttribute("data-limit")) {
        $scope.limit = element.getAttribute("data-limit");
    }


    $scope.latestOrders = null;
    $scope.listLatestOrders = function () {

        $http.get("/Ajax/LatestOrders.rails?limit=" + $scope.limit).then(function (ret) {
            $scope.latestOrders = ret.data.orders;
        });
    }

    $scope.getOrderClass = function (order) {
        if (order.statusId == 1)
            return "order__error"
        return "order__sent";
    }

    $scope.viewOrder = function (order) {
        window.location = ("/Account/OrderDetail.rails?orderId=" + order.id);
    }


    $scope.listLatestOrders();
});

angular.module("mm").controller("LoginCtrl", function ($scope, $http, $timeout, $rootScope) {

    $scope.redirect = null;

    $scope.recoverFormValues = {
        email: "",
        loading: false,
        sent: false
    };

    $scope.loginFormValues = {
        email: "",
        password: ""
    }

    $scope.registerFormValues = {
        email: "",
        password: "",
        fname: "",
        lname: "",
        receiveNewsletter: true
    }

    $scope.resetPasswordForm = {
        password: "",
        password_repeat: "",
        email: null,
        auth: null,
        sent: false
    };

    $scope.submitResetPassword = function () {

        if ($scope.resetPasswordForm.password !== $scope.resetPasswordForm.password_repeat) {
            $scope.resetPasswordForm.error = "Claves no coinciden";
            return;
        }

        $scope.loading = true;
        $http.post("/Login/ChangePassword.rails", $scope.resetPasswordForm).then(function () {
            $scope.loading = false;
            $scope.resetPasswordForm.sent = true;
        }).catch(function (ret) {
            if (ret.data.message) {
                $scope.errorMessage = ret.data.message;
            } else {
                $scope.errorMessage = "Ocurrio un error";
            }
        });
    }


    $scope.loginLoading = false;
    $scope.registerLoading = false;
    $scope.isShowForgotPassword = false;

    $scope.goBack = function () {
        $scope.isShowForgotPassword = false;
        $scope.recoverFormValues.sent = false;
    }
    $scope.recover = function () {
        $scope.recoverFormValues.loading = true;
        $http.post("/Login/Recover.rails", $scope.recoverFormValues).then(
            function (ret) {
                $scope.recoverFormValues.loading = false;
                $scope.recoverFormValues.sent = true;
            }
        ).catch(function (ret) {
            $scope.recoverFormValues.loading = false;
            $scope.recoverFormValues.error = ret.data.message;
        });
    }

    $scope.register = function () {
        if (!$scope.registerForm.$valid) {
            alert("error!");
            return;
        }

        $scope.registerLoading = true;

        $http.post("/ajax/registerUser.rails", {
                email: $scope.registerFormValues.email,
                password: $scope.registerFormValues.password,
                fname: $scope.registerFormValues.fname,
                lname: $scope.registerFormValues.lname,
                receiveNewsletter: $scope.registerFormValues.receiveNewsletter,
            }
        ).then(function () {
            $scope.registerLoading = false;
            if ($scope.redirect != null && $scope.redirect?.length > 0) {
                window.location = $scope.redirect;
            } else {
                location.reload();
            }
        }).catch(function (t) {
            $scope.errorMessage = t.data.message ? t.data.message : "Error";
            $scope.registerLoading = false;
        });
    }

    $scope.isShowForgotPassword = false;
    $scope.showForgotPassword = function () {
        $scope.isShowForgotPassword = true;
    }

    $scope.login = function () {
        if (!$scope.loginForm.$valid) {
            alert("error!");
            return;
        }

        $scope.loginLoading = true;

        $http.post("/ajax/login.rails", {
                email: $scope.loginFormValues.email,
                password: $scope.loginFormValues.password,
                keepSession: true
            }
        ).then(function () {
            $scope.loginLoading = false;
            if ($scope.redirect != null && $scope.redirect?.length > 0) {
                window.location = $scope.redirect;
            } else {
                location.reload();
            }
        }).catch(function (t) {
            $scope.loginLoading = false;
            if (t.data.error) {
                $scope.errorMessage = t.data.error;
                $scope.loginLoading = false;
            }
        });

    }


});

angular.module("mm").controller("OrderDetailCtrl", function ($scope, $http, $timeout, $rootScope) {

    $scope.order = {
        id: 1234,
        date: '2024-01-01',
        subtotal: 100000,
        iva: 19000,
        shipping: 2000,
        total: 121000,
        status: "compeltado",
        expectedDeliveryDate: '2024-02-01',
        trackingId: '132421',
        trackingUrl: "#",
        paymentMethod: {
            id: 1,
            name: "Webpay"
        },
        shippingMethod: {
            id: 9,
            name: "Alas Xpress"
        },
        history: [
            {
                date: "29/4/2020",
                desription: "Pedido realizado",
                status: "REALIZADO"
            },
            {
                date: "29/4/2020",
                desription: "Pedido realizado",
                status: "REALIZADO"
            },
            {
                date: "29/4/2020",
                desription: "Pedido realizado",
                status: "REALIZADO"
            }
        ],
        receivedBy: {
            name: "Juan Carlos Fuentes",
            rut: "15.320.300-8",
            email: "jcfuentes@ailoo.cl",
            phone: "+569.7774.1034"
        },
        shippedTo: {
            name: "Valeria",
            address: "Las Tranqueras 160",
            comuna: {
                id: 1,
                name: "Las Condes"
            },
            region: {
                id: 1,
                name: "Región Metropolitana"
            }
        },
        destination: {
            name: "",
            gmap: "",
            postalAddress: {
                latitude: 0,
                longitude: 0,
                address: "",
                comuna: {
                    id: 1,
                    name: "Las Condes"
                },
                region: {
                    id: 1,
                    name: "Región Metropolitana"
                }
            }
        },
        items: [{
            type: "PRODUCT",
            brand: {id: 1, name: "AGV"},
            product: {id: 123, name: "AGV K1 SV"},
            features: "Talla unica",
            fullName: "K1 SV",
            quantity: 1,
            subtotal: 100000
        }]

    };

    $scope.getDescription = function (status) {
        if (status === "ingresada")
            return "Pedido realizado";
        if (status === "pagada")
            return "Pagado";
        if (status === "en ruta")
            return "Enviado";

        return status;
    }

    $scope.order = _order;

});

angular.module("mm").controller("ShoppingCartCtrl", function ($scope, $http, $timeout, $rootScope) {



    $scope.updateCartItemQuantity = function (item) {

        item.isLoading = true;
        $http.post("/Cart/UpdateQuantity.rails?id=" + item.id, {quantity: item.quantity}).then(
            function (ret) {
                item.isLoading = false;

                $scope.cart = ret.data.cart;
                const retCartItem = ret.data.cart.items.find(ci => ci.id == item.id);
                item.quantity = retCartItem.quantity;

                if(ret.data.errors != null && ret.data.errors.length > 0) {
                    item.quantityError = ret.data.errors[0].error;

                }
            }
        );
    }


    $scope.removeCartItem = function (item, cart) {
        item.isLoading = true;
        $http.get("/Cart/RemoveItemFromCart.rails?id=" + item.id).then(
            function (ret) {
                $scope.cart = ret.data.cart;
            }
        );
    }


    $scope.getCartTotal = function (cart) {
        if (cart == null)
            return 0;
        var total = 0;
        angular.forEach(cart.items, function (item) {
            total += item.quantity * item.itemPrice;
        });
        return total;
    }


    $scope.getTotalPoints = function (cart) {
        if (cart == null)
            return 0;

        return $scope.getCartTotal(cart) * 0.02;
    }
    $scope.checkout = function (cart) {
        window.location = "/checkout";
    }

    $scope.increment = function(cartItem) {
        console.log("increment", cartItem)
        cartItem.quantity = cartItem.quantity + 1
        $scope.updateCartItemQuantity(cartItem)
    }

    $scope.decrement = function (cartItem) {
        console.log("decrement", cartItem)
        cartItem.quantity = cartItem.quantity - 1;
        if(cartItem.quantity < 1){
            cartItem.quantity = 1;
            return;
        }
        $scope.updateCartItemQuantity(cartItem);
    }


});

angular.module("mm").directive("bikeSelector", ["$http", "$timeout", "$filter", function ($http, $timeout, $filter) {
    return {
        restrict: 'E',
        scope: {
            onBikeSelect: '&',
            filterBikeWithProducts: '=?',
        },
        templateUrl: 'bike-selector-template.html',  // Reference to the embedded template
        link: function (scope, element, attrs) {
            scope.brandSelector = {
                id: "brand",
                isShow: false,
                sword: "",
                next: 'model-selector',
                selected: null,
                index: 0,
                models: [],
                filtered: null
            };
            scope.modelSelector = {
                id: "model",
                isShow: false,
                sword: "",
                next: "year-selector",
                selected: null,
                index: 0,
                models: [],
                filtered: null
            };
            scope.yearSelector = {
                id: "year",
                isShow: false,
                sword: "",
                next: null,
                selected: null,
                index: 0,
                models: [],
                filtered: null
            };


            scope.manufacturers = [];
            scope.models = [];


            if (scope.filterBikeWithProducts == null)
                scope.filterBikeWithProducts = false;

            scope.updateFiltered = function (selector) {
                console.log("updateFiltered", selector)
                selector.filtered = $filter('filter')(selector.models, selector.sword);
            }

            scope.handleKeyDown = function (event, selector, nextElId) {
                switch (event.keyCode) {
                    case 9:
                        event.preventDefault();  // Prevent the default tab action
                        $timeout(function () {
                            var nextEl = document.getElementById(selector.next);
                            if (nextEl != null)
                                nextEl.focus();
                        }, 0);
                        break;
                    case 38: // Up arrow
                        scope.lastKey = 'Down Arrow';
                        selector.index--;
                        selector.isShow = true;
                        if (selector.index <= 0)
                            selector.index = 0;

                        break;
                    case 40: // Down arrow
                        selector.isShow = true;
                        scope.lastKey = 'Up Arrow';
                        selector.index++;
                        if (selector.index > selector.filtered.length - 1)
                            selector.index = selector.filtered.length - 1;

                        break;
                    case 13: // Enter
                        selector.isShow = false;
                        selector.selected = selector.filtered[selector.index];
                        selector.sword = selector.selected.name;

                        if (selector.id === "brand")
                            scope.listModels(selector.selected)
                        if (selector.id === "model")
                            scope.listYears(selector.selected)
                        if (selector.id === "year") {
                            scope.onSelectYear(selector.selected);
                        }

                        break;
                    default:
                        scope.lastKey = 'Other Key';
                        selector.isShow = true;
                        selector.index = 0;
                }
                // Apply the scope change

            };


            scope.listBrands = function () {
                $http.get("/Bike/ListManufacturers.rails?filterBikeWithProducts=" + scope.filterBikeWithProducts).then(function (ret) {
                    scope.brandSelector.models = ret.data;
                    scope.brandSelector.filtered = ret.data;
                });
            }

            scope.listModels = function (brand) {
                $http.get("/Bike/ListModels.rails?brandId=" + brand.id + "&filterBikeWithProducts=" + scope.filterBikeWithProducts).then(function (ret) {
                    for (var m of ret.data)
                        m.brand = brand;
                    scope.modelSelector.models = ret.data;

                    scope.modelSelector.filtered = ret.data;
                    $timeout(function () {
                        document.getElementById("model-selector").focus();
                    }, 10);

                });
            }

            scope.listYears = function (model) {
                $http.get("/Bike/ListYears.rails?brandId=" + model.brand.id + "&modelId=" + model.id + "&filterBikeWithProducts=" + scope.filterBikeWithProducts).then(function (ret) {
                    scope.yearSelector.models = ret.data;
                    scope.yearSelector.filtered = ret.data;

                    $timeout(function () {
                        document.getElementById("year-selector").focus();
                    }, 10);
                });

            }

            scope.onSelectBrand = function (brand) {
                console.log("onSelectedBrand", brand);
                scope.brandSelector.sword = brand.name;
                scope.brandSelector.selected = brand;
                scope.modelSelector.selected = null;
                scope.yearSelector.selected = null;

                scope.selectedBike = null;
                scope.onBikeSelect(null);

                scope.listModels(brand);

            }

            scope.onSelectModel = function (model) {
                scope.modelSelector.sword = model.name;
                scope.modelSelector.selected = model;

                scope.selectedBike = null;
                scope.onBikeSelect(null);

                scope.listYears(model);
            }

            scope.selectedBike = null;

            scope.onSelectYear = function (year) {
                scope.yearSelector.sword = year.name;
                scope.yearSelector.selected = year;

                scope.selectedBike = {
                    bike: {
                        manufacturer: {
                            id: scope.brandSelector.selected.id,
                            name: scope.brandSelector.selected.name
                        },
                        model: {
                            id: scope.modelSelector.selected.id,
                            name: scope.modelSelector.selected.name
                        },
                        year: {
                            id: scope.yearSelector.selected.id,
                            name: scope.yearSelector.selected.name
                        }
                    }
                };

                scope.onBikeSelect(scope.selectedBike);
            }

            scope.showSelector = function (selector) {
                selector.isShow = true;
            }

            scope.hideSelector = function (selector) {
                selector.isShow = false;
            }

            scope.listBrands();
        }
    };
}]);

angular.module("mm").controller("FilterBikeCtrl", function ($scope, $http, $timeout, $rootScope, Upload, $filter) {

    $scope.selectedBike = null;
    $scope.enableSearch = false;
    $scope.bikeSelected = function (bike) {
        if (bike == null) {
            $scope.selectedBike = null;
            $scope.enableSearch = false;

        } else {
            $scope.selectedBike = bike;
            $scope.enableSearch = true;
        }

    }

    $scope.filterMotorbikeProducts = function () {
        var brandId = $scope.selectedBike.manufacturer.id;
        var modelId = $scope.selectedBike.model.id;
        var yearId = $scope.selectedBike.year.id;
        context.addParam("bikeBrandId", brandId, brandId);
        context.addParam("bikeModelId", modelId, modelId);
        context.addParam("bikeYear", yearId, yearId);
        window.location.href = context.getUrl("/Product/ListProducts.rails?a=1");
    }
});

angular.module("mm").controller("GarageCtrl", function ($scope, $http, $timeout, $rootScope, Upload, $filter) {

    $scope.bike = null;
    $scope.userBikes = [];
    $scope.hideSelector = false;

    $scope.bikeSelected = function (bike) {

        $scope.bike = bike;
        if (bike != null)
            $scope.isShowAddButton = true;
        else
            $scope.isShowAddButton = false;
        document.getElementById("add-bike-button").focus();
    }

    $scope.loading = false;
    $scope.saveBike = function () {

        $scope.hideSelector = true;
        $timeout(function () {
            $scope.hideSelector = false;
        }, 10);
        $http.post("/Bike/AddUserBike.rails", $scope.bike)
            .then(function (ret) {
                $scope.userBikes.push($scope.bike);
                $scope.loading = true;
            }).catch(function (ret) {
            alert(JSON.stringify(ret.data));
            $scope.loading = false;
        });
    }

    $scope.listBikes = function () {
        $http.get("/Bike/ListUserBikes.rails").then(function (ret) {
            $scope.userBikes = ret.data;
        });
    }
    $scope.removeBike = function (bike) {
        $http.post("/Bike/RemoveUserBike.rails", bike).then(function (ret) {
            const index = $scope.userBikes.indexOf(bike);
            if (index !== -1) {
                $scope.userBikes.splice(index, 1);
            }
        });

    }

    $scope.listBikes();


});
angular.module("mm").controller("AtencionClienteCtrl", function ($scope, $http, $timeout, $rootScope, Upload) {
    $scope.form = {
        name: "",
        email: "",
        order: "",
        phone: "",
        message: "",
        reason: null
    };

    $scope.loading = false;
    $scope.resultMessage = null;


    $scope.submitForm = function () {

        $scope.loading = true;
        Upload.upload({
            url: '/Ajax/CustomerService.rails', // Your server-side upload URL
            data: {
                file: $scope.file,
                name: $scope.form.name,
                email: $scope.form.email,
                phone: $scope.form.phone,
                order: $scope.form.order,
                message: $scope.form.message,
                reason: $scope.form.reason
            }
        }).then(function (response) {
            $scope.loading = false;
            $scope.atencionForm.$setSubmitted();
            $scope.resultMessage = "ok";
        }, function (response) {
            $scope.loading = false;
            alert(response.status);
        }, function (evt) {
            if (!$scope.file)
                return;

            var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
            console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
        });
    };

});
angular.module("mm").controller("ProductListCtrl", function ($scope, $element) {

    var widgetId = $element.attr("data-widget-id");

    $scope.products = null;
    if (motocard.widgets["" + widgetId])
        $scope.products = motocard.widgets["" + widgetId];


    $scope.owlOptionsTestimonials = {
        autoPlay: false,
        responsive: {
            0: {
                items: 2 // 0px and up
            },
            600: {
                items: 3 // 768px and up
            },
            1200: {
                items: 5
            }
        },
        onTranslated: function (event) {
            // Check if on first item
            if (event.item.index === 0) {
                jQuery('.carousel-content--nav.prev').addClass('swiper-button-disabled');
            } else {
                jQuery('.carousel-content--nav.prev').removeClass('swiper-button-disabled');
            }


            if (event.item.index === event.item.count - event.page.size) {
                jQuery('.carousel-content--nav.next').addClass('swiper-button-disabled');
            } else {
                jQuery('.carousel-content--nav.next').removeClass('swiper-button-disabled');
            }
        }
    }

    jQuery('.carousel-content--nav.prev').click(function () {
        jQuery('.owl-prev').trigger('prev.owl.carousel');
    });

    jQuery('.carousel-content--nav.next').click(function () {
        jQuery('.owl-next').trigger('next.owl.carousel');
    });

    setTimeout(function () {
    }, 100);

});
angular.module("mm").controller("WorkWithUsCtrl", function ($scope, $http, $timeout, $rootScope, Upload, $location) {

    $scope.form = {
        name: "",
        email: "",
        phone: "",
        comuna: "",
        interestedIn: null,
        location: null
    };
    $scope.loading = false;
    $scope.resultMessage = null;


    $scope.submitForm = function () {


        $scope.loading = true;
        Upload.upload({
            url: '/Ajax/WorkWithUs.rails', // Your server-side upload URL
            data: {
                file: $scope.file,
                name: $scope.form.name,
                email: $scope.form.email,
                phone: $scope.form.phone,
                comuna: $scope.form.comuna,
                interestedIn: $scope.form.interestedIn,
                location: $scope.form.location,
            }
        }).then(function (response) {
            $scope.loading = false;
            $scope.workWithUsForm.$setSubmitted();
            $scope.resultMessage = "ok";
        }, function (response) {
            $scope.loading = false;
            alert(response.status);
        }, function (evt) {
            if (!$scope.file)
                return;
            var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
            console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
        });
    };
    $scope.uploadFile = function () {
        if ($scope.file) {
            Upload.upload({
                url: '/Ajax/WorkWithUs.rails', // Your server-side upload URL
                data: {file: $scope.file, form: $scope.form}
            }).then(function (response) {
                console.log('Success ' + response.config.data.file.name + ' uploaded. Response: ' + response.data);
            }, function (response) {
            }, function (response) {
                console.log('Error status: ' + response.status);
            }, function (evt) {
                var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
            });
        }
    };

});

angular.module('mm').filter('money', function () {
    return function (input, currency) {
        if (currency == null)
            currency = "CLP";
        if (input == null || input.toString().length == 0) {
            return CURRENCIES[currency].symbol + "0";
        }
        var amnt = Math.round(Number(input));
        if (amnt < 0) {
            return "(" + CURRENCIES[currency].symbol + Math.abs(amnt).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + ")";
        }

        return CURRENCIES[currency].symbol + amnt.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

    };
}).filter('dayOfWeek', function () {
    return function (input) {
        if (!input) return '';

        const daysOfWeek = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'];
        const date = new Date(input);
        const dayIndex = date.getDay();

        return daysOfWeek[dayIndex];
    };
}).filter('monthName', function () {
    return function (input) {
        if (!input) return '';

        const months = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
        const date = new Date(input);
        const monthIndex = date.getMonth();

        return months[monthIndex];
    };
}).directive('blogPagination', function () {
    return {
        restrict: 'E',
        scope: {
            totalItems: '=',
            itemsPerPage: '=',
            currentPage: '='
        },
        templateUrl: "blog-pagination-template.html",
        templateaa: `

        <ul class="pagination">
            <li>
                <a href="" ng-click="setPage(currentPage - 1)" ng-disabled="currentPage === 0">&laquo;</a>
            </li>
            <li ng-repeat="page in pageRange()">
                <a href="" ng-click="setPage(page)" ng-class="{ 'active': currentPage === page }">{{page + 1}}</a>
            </li>
            <li>
                <a href="" ng-click="setPage(currentPage + 1)" ng-disabled="currentPage >= numberOfPages() - 1">&raquo;</a>
            </li>
        </ul>
        `,
        link: function (scope) {
            scope.numberOfPages = function () {
                return Math.ceil(scope.totalItems / scope.itemsPerPage);
            };

            scope.pageRange = function () {
                var pages = [];
                var i = 0;
                var totalPages = scope.numberOfPages();
                for (; i < totalPages; i++) {
                    if (totalPages > 10 && i > 8) {
                        pages.push(-1);
                        break;
                    } else if (i < 10)
                        pages.push(i);
                }
                if (totalPages > 10)
                    pages.push(totalPages - 1);

                return pages;
            };

            scope.setPage = function (page) {
                if (page >= 0 && page < scope.numberOfPages()) {
                    scope.currentPage = page;
                }
            };


        }
    };
}).directive('commentTree', function () {
    return {
        restrict: 'E',
        scope: {
            comments: '=',
            depth: '='
        },
        templateUrl: "blog-comments.html",
        replace: true,
        link: function (scope) {

            scope.commentForm = {
                author: "",
                email: "",
                comment: "",
                commentId: 0
            };
            scope.showReponseForm = function (c) {
                c.showForm = true;
            }

            scope.saving = false;
            scope.notiftyComment = function (c) {
                scope.saving = true;

                scope.commentForm.commentId = c.id;
                scope.$emit("commentAComment", scope.commentForm, function () {
                    scope.saving = false;
                    c.showForm = false;
                });
            }

        }
    };
})
    .directive('phoneFormat', function () {
        return {
            require: 'ngModel',
            link: function (scope, element, attrs, ngModelCtrl) {
                function formatPhoneNumber(value) {
                    if (!value) {
                        return value;
                    }

                    // Remove non-numeric characters
                    value = value.replace(/[^0-9]/g, '');

                    if (value.length > 12) {
                        value = value.slice(0, 12);
                    }

                    let formattedValue = value;
                    if (value.length >= 2) {
                        formattedValue = '+' + value.slice(0, 2);
                    }
                    if (value.length > 2) {
                        formattedValue += ' ' + value.slice(2, 5);
                    }
                    if (value.length > 5) {
                        formattedValue += ' ' + value.slice(5, 8);
                    }
                    if (value.length > 8) {
                        formattedValue += ' ' + value.slice(8, 12);
                    }

                    return formattedValue;
                }

                function parsePhoneNumber(value) {
                    if (!value) {
                        return value;
                    }

                    // Remove spaces and return numeric value
                    return value.replace(/[^0-9]/g, '');
                }

                ngModelCtrl.$formatters.push(formatPhoneNumber);
                ngModelCtrl.$parsers.push(parsePhoneNumber);

                element.bind('blur', function () {
                    var formattedValue = formatPhoneNumber(ngModelCtrl.$modelValue);
                    ngModelCtrl.$setViewValue(formattedValue);
                    ngModelCtrl.$render();
                });

                element.bind('input', function () {
                    var formattedValue = formatPhoneNumber(ngModelCtrl.$viewValue);
                    ngModelCtrl.$setViewValue(formattedValue);
                    ngModelCtrl.$render();
                });
            }
        };
    }).filter('phoneFormat', function () {
    return function (input) {
        if (!input) {
            return '';
        }
        var value = input.toString().trim().replace(/^\+/, '');

        if (value.match(/[^0-9]/)) {
            return input;
        }

        var country, city, number;

        switch (value.length) {
            case 11: // +xx xxx xxx xxx
                country = value.slice(0, 2);
                city = value.slice(2, 5);
                number = value.slice(5, 12);
                break;


            default:
                return input;
        }

        return "+" + country + " " + city + " " + number.slice(0, 3) + " " + number.slice(3);
    };
});


function doNlPopup(popupClosed) {
    jQuery.getJSON("/Ajax/NewsletterModal.rails", {}, function (response) {
        if (popupClosed)
            popupClosed();
    });
    jQuery('#nlpopup').jqm({onShow: centerPopup});
    nlModal = jQuery('#nlpopup').jqmShow(200); //show previewLayer

}

function centerPopup(hash) {
    windowHeight = jQuery(window).height();
    linkOffset = jQuery("html").scrollTop();
    hash.w.css('top', linkOffset + 100 + (windowHeight * .1)).show();
};

function initCountdown() {
    jQuery('.countdown').each(function () {
        var countdownElement = jQuery(this);
        var endDate = countdownElement.data('end-date');
        var countDownDate = new Date(endDate).getTime();

        // Update the count down every 1 second
        var x = setInterval(function () {
            // Get today's date and time
            console.log(endDate);
            var now = new Date().getTime();

            // Find the distance between now and the count down date
            var distance = countDownDate - now;

            // Time calculations for days, hours, minutes and seconds
            var days = Math.floor(distance / (1000 * 60 * 60 * 24));
            var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            var seconds = Math.floor((distance % (1000 * 60)) / 1000);


            days = ("0" + days).slice(-2);
            hours = ("0" + hours).slice(-2);
            minutes = ("0" + minutes).slice(-2);
            seconds = ("0" + seconds).slice(-2);
            // Display the result in the element with id="countdown"
            //   $('.countdown').html(days + "d " + hours + "h " + minutes + "m " + seconds + "s ");
            // Display the result in the elements with respective classes
            countdownElement.find('.countdown-days').html(days + '<span class="countdown-text">días</span>');
            countdownElement.find('.countdown-hours').html(hours + '<span class="countdown-text">horas</span>');
            countdownElement.find('.countdown-minutes').html(minutes + '<span class="countdown-text">minutos</span>');
            countdownElement.find('.countdown-seconds').html(seconds + '<span class="countdown-text">segundos</span>');

            // If the count down is over, write some text
            if (distance < 0) {
                clearInterval(x);
                countdownElement.html("EXPIRED");
            }
        }, 1000);
    });
}

function validateEmail(email) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
}

function isNullOrEmpty(str) {
    return !str || str.trim().length === 0;
}


