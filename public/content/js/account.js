


// raty star ratings
(function (e) {
  var t = {
    init: function (n) {
      return this.each(function () {
        t.destroy.call(this), this.opt = e.extend(!0, {}, e.fn.raty.defaults, n)
        var r = e(this), i = ["number", "readOnly", "score", "scoreName"]
        t._callback.call(this, i), this.opt.precision && t._adjustPrecision.call(this), this.opt.number = t._between(this.opt.number, 0, this.opt.numberMax), this.stars = t._createStars.call(this), this.score = t._createScore.call(this), t._apply.call(this, this.opt.score), this.opt.cancel && (this.cancel = t._createCancel.call(this)), this.opt.width && r.css("width", this.opt.width), this.opt.readOnly ? t._lock.call(this) : (r.css("cursor", "pointer"), t._binds.call(this)), t._target.call(this, this.opt.score), r.data({
          settings: this.opt,
          raty: !0,
        })
      })
    }, _adjustPrecision: function () {
      this.opt.targetType = "score", this.opt.half = !0
    }, _apply: function (e) {
      "undefined" != typeof e && e >= 0 && (e = t._between(e, 0, this.opt.number), this.score.val(e)), t._fill.call(this, e), e && t._roundStars.call(this, e)
    }, _between: function (e, t, n) {
      return Math.min(Math.max(parseFloat(e), t), n)
    }, _binds: function () {
      this.cancel && t._bindCancel.call(this), t._bindClick.call(this), t._bindOut.call(this), t._bindOver.call(this)
    }, _bindCancel: function () {
      t._bindClickCancel.call(this), t._bindOutCancel.call(this), t._bindOverCancel.call(this)
    }, _bindClick: function () {
      var t = this, n = e(t)
      t.stars.on("click.raty", function (r) {
        t.score.val(t.opt.half || t.opt.precision ? n.data("score") : e(this).data("score")), t.opt.click && t.opt.click.call(t, parseFloat(t.score.val()), r)
      })
    }, _bindClickCancel: function () {
      var e = this
      e.cancel.on("click.raty", function (t) {
        e.score.removeAttr("value"), e.opt.click && e.opt.click.call(e, null, t)
      })
    }, _bindOut: function () {
      var n = this
      e(this).on("mouseleave.raty", function (e) {
        var r = parseFloat(n.score.val()) || void 0
        t._apply.call(n, r), t._target.call(n, r, e), n.opt.mouseout && n.opt.mouseout.call(n, r, e)
      })
    }, _bindOutCancel: function () {
      var t = this
      t.cancel.on("mouseleave.raty", function (n) {
        e(this).attr("class", t.opt.cancelOff), t.opt.mouseout && t.opt.mouseout.call(t, t.score.val() || null, n)
      })
    }, _bindOverCancel: function () {
      var n = this
      n.cancel.on("mouseover.raty", function (r) {
        e(this).attr("class", n.opt.cancelOn), n.stars.attr("class", n.opt.starOff), t._target.call(n, null, r), n.opt.mouseover && n.opt.mouseover.call(n, null)
      })
    }, _bindOver: function () {
      var n = this, r = e(n), i = n.opt.half ? "mousemove.raty" : "mouseover.raty"
      n.stars.on(i, function (i) {
        var a = parseInt(e(this).data("score"), 10)
        if (n.opt.half) {
          var o = parseFloat((i.pageX - e(this).offset().left) / (n.opt.size ? n.opt.size : parseInt(r.css("font-size")))),
            s = o > .5 ? 1 : .5
          a = a - 1 + s, t._fill.call(n, a), n.opt.precision && (a = a - s + o), t._roundStars.call(n, a), r.data("score", a)
        } else t._fill.call(n, a)
        t._target.call(n, a, i), n.opt.mouseover && n.opt.mouseover.call(n, a, i)
      })
    }, _callback: function (e) {
      for (var t in e) "function" == typeof this.opt[e[t]] && (this.opt[e[t]] = this.opt[e[t]].call(this))
    }, _createCancel: function () {
      var t = e(this), n = this.opt.cancelOff, r = e("<i />", { "class": n, title: this.opt.cancelHint })
      
      return "left" == this.opt.cancelPlace ? t.prepend("&#160;").prepend(r) : t.append("&#160;").append(r), r
    }, _createScore: function () {
      return e("<input />", { type: "hidden", name: this.opt.scoreName }).appendTo(this)
    }, _createStars: function () {
      for (var n = e(this), r = 1; r <= this.opt.number; r++) {
        var i = t._getHint.call(this, r), a = this.opt.score && this.opt.score >= r ? "starOn" : "starOff"
        a = this.opt[a], e("<i />", {
          "class": a,
          title: i,
          "data-score": r,
        }).appendTo(this), this.opt.space && n.append(r < this.opt.number ? "&#160;" : "")
      }
      
      return n.children("i")
    }, _error: function (t) {
      e(this).html(t), e.error(t)
    }, _fill: function (e) {
      for (var t = this, n = 0, r = 1; r <= t.stars.length; r++) {
        var i = t.stars.eq(r - 1), a = t.opt.single ? r == e : r <= e
        if (t.opt.iconRange && t.opt.iconRange.length > n) {
          var o = t.opt.iconRange[n], s = o.on || t.opt.starOn, l = o.off || t.opt.starOff, u = a ? s : l
          r <= o.range && i.attr("class", u), r == o.range && n++
        } else {
          var u = a ? "starOn" : "starOff"
          i.attr("class", this.opt[u])
        }
      }
    }, _getHint: function (e) {
      var t = this.opt.hints[e - 1]
      
      return "" === t ? "" : t || e
    }, _lock: function () {
      var n = parseInt(this.score.val(), 10), r = n ? t._getHint.call(this, n) : this.opt.noRatedMsg
      e(this).data("readonly", !0).css("cursor", "").attr("title", r), this.score.attr("readonly", "readonly"), this.stars.attr("title", r), this.cancel && this.cancel.hide()
    }, _roundStars: function (e) {
      var t = (e - Math.floor(e)).toFixed(2)
      if (t > this.opt.round.down) {
        var n = "starOn"
        this.opt.halfShow && t < this.opt.round.up ? n = "starHalf" : t < this.opt.round.full && (n = "starOff"), this.stars.eq(Math.ceil(e) - 1).attr("class", this.opt[n])
      }
    }, _target: function (n, r) {
      if (this.opt.target) {
        var i = e(this.opt.target)
        0 === i.length && t._error.call(this, "Target selector invalid or missing!"), this.opt.targetFormat.indexOf("{score}") < 0 && t._error.call(this, 'Template "{score}" missing!')
        var a = r && "mouseover" == r.type
        void 0 === n ? n = this.opt.targetText : null === n ? n = a ? this.opt.cancelHint : this.opt.targetText : ("hint" == this.opt.targetType ? n = t._getHint.call(this, Math.ceil(n)) : this.opt.precision && (n = parseFloat(n).toFixed(1)), a || this.opt.targetKeep || (n = this.opt.targetText)), n && (n = this.opt.targetFormat.toString().replace("{score}", n)), i.is(":input") ? i.val(n) : i.html(n)
      }
    }, _unlock: function () {
      e(this).data("readonly", !1).css("cursor", "pointer").removeAttr("title"), this.score.removeAttr("readonly", "readonly")
      for (var n = 0; n < this.opt.number; n++) this.stars.eq(n).attr("title", t._getHint.call(this, n + 1))
      this.cancel && this.cancel.css("display", "")
    }, cancel: function (n) {
      return this.each(function () {
        e(this).data("readonly") !== !0 && (t[n ? "click" : "score"].call(this, null), this.score.removeAttr("value"))
      })
    }, click: function (n) {
      return e(this).each(function () {
        e(this).data("readonly") !== !0 && (t._apply.call(this, n), this.opt.click || t._error.call(this, 'You must add the "click: function(score, evt) { }" callback.'), this.opt.click.call(this, n, e.Event("click")), t._target.call(this, n))
      })
    }, destroy: function () {
      return e(this).each(function () {
        var t = e(this), n = t.data("raw")
        n ? t.off(".raty").empty().css({
          cursor: n.style.cursor,
          width: n.style.width,
        }).removeData("readonly") : t.data("raw", t.clone()[0])
      })
    }, getScore: function () {
      var t, n = []
      
      return e(this).each(function () {
        t = this.score.val(), n.push(t ? parseFloat(t) : void 0)
      }), n.length > 1 ? n : n[0]
    }, readOnly: function (n) {
      return this.each(function () {
        var r = e(this)
        r.data("readonly") !== n && (n ? (r.off(".raty").children("i").off(".raty"), t._lock.call(this)) : (t._binds.call(this), t._unlock.call(this)), r.data("readonly", n))
      })
    }, reload: function () {
      return t.set.call(this, {})
    }, score: function () {
      return arguments.length ? t.setScore.apply(this, arguments) : t.getScore.call(this)
    }, set: function (t) {
      return this.each(function () {
        var n = e(this), r = n.data("settings"), i = e.extend({}, r, t)
        n.raty(i)
      })
    }, setScore: function (n) {
      return e(this).each(function () {
        e(this).data("readonly") !== !0 && (t._apply.call(this, n), t._target.call(this, n))
      })
    },
  }
  e.fn.raty = function (n) {
    return t[n] ? t[n].apply(this, Array.prototype.slice.call(arguments, 1)) : "object" != typeof n && n ? void e.error("Method " + n + " does not exist!") : t.init.apply(this, arguments)
  }, e.fn.raty.defaults = {
    cancel: !1,
    cancelHint: "Cancel this rating!",
    cancelOff: "fa fa-fw fa-minus-square",
    cancelOn: "fa fa-fw fa-check-square",
    cancelPlace: "left",
    click: void 0,
    half: !1,
    halfShow: !0,
    hints: ["bad", "poor", "regular", "good", "gorgeous"],
    iconRange: void 0,
    mouseout: void 0,
    mouseover: void 0,
    noRatedMsg: "Not rated yet!",
    number: 5,
    numberMax: 20,
    precision: !1,
    readOnly: !1,
    round: { down: .25, full: .6, up: .76 },
    score: void 0,
    scoreName: "score",
    single: !1,
    size: null,
    space: !0,
    starHalf: "fa fa-fw fa-star-half-o",
    starOff: "fa fa-fw fa-star-o",
    starOn: "fa fa-fw fa-star",
    target: void 0,
    targetFormat: "{score}",
    targetKeep: !1,
    targetText: "",
    targetType: "hint",
    width: !1,
  }
})(jQuery)

// end raty star rating



!function ($) {
  "use strict"

  function acctCtrl($scope, $http, $timeout) {
    $scope.comunas = motocard.viewData.comunas
    $scope.mode = "summary", $scope.defaultShippingAddress = !1, $scope.defaultBillingAddress = !1, $scope.formAddress = !1, $scope.currentLanguage = !1, $scope.savingAccount = !1, $scope.savingAddress = !1, $scope.countries = [], $scope.setupAddresses = function () {
      angular.forEach($scope.client.addresses, function (t) {
        "shipping" == t.type && ($scope.defaultShippingAddress = t), "billing" == t.type && ($scope.defaultBillingAddress = t)
      }), $scope.defaultShippingAddress && $scope.client.addresses.splice($scope.client.addresses.indexOf($scope.defaultShippingAddress), 1), $scope.defaultBillingAddress && $scope.client.addresses.splice($scope.client.addresses.indexOf($scope.defaultBillingAddress), 1)
    }, $scope.client = motocard.viewData.clientData, $scope.currentLanguage = motocard.viewData.language.code, $scope.setupAddresses(), $scope.editAccount = function () {
      $scope.clientDataForm.$setPristine(), $scope.setState({ name: "editAccount" })
    }, $scope.$watch("formClient.email", function () {
      $scope.clientDataForm.email.$setValidity("unique", !0)
    }), $scope.saveAccount = function () {
      $scope.clientDataForm.$setSubmitted(), $scope.clientDataForm.$valid && ($scope.savingAccount = !0, $http({
        url: "/ajax/account.rails",
        method: "PUT",
        data: $scope.formClient,
      }).success(function () {
        $scope.client = $scope.formClient, $scope.setState({ name: "summary" })
      }).error(function (t) {
        t.email && $scope.clientDataForm.email.$setValidity("unique", !1)
      })["finally"](function () {
        $scope.savingAccount = !1
      }))
    }, $scope.editAddress = function (t) {
      $scope.clientAddressForm.$setPristine(), $scope.setState({ name: "editAddress", data: t })
    }, $scope.createAddress = function () {
      $scope.clientAddressForm.$setPristine(), $scope.setState({ name: "createAddress" })
    }, $scope.saveFormAddress = function (t) {
      $scope.clientAddressForm.$setSubmitted(), $scope.clientAddressForm.$valid && ($scope.savingAddress = !0, $scope.saveAddress(t).then(function () {
        $scope.savingAddress = !1
      }))
    }, $scope.saveAddress = function (s) {
      var a = "POST"
      
      return s.id && (a = "PUT"), $http({ url: "/ajax/address.rails", method: a, data: s }).success(function (t) {
        $scope.client.addresses = t, $scope.setupAddresses(), $scope.setState({ name: "summary" })
      })
    }, $scope.deleteAddress = function (s) {
      s.deleting = !0, $http({
        url: "/ajax/address.rails?id=" + s.id,
        method: "DELETE",
        data: s,
      }).success(function (t) {
        jQuery("#client-address-" + s.id).fadeOut(400, function () {
          $scope.client.addresses = t, $scope.setupAddresses()
        })
      }).then(function () {
        s.deleting = !1
      })
    }, $scope.pinAddress = function (t, s) {
      t.type = s, $scope.saveAddress(t)
    }, $scope.setState = function (t) {
      history.pushState(t, ""), $scope.processState(t)
    }, $scope.processState = function (t) {
      "editAccount" == t.name && ($scope.formClient = angular.copy($scope.client), $scope.mode = "account-form", smoothScroll(jQuery("#account-data"))), "editAddress" == t.name && ($scope.loadCountriesIfNeeded(), $scope.formAddress = angular.copy(t.data), $timeout(function () {
        $scope.mode = "address-form"
      }, 50), smoothScroll(jQuery("#account-data"))), "createAddress" == t.name && ($scope.loadCountriesIfNeeded(), $scope.formAddress = {
        type: "none",
        address: { country_id: motocard.viewData.country.id },
      }, $scope.defaultBillingAddress || ($scope.formAddress.type = "billing"), $scope.defaultShippingAddress || ($scope.formAddress.type = "shipping"), $timeout(function () {
        $scope.mode = "address-form"
      }, 50), smoothScroll(jQuery("#account-data"))), "summary" == t.name && ($scope.formAddress = {}, $scope.mode = "summary")
    }, $scope.loadCountriesIfNeeded = function () {
      0 == $scope.countries.length && $http({
        url: "/ajax/getcountries.rails",
        method: "GET",
      }).success(function (t) {
        $scope.countries = t
      })
    }, window.onpopstate = function (t) {
      t.state ? $scope.processState(t.state) : $scope.mode = "summary", $scope.$digest()
    }, history.state && history.state.name && $scope.processState(history.state)
  }

  angular.module("account-data", []).controller("AccountDataCtrl", ["$scope", "$http", "$timeout", acctCtrl])


}()


// account orderlifecycle progress
jQuery(document).ready(function () {
  jQuery(".account-order-progress").each(function () {
    var stepsMap = {
      //  "Ingresado": {el: false, show: false, index: 0},
      //    "PendientePago": {el: false, show: false, index: 0},
      "Pagado": { el: false, show: true, index: 1 },
      "ListoParaEnviar": { el: false, show: true, index: 2 },
      "Enviado": { el: false, show: true, index: 3 },
      "Entregado": { el: false, show: true, index: 4 },

      /*
                        "payment-pending": {el: false, show: false, index: 0},
                        "paid": {el: false, show: true, index: 1},
                        "processing": {el: false, show: true, index: 2},
                        "ready-to-send": {el: false, show: true, index: 3},
                        "sent": {el: false, show: true, index: 4}
            */
    }
    var t = jQuery(this).find(".bar")
    var barStatuses = jQuery(this).find(".bar-status")
    var completed = false
    var canceled = false
    barStatuses.each(function (t, s) {
      var barStatus = jQuery(s)
      if (barStatus.data("step") in stepsMap && !stepsMap[barStatus.data("step")].el)
        stepsMap[barStatus.data("step")].el = barStatus
      else
        barStatus.remove()

      if ("Entregado" == barStatus.data("step"))
        completed = true
      if ("Anulado" == barStatus.data("step"))
        canceled = true
    })
    var d = 0, o = 0, r = 0
    for (var prop in stepsMap) {
      if (stepsMap.hasOwnProperty(prop)) {
        var propVal = stepsMap[prop]
        o++
        if (propVal.el) {
          if (propVal.show) {
            propVal.el.css("left", 0)
            propVal.el.fadeIn(100)
          }
          if (d < propVal.index)
            d = propVal.index

          //(propVal.show && (propVal.el.css("left", 0), propVal.el.fadeIn(100)), d < propVal.index && (d = propVal.index));
        }
      }
    }
    var c = 100 / o
    u = false
    for (var i in stepsMap) {
      if (stepsMap.hasOwnProperty(i)) {
        i = stepsMap[i]

        if (i.show && i.el) {
          if (!(i.index != d)) {
            completed ? i.el.find("span").remove() : (u = true, i.el.addClass("bar-status-current"))
          }
          i.el.css("left", c * i.index + "%")
          r = c * i.index
        }

        //(i = stepsMap[i], i.show && i.el && (i.index != d || isInProgress ? i.el.find("span").remove() : (u = !0, i.el.addClass("bar-status-current")), i.el.css("left", c * i.index + "%"), r = c * i.index));
      }

      //stepsMap.hasOwnProperty(i) && (i = stepsMap[i], i.show && i.el && (i.index != d || isInProgress ? i.el.find("span").remove() : (u = !0, i.el.addClass("bar-status-current")), i.el.css("left", c * i.index + "%"), r = c * i.index));
    }
    (completed || canceled) && (r = 100)
    t.animate({ width: r + "%" }, 100)
    if (u) {
      (completed || t.addClass("in-progress"), jQuery(this).addClass("has-current"))
    }
    if (canceled) {
      jQuery(this).addClass("account-order-canceled")
    }

    //         u && (completed || t.addClass("in-progress"), $(this).addClass("has-current")), canceled && $(this).addClass("account-order-canceled")
  })
});

(function ($) {
  "use strict"

  function e(e, t) {
    e.showPassword = !1, e.saving = !1, e.error = "", e.success = !1, e.data = {}, e.$watch("showPassword", function () {
      e.showPassword ? $("#new-password").attr("type", "text") : $("#new-password").attr("type", "password")
    }), e.$watch("data.old_password", function () {
      e.changePasswordForm.old_password.$setValidity("invalid", !0)
    }), e.updatePassword = function () {
      e.success = !1, e.changePasswordForm.$setSubmitted(), e.changePasswordForm.old_password.$setValidity("invalid", !0), e.changePasswordForm.$valid && (e.saving = !0, t({
        url: "/ajax/account/password",
        method: "PUT",
        data: e.data,
      }).success(function () {
        e.success = !0
      }).error(function (t, s) {
        401 == s && e.changePasswordForm.old_password.$setValidity("invalid", !1)
      })["finally"](function () {
        e.saving = !1
      }))
    }
  }

  angular.module("account-password", []).controller("ChangePasswordCtrl", ["$scope", "$http", e])
})(jQuery);


(function ($) {
  "use strict"

  function e(e, t) {
    e.showPassword = !1, e.saving = !1, e.error = !1, e.$watch("showPassword", function () {
      e.showPassword ? $("#newPassword").attr("type", "text") : $("#newPassword").attr("type", "password")
    }), e.changePassword = function () {
      e.success = !1, e.resetPasswordForm.$setSubmitted(), e.resetPasswordForm.$valid && (e.saving = !0, t({
        url: "/ajax/account/reset-password",
        method: "PUT",
        data: { token: e.token, password: e.newPassword },
      }).success(function (e) {
        location.href = e.redirect
      }).error(function () {
        e.error = !0
      })["finally"](function () {
        e.saving = !1
      }))
    }
  }

  angular.module("password-recovery", []).controller("PasswordRecoveryCtrl", ["$scope", "$http", e])
})(jQuery);


(function ($) {
  "use strict"

  function e(e, t) {
    e.cancelTryProduct = function (e) {
      swal({
        text: motocard.viewData.translations.CANCEL_CONFIRMATION,
        type: "warning",
        showCancelButton: !0,
        confirmButtonColor: "#C74044",
        confirmButtonText: motocard.viewData.translations.YES,
        cancelButtonText: motocard.viewData.translations.NO,
      }).then(function () {
        t({ data: { id: e }, url: "/ajax/account/cancel-try-product", method: "PUT" }).success(function (t) {
          var s = $(".products-to-try-out[try-product-id=" + e + "]")
          s.find(".store").remove(), s.find("button").remove(), s.find(".try-order-summary").addClass("tried"), s.appendTo(".canceled-reservations"), swal("", motocard.viewData.translations.FORM_SUCCESS, "success")
        }).error(function (e) {
          swal("", motocard.viewData.translations.FORM_ERROR, "error")
        })
      })
    }
  }

  // angular.module("tryProduct", []).controller("TryProductCtrl", ["$scope", "$http", e]);
  //       motocard.addAngularModule("tryProduct");
})(jQuery)

!function () {
  "use strict"

  function OrdersCtrl($scope, $http) {
    $scope.complete = function (t) {
      swal({
        title: motocard.viewData.translations.COMPLETE_ORDER_ALERT_TITLE,
        text: motocard.viewData.translations.COMPLETE_ORDER_ALERT_TEXT,
        type: "question",
        showCancelButton: !0,
        cancelButtonText: motocard.viewData.translations.COMPLETE_ORDER_ALERT_CANCEL,
        confirmButtonText: motocard.viewData.translations.COMPLETE_ORDER_ALERT_CONFIRM,
      }).then(function () {
        $http({ url: "/ajax/CompleteOrder.rails", method: "POST", data: { id: t } }).success(function () {
          document.location.reload()
        })
      })
    }
  }

  angular.module("mm").controller("OrderCtrl", ["$scope", "$http", OrdersCtrl])

//    motocard.addAngularModule("order")
}()


!function () {
  "use strict"

  function OrderReviewCtrl($scope, $http, $timeout, Upload) {
    function orderReviewError() {
      for (var t in $scope.service) if (0 === $scope.service[t]) return $scope.orderReviewError = !0, $timeout(function () {
        smoothScroll(jQuery("#order-review-error"))
      }, 200), !1
      
      return !0
    }

    function prodReviewError() {
      for (var t in $scope.products) if (0 !== $scope.products[t].rating) return $scope.productReviewError = !1, !0
      
      return $scope.productReviewError = !0, $timeout(function () {
        smoothScroll(jQuery("#product-review-error"))
      }, 200), !1
    }

    function prodFileError() {
      var t = 0
      for (var n in $scope.products) for (var r in $scope.products[n].images) if (t += $scope.products[n].images[r].size, t > 2e6) return $scope.productFileReviewError = !0, setTimeout(function () {
        smoothScroll(jQuery("#product-review-error"))
      }, 1e3), !1
      
      return $scope.productFileReviewError = !1, !0
    }

    function uploadOkPopup(t) {
      t || (t = "Datos enviados correctamente"), swal({
        text: t,
        type: "success",
        showCancelButton: !1,
        allowOutsideClick: !1,
        showLoaderOnConfirm: !0,
        preConfirm: function () {
          return new Promise(function (t) {
            angular.equals($scope.products, {}) && $scope.orderReviewSent ? ( window.location.href = "/Review/List.rails", t()) : t()
          })
        },
      })
    }

    function u() {
      $http({ url: "/ajax/get-motorbike-brands?disableFilter=true", method: "GET" }).success(function (t) {
        $scope.motorbike.brands = t
        $scope.selectedBrand = $scope.motorbike.brands[0]
      })
    }

    $scope.service = {
      search_rate: 0,
      size_info_rate: 0,
      cart_rate: 0,
      shipping_rate: 0,
      reception_rate: 0,
      web_info_rate: 0,
      recommendation: 0,
      review: "",
    }, $scope.products = {}, $scope.motorbike = { brands: [], models: [], years: [] }, $scope.termsAccepted = {
      orderReview: !1,
      productReview: !1,
    }, $scope.selectedBrand = !1, $scope.selectedModel = !1, $scope.selectedYear = !1, $scope.orderReviewError = !1, $scope.productReviewError = !1, $scope.productFileReviewError = !1, $scope.orderReviewSent = !0

    $scope.productReviewSent = false
    $scope.loading = false

    // r.delay = 0;


    var c = jQuery("#order-review .legal .mc-checkbox-label").webuiPopover({
      trigger: "manual",
      animation: "pop",
      multi: !0,
      width: 270,
    })


    var f = jQuery("#product-review .legal .mc-checkbox-label").webuiPopover({
      trigger: "manual",
      animation: "pop",
      multi: !0,
      width: 270,
    })



    $scope.sendOrderReviews = function () {
      return !!orderReviewError() && ($scope.termsAccepted.orderReview ? ($scope.loading = !0, void $http({
        url: "/ajax/order-review/" + motocard.viewData.order_id,
        method: "POST",
        data: $scope.service,
      })["finally"](function () {
        $scope.loading = !1, $scope.orderReviewSent = !0, angular.equals($scope.products, {}) ? uploadOkPopup() : ($("#order-review").slideUp(1e3), $timeout(function () {
          uploadOkPopup(), $scope.loading = !1
        }, 1000))
      })) : (c.webuiPopover("show"), !1))
    }


    $scope.sendProductReviews = function () {
      if (!prodReviewError()) return !1
      if (!prodFileError()) return !1
      if (!$scope.termsAccepted.productReview) return f.webuiPopover("show"), !1
      $scope.loading = !0
      var t = []
      for (var r in $scope.products) 0 !== $scope.products[r].rating && t.push($scope.products[r])
      Upload.upload({
        url: "/review/productreviews.rails",
        method: "POST",
        data: { productReviews: t, motorbike: $scope.selectedYear },
      }).then(function (r) {
        t.forEach(function (t) {
          for (var n in $scope.products) $scope.products[n].id == t.id && (jQuery("#product-review-" + $scope.products[n].id).slideUp(500), delete $scope.products[n])
        }), angular.equals($scope.products, {}) && ($scope.productReviewSent = !0), angular.equals($scope.products, {}) ? (jQuery("#product-review").slideUp(1e3), $timeout(function () {
          uploadOkPopup()
          $scope.loading = false
        }, 1e3)) : uploadOkPopup()
      }, function (t) {
        var r = t.statusText
        
        return 413 === t.status ? ($scope.productFileReviewError = !0, void $timeout(function () {
          smoothScroll($("#product-review-error-size"))
        }, 250)) : void swal({ text: r, type: "error", showCancelButton: !1, allowOutsideClick: !1 })
      })["finally"](function () {
        $scope.loading = !1, $scope.selectedYear && (jQuery("#motorbike-form").slideUp(500), $scope.selectedYear = !1), $scope.productReviewSent = !1
      })
    }


    $scope.remove = function (e, t) {
      e.splice(t, 1)
    }

    $scope.uploadFile = function (e) {
      jQuery("#image-upload-" + e).trigger("click")
    }
  }

  // angular.module("orderReview", ["ngFileUpload"])

  angular.module("mm").controller("OrderReviewCtrl", ["$scope", "$http", "$timeout", "Upload", OrderReviewCtrl]).directive("raty", function () {
    return {
      restrict: "AE", scope: { ngModel: "=" }, link: function (t, e, n) {
        var i = jQuery(e).raty({
          score: t.ngModel ? t.ngModel / 2 : 0,
          number: 5,
          half: !0,
          starHalf: "icon-star-half-alt",
          starOff: "icon-star-empty",
          starOn: "icon-star",
          click: function (e) {
            t.ngModel = 2 * e, t.$apply()
          },
        })
        t.$watch("ngModel", function (t) {
          i.raty("score", t / 2)
        })
      },
    }
  })

  //motocard.addAngularModule("orderReview");
}(), function () {
  function e(e, t) {
    window.XMLHttpRequest.prototype[e] = t(window.XMLHttpRequest.prototype[e])
  }

  function t(e, t, n) {
    try {
      Object.defineProperty(e, t, { get: n })
    } catch (r) {
    }
  }

  if (window.FileAPI || (window.FileAPI = {}), !window.XMLHttpRequest) throw"AJAX is not supported. XMLHttpRequest is not defined."
  if (FileAPI.shouldLoad = !window.FormData || FileAPI.forceLoad, FileAPI.shouldLoad) {
    var n = function (e) {
      if (!e.__listeners) {
        e.upload || (e.upload = {}), e.__listeners = []
        var t = e.upload.addEventListener
        e.upload.addEventListener = function (n, r) {
          e.__listeners[n] = r, t && t.apply(this, arguments)
        }
      }
    }
    e("open", function (e) {
      return function (t, r, i) {
        n(this), this.__url = r
        try {
          e.apply(this, [t, r, i])
        } catch (a) {
          a.message.indexOf("Access is denied") > -1 && (this.__origError = a, e.apply(this, [t, "_fix_for_ie_crossdomain__", i]))
        }
      }
    }), e("getResponseHeader", function (e) {
      return function (t) {
        return this.__fileApiXHR && this.__fileApiXHR.getResponseHeader ? this.__fileApiXHR.getResponseHeader(t) : null == e ? null : e.apply(this, [t])
      }
    }), e("getAllResponseHeaders", function (e) {
      return function () {
        return this.__fileApiXHR && this.__fileApiXHR.getAllResponseHeaders ? this.__fileApiXHR.getAllResponseHeaders() : null == e ? null : e.apply(this)
      }
    }), e("abort", function (e) {
      return function () {
        return this.__fileApiXHR && this.__fileApiXHR.abort ? this.__fileApiXHR.abort() : null == e ? null : e.apply(this)
      }
    }), e("setRequestHeader", function (e) {
      return function (t, r) {
        if ("__setXHR_" === t) {
          n(this)
          var i = r(this)
          i instanceof Function && i(this)
        } else this.__requestHeaders = this.__requestHeaders || {}, this.__requestHeaders[t] = r, e.apply(this, arguments)
      }
    }), e("send", function (e) {
      return function () {
        var n = this
        if (arguments[0] && arguments[0].__isFileAPIShim) {
          var r = arguments[0], i = {
            url: n.__url, jsonp: !1, cache: !0, complete: function (e, r) {
              e && angular.isString(e) && e.indexOf("#2174") !== -1 && (e = null), n.__completed = !0, !e && n.__listeners.load && n.__listeners.load({
                type: "load",
                loaded: n.__loaded,
                total: n.__total,
                target: n,
                lengthComputable: !0,
              }), !e && n.__listeners.loadend && n.__listeners.loadend({
                type: "loadend",
                loaded: n.__loaded,
                total: n.__total,
                target: n,
                lengthComputable: !0,
              }), "abort" === e && n.__listeners.abort && n.__listeners.abort({
                type: "abort",
                loaded: n.__loaded,
                total: n.__total,
                target: n,
                lengthComputable: !0,
              }), void 0 !== r.status && t(n, "status", function () {
                return 0 === r.status && e && "abort" !== e ? 500 : r.status
              }), void 0 !== r.statusText && t(n, "statusText", function () {
                return r.statusText
              }), t(n, "readyState", function () {
                return 4
              }), void 0 !== r.response && t(n, "response", function () {
                return r.response
              })
              var i = r.responseText || (e && 0 === r.status && "abort" !== e ? e : void 0)
              t(n, "responseText", function () {
                return i
              }), t(n, "response", function () {
                return i
              }), e && t(n, "err", function () {
                return e
              }), n.__fileApiXHR = r, n.onreadystatechange && n.onreadystatechange(), n.onload && n.onload()
            }, progress: function (e) {
              if (e.target = n, n.__listeners.progress && n.__listeners.progress(e), n.__total = e.total, n.__loaded = e.loaded, e.total === e.loaded) {
                var t = this
                setTimeout(function () {
                  n.__completed || (n.getAllResponseHeaders = function () {
                  }, t.complete(null, { status: 204, statusText: "No Content" }))
                }, FileAPI.noContentTimeout || 1e4)
              }
            }, headers: n.__requestHeaders,
          }
          i.data = {}, i.files = {}
          for (var a = 0; a < r.data.length; a++) {
            var o = r.data[a]
            null != o.val && null != o.val.name && null != o.val.size && null != o.val.type ? i.files[o.key] = o.val : i.data[o.key] = o.val
          }
          setTimeout(function () {
            if (!FileAPI.hasFlash) throw'Adode Flash Player need to be installed. To check ahead use "FileAPI.hasFlash"'
            n.__fileApiXHR = FileAPI.upload(i)
          }, 1)
        } else {
          if (this.__origError) throw this.__origError
          e.apply(n, arguments)
        }
      }
    }), window.XMLHttpRequest.__isFileAPIShim = !0, window.FormData = FormData = function () {
      return {
        append: function (e, t, n) {
          t.__isFileAPIBlobShim && (t = t.data[0]), this.data.push({ key: e, val: t, name: n })
        }, data: [], __isFileAPIShim: !0,
      }
    }, window.Blob = Blob = function (e) {
      return { data: e, __isFileAPIBlobShim: !0 }
    }
  }
}(), function () {
  function e(e) {
    return "input" === e[0].tagName.toLowerCase() && e.attr("type") && "file" === e.attr("type").toLowerCase()
  }
  function t() {
    try {
      var e = new ActiveXObject("ShockwaveFlash.ShockwaveFlash")
      if (e) return !0
    } catch (t) {
      if (void 0 !== navigator.mimeTypes["application/x-shockwave-flash"]) return !0
    }
    
    return !1
  }
  function n(e) {
    var t = 0, n = 0
    if (window.jQuery) return jQuery(e).offset()
    if (e.offsetParent) do t += e.offsetLeft - e.scrollLeft, n += e.offsetTop - e.scrollTop, e = e.offsetParent; while (e)
    
    return { left: t, top: n }
  }

  if (FileAPI.shouldLoad) {
    if (FileAPI.hasFlash = t(), FileAPI.forceLoad && (FileAPI.html5 = !1), !FileAPI.upload) {
      var r, i, a, o, s, l = document.createElement("script"), u = document.getElementsByTagName("script")
      if (window.FileAPI.jsUrl) r = window.FileAPI.jsUrl; else if (window.FileAPI.jsPath) i = window.FileAPI.jsPath; else for (a = 0; a < u.length; a++) if (s = u[a].src, o = s.search(/\/ng-file-upload[\-A-z0-9.]*\.js/), o > -1) {
        i = s.substring(0, o + 1)
        break
      }
      null == FileAPI.staticPath && (FileAPI.staticPath = i), l.setAttribute("src", r || i + "FileAPI.min.js"), document.getElementsByTagName("head")[0].appendChild(l)
    }
    FileAPI.ngfFixIE = function (r, i, a) {
      if (!t()) throw'Adode Flash Player need to be installed. To check ahead use "FileAPI.hasFlash"'
      var o = function () {
        var t = i.parent()
        r.attr("disabled") ? t && t.removeClass("js-fileapi-wrapper") : (i.attr("__ngf_flash_") || (i.unbind("change"), i.unbind("click"), i.bind("change", function (e) {
          s.apply(this, [e]), a.apply(this, [e])
        }), i.attr("__ngf_flash_", "true")), t.addClass("js-fileapi-wrapper"), e(r) || (t.css("position", "absolute").css("top", n(r[0]).top + "px").css("left", n(r[0]).left + "px").css("width", r[0].offsetWidth + "px").css("height", r[0].offsetHeight + "px").css("filter", "alpha(opacity=0)").css("display", r.css("display")).css("overflow", "hidden").css("z-index", "900000").css("visibility", "visible"), i.css("width", r[0].offsetWidth + "px").css("height", r[0].offsetHeight + "px").css("position", "absolute").css("top", "0px").css("left", "0px")))
      }
      r.bind("mouseenter", o)
      var s = function (e) {
        for (var t = FileAPI.getFiles(e), n = 0; n < t.length; n++) void 0 === t[n].size && (t[n].size = 0), void 0 === t[n].name && (t[n].name = "file"), void 0 === t[n].type && (t[n].type = "undefined")
        e.target || (e.target = {}), e.target.files = t, e.target.files !== t && (e.__files_ = t), (e.__files_ || e.target.files).item = function (t) {
          return (e.__files_ || e.target.files)[t] || null
        }
      }
    }, FileAPI.disableFileInput = function (e, t) {
      t ? e.removeClass("js-fileapi-wrapper") : e.addClass("js-fileapi-wrapper")
    }
  }
}(), window.FileReader || (window.FileReader = function () {
  var e = this, t = !1
  this.listeners = {}, this.addEventListener = function (t, n) {
    e.listeners[t] = e.listeners[t] || [], e.listeners[t].push(n)
  }, this.removeEventListener = function (t, n) {
    e.listeners[t] && e.listeners[t].splice(e.listeners[t].indexOf(n), 1)
  }, this.dispatchEvent = function (t) {
    var n = e.listeners[t.type]
    if (n) for (var r = 0; r < n.length; r++) n[r].call(e, t)
  }, this.onabort = this.onerror = this.onload = this.onloadstart = this.onloadend = this.onprogress = null
  var n = function (t, n) {
      var r = { type: t, target: e, loaded: n.loaded, total: n.total, error: n.error }
      
      return null != n.result && (r.target.result = n.result), r
    }, r = function (r) {
      t || (t = !0, e.onloadstart && e.onloadstart(n("loadstart", r)))
      var i
      "load" === r.type ? (e.onloadend && e.onloadend(n("loadend", r)), i = n("load", r), e.onload && e.onload(i), e.dispatchEvent(i)) : "progress" === r.type ? (i = n("progress", r), e.onprogress && e.onprogress(i), e.dispatchEvent(i)) : (i = n("error", r), e.onerror && e.onerror(i), e.dispatchEvent(i))
    }
  this.readAsDataURL = function (e) {
    FileAPI.readAsDataURL(e, r)
  }, this.readAsText = function (e) {
    FileAPI.readAsText(e, r)
  }
}), !window.XMLHttpRequest || window.FileAPI && FileAPI.shouldLoad || (window.XMLHttpRequest.prototype.setRequestHeader = function (e) {
  return function (t, n) {
    if ("__setXHR_" === t) {
      var r = n(this)
      r instanceof Function && r(this)
    } else e.apply(this, arguments)
  }
}(window.XMLHttpRequest.prototype.setRequestHeader))
var ngFileUpload = angular.module("ngFileUpload", [])
ngFileUpload.version = "12.2.13", ngFileUpload.service("UploadBase", ["$http", "$q", "$timeout", function (e, t, n) {
  function r(r) {
    function i(e) {
      u.notify && u.notify(e), c.progressFunc && n(function () {
        c.progressFunc(e)
      })
    }

    function s(e) {
      return null != r._start && o ? {
        loaded: e.loaded + r._start,
        total: r._file && r._file.size || e.total,
        type: e.type,
        config: r,
        lengthComputable: !0,
        target: e.target,
      } : e
    }

    function l() {
      e(r).then(function (e) {
        if (o && r._chunkSize && !r._finished && r._file) {
          var t = r._file && r._file.size || 0
          i({ loaded: Math.min(r._end, t), total: t, config: r, type: "progress" }), a.upload(r, !0)
        } else r._finished && delete r._finished, u.resolve(e)
      }, function (e) {
        u.reject(e)
      }, function (e) {
        u.notify(e)
      })
    }

    r.method = r.method || "POST", r.headers = r.headers || {}
    var u = r._deferred = r._deferred || t.defer(), c = u.promise
    
    return r.disableProgress || (r.headers.__setXHR_ = function () {
      return function (e) {
        e && e.upload && e.upload.addEventListener && (r.__XHR = e, r.xhrFn && r.xhrFn(e), e.upload.addEventListener("progress", function (e) {
          e.config = r, i(s(e))
        }, !1), e.upload.addEventListener("load", function (e) {
          e.lengthComputable && (e.config = r, i(s(e)))
        }, !1))
      }
    }), o ? r._chunkSize && r._end && !r._finished ? (r._start = r._end, r._end += r._chunkSize, l()) : r.resumeSizeUrl ? e.get(r.resumeSizeUrl).then(function (e) {
      r.resumeSizeResponseReader ? r._start = r.resumeSizeResponseReader(e.data) : r._start = parseInt((null == e.data.size ? e.data : e.data.size).toString()), r._chunkSize && (r._end = r._start + r._chunkSize), l()
    }, function (e) {
      throw e
    }) : r.resumeSize ? r.resumeSize().then(function (e) {
      r._start = e, r._chunkSize && (r._end = r._start + r._chunkSize), l()
    }, function (e) {
      throw e
    }) : (r._chunkSize && (r._start = 0, r._end = r._start + r._chunkSize), l()) : l(), c.success = function (e) {
      return c.then(function (t) {
        e(t.data, t.status, t.headers, r)
      }), c
    }, c.error = function (e) {
      return c.then(null, function (t) {
        e(t.data, t.status, t.headers, r)
      }), c
    }, c.progress = function (e) {
      return c.progressFunc = e, c.then(null, null, function (t) {
        e(t)
      }), c
    }, c.abort = c.pause = function () {
      return r.__XHR && n(function () {
        r.__XHR.abort()
      }), c
    }, c.xhr = function (e) {
      return r.xhrFn = function (t) {
        return function () {
          t && t.apply(c, arguments), e.apply(c, arguments)
        }
      }(r.xhrFn), c
    }, a.promisesCount++, c["finally"] && c["finally"] instanceof Function && c["finally"](function () {
      a.promisesCount--
    }), c
  }

  function i(e) {
    var t = {}
    for (var n in e) e.hasOwnProperty(n) && (t[n] = e[n])
    
    return t
  }

  var a = this
  a.promisesCount = 0, this.isResumeSupported = function () {
    return window.Blob && window.Blob.prototype.slice
  }
  var o = this.isResumeSupported()
  this.isUploadInProgress = function () {
    return a.promisesCount > 0
  }, this.rename = function (e, t) {
    return e.ngfName = t, e
  }, this.jsonBlob = function (e) {
    null == e || angular.isString(e) || (e = JSON.stringify(e))
    var t = new window.Blob([e], { type: "application/json" })
    
    return t._ngfBlob = !0, t
  }, this.json = function (e) {
    return angular.toJson(e)
  }, this.isFile = function (e) {
    return null != e && (e instanceof window.Blob || e.flashId && e.name && e.size)
  }, this.upload = function (e, t) {
    function n(t, n) {
      if (t._ngfBlob) return t
      if (e._file = e._file || t, null != e._start && o) {
        e._end && e._end >= t.size && (e._finished = !0, e._end = t.size)
        var r = t.slice(e._start, e._end || t.size)
        
        return r.name = t.name, r.ngfName = t.ngfName, e._chunkSize && (n.append("_chunkSize", e._chunkSize), n.append("_currentChunkSize", e._end - e._start), n.append("_chunkNumber", Math.floor(e._start / e._chunkSize)), n.append("_totalSize", e._file.size)), r
      }
      
      return t
    }

    function s(t, r, i) {
      if (void 0 !== r) if (angular.isDate(r) && (r = r.toISOString()), angular.isString(r)) t.append(i, r); else if (a.isFile(r)) {
        var o = n(r, t), l = i.split(",")
        l[1] && (o.ngfName = l[1].replace(/^\s+|\s+$/g, ""), i = l[0]), e._fileKey = e._fileKey || i, t.append(i, o, o.ngfName || o.name)
      } else if (angular.isObject(r)) {
        if (r.$$ngfCircularDetection) throw"ngFileUpload: Circular reference in config.data. Make sure specified data for Upload.upload() has no circular reference: " + i
        r.$$ngfCircularDetection = !0
        try {
          for (var u in r) if (r.hasOwnProperty(u) && "$$ngfCircularDetection" !== u) {
            var c = null == e.objectKey ? "[i]" : e.objectKey
            r.length && parseInt(u) > -1 && (c = null == e.arrayKey ? c : e.arrayKey), s(t, r[u], i + c.replace(/[ik]/g, u))
          }
        } finally {
          delete r.$$ngfCircularDetection
        }
      } else t.append(i, r)
    }

    function l() {
      e._chunkSize = a.translateScalars(e.resumeChunkSize), e._chunkSize = e._chunkSize ? parseInt(e._chunkSize.toString()) : null, e.headers = e.headers || {}, e.headers["Content-Type"] = void 0, e.transformRequest = e.transformRequest ? angular.isArray(e.transformRequest) ? e.transformRequest : [e.transformRequest] : [], e.transformRequest.push(function (t) {
        var n, r = new window.FormData
        t = t || e.fields || {}, e.file && (t.file = e.file)
        for (n in t) if (t.hasOwnProperty(n)) {
          var i = t[n]
          e.formDataAppender ? e.formDataAppender(r, n, i) : s(r, i, n)
        }
        
        return r
      })
    }

    return t || (e = i(e)), e._isDigested || (e._isDigested = !0, l()), r(e)
  }, this.http = function (t) {
    return t = i(t), t.transformRequest = t.transformRequest || function (t) {
      return window.ArrayBuffer && t instanceof window.ArrayBuffer || t instanceof window.Blob ? t : e.defaults.transformRequest[0].apply(this, arguments)
    }, t._chunkSize = a.translateScalars(t.resumeChunkSize), t._chunkSize = t._chunkSize ? parseInt(t._chunkSize.toString()) : null, r(t)
  }, this.translateScalars = function (e) {
    if (angular.isString(e)) {
      if (e.search(/kb/i) === e.length - 2) return parseFloat(1024 * e.substring(0, e.length - 2))
      if (e.search(/mb/i) === e.length - 2) return parseFloat(1048576 * e.substring(0, e.length - 2))
      if (e.search(/gb/i) === e.length - 2) return parseFloat(1073741824 * e.substring(0, e.length - 2))
      if (e.search(/b/i) === e.length - 1) return parseFloat(e.substring(0, e.length - 1))
      if (e.search(/s/i) === e.length - 1) return parseFloat(e.substring(0, e.length - 1))
      if (e.search(/m/i) === e.length - 1) return parseFloat(60 * e.substring(0, e.length - 1))
      if (e.search(/h/i) === e.length - 1) return parseFloat(3600 * e.substring(0, e.length - 1))
    }
    
    return e
  }, this.urlToBlob = function (n) {
    var r = t.defer()
    
    return e({ url: n, method: "get", responseType: "arraybuffer" }).then(function (e) {
      var t = new Uint8Array(e.data), i = e.headers("content-type") || "image/WebP",
        a = new window.Blob([t], { type: i }), o = n.match(/.*\/(.+?)(\?.*)?$/)
      o.length > 1 && (a.name = o[1]), r.resolve(a)
    }, function (e) {
      r.reject(e)
    }), r.promise
  }, this.setDefaults = function (e) {
    this.defaults = e || {}
  }, this.defaults = {}, this.version = ngFileUpload.version
}]), ngFileUpload.service("Upload", ["$parse", "$timeout", "$compile", "$q", "UploadExif", function (e, t, n, r, i) {
  function a(e, t, n) {
    var i = [l.emptyPromise()]
    
    return angular.forEach(e, function (r, a) {
      0 === r.type.indexOf("image/jpeg") && l.attrGetter("ngfFixOrientation", t, n, { $file: r }) && i.push(l.happyPromise(l.applyExifRotation(r), r).then(function (t) {
        e.splice(a, 1, t)
      }))
    }), r.all(i)
  }

  function o(e, t, n, i) {
    var a = l.attrGetter("ngfResize", t, n)
    if (!a || !l.isResizeSupported() || !e.length) return l.emptyPromise()
    if (a instanceof Function) {
      var o = r.defer()
      
      return a(e).then(function (r) {
        s(r, e, t, n, i).then(function (e) {
          o.resolve(e)
        }, function (e) {
          o.reject(e)
        })
      }, function (e) {
        o.reject(e)
      })
    }
    
    return s(a, e, t, n, i)
  }

  function s(e, t, n, i, a) {
    function o(r, o) {
      if (0 === r.type.indexOf("image")) {
        if (e.pattern && !l.validatePattern(r, e.pattern)) return
        e.resizeIf = function (e, t) {
          return l.attrGetter("ngfResizeIf", n, i, { $width: e, $height: t, $file: r })
        }
        var u = l.resize(r, e)
        s.push(u), u.then(function (e) {
          t.splice(o, 1, e)
        }, function (e) {
          r.$error = "resize", (r.$errorMessages = r.$errorMessages || {}).resize = !0, r.$errorParam = (e ? (e.message ? e.message : e) + ": " : "") + (r && r.name), a.$ngfValidations.push({
            name: "resize",
            valid: !1,
          }), l.applyModelValidation(a, t)
        })
      }
    }

    for (var s = [l.emptyPromise()], u = 0; u < t.length; u++) o(t[u], u)
    
    return r.all(s)
  }

  var l = i
  
  return l.getAttrWithDefaults = function (e, t) {
    if (null != e[t]) return e[t]
    var n = l.defaults[t]
    
    return null == n ? n : angular.isString(n) ? n : JSON.stringify(n)
  }, l.attrGetter = function (t, n, r, i) {
    var a = this.getAttrWithDefaults(n, t)
    if (!r) return a
    try {
      return i ? e(a)(r, i) : e(a)(r)
    } catch (o) {
      if (t.search(/min|max|pattern/i)) return a
      throw o
    }
  }, l.shouldUpdateOn = function (e, t, n) {
    var r = l.attrGetter("ngfModelOptions", t, n)
    
    return !r || !r.updateOn || r.updateOn.split(" ").indexOf(e) > -1
  }, l.emptyPromise = function () {
    var e = r.defer(), n = arguments
    
    return t(function () {
      e.resolve.apply(e, n)
    }), e.promise
  }, l.rejectPromise = function () {
    var e = r.defer(), n = arguments
    
    return t(function () {
      e.reject.apply(e, n)
    }), e.promise
  }, l.happyPromise = function (e, n) {
    var i = r.defer()
    
    return e.then(function (e) {
      i.resolve(e)
    }, function (e) {
      t(function () {
        throw e
      }), i.resolve(n)
    }), i.promise
  }, l.updateModel = function (n, r, i, s, u, c, f) {
    function d(a, o, u, f, d) {
      r.$$ngfPrevValidFiles = a, r.$$ngfPrevInvalidFiles = o
      var p = a && a.length ? a[0] : null, h = o && o.length ? o[0] : null
      n && (l.applyModelValidation(n, a), n.$setViewValue(d ? p : a)), s && e(s)(i, {
        $files: a,
        $file: p,
        $newFiles: u,
        $duplicateFiles: f,
        $invalidFiles: o,
        $invalidFile: h,
        $event: c,
      })
      var g = l.attrGetter("ngfModelInvalid", r)
      g && t(function () {
        e(g).assign(i, d ? h : o)
      }), t(function () {
      })
    }

    function p() {
      function e(e, t) {
        return e.name === t.name && (e.$ngfOrigSize || e.size) === (t.$ngfOrigSize || t.size) && e.type === t.type
      }

      function t(t) {
        var n
        for (n = 0; n < m.length; n++) if (e(t, m[n])) return !0
        for (n = 0; n < _.length; n++) if (e(t, _[n])) return !0
        
        return !1
      }

      if (u) {
        v = [], y = []
        for (var n = 0; n < u.length; n++) t(u[n]) ? y.push(u[n]) : v.push(u[n])
      }
    }

    function h(e) {
      return angular.isArray(e) ? e : [e]
    }

    function g() {
      function e() {
        t(function () {
          d($ ? m.concat(b) : b, $ ? _.concat(w) : w, u, y, F)
        }, A && A.debounce ? A.debounce.change || A.debounce : 0)
      }

      var a = x ? v : b
      o(a, r, i, n).then(function () {
        x ? l.validate(v, $ ? m.length : 0, n, r, i).then(function (t) {
          b = t.validsFiles, w = t.invalidsFiles, e()
        }) : e()
      }, function () {
        for (var t = 0; t < a.length; t++) {
          var n = a[t]
          if ("resize" === n.$error) {
            var r = b.indexOf(n)
            r > -1 && (b.splice(r, 1), w.push(n)), e()
          }
        }
      })
    }

    var v, m, _, y = [], w = [], b = []
    m = r.$$ngfPrevValidFiles || [], _ = r.$$ngfPrevInvalidFiles || [], n && n.$modelValue && (m = h(n.$modelValue))
    var $ = l.attrGetter("ngfKeep", r, i)
    v = (u || []).slice(0), "distinct" !== $ && l.attrGetter("ngfKeepDistinct", r, i) !== !0 || p(r, i)
    var F = !$ && !l.attrGetter("ngfMultiple", r, i) && !l.attrGetter("multiple", r)
    if (!$ || v.length) {
      l.attrGetter("ngfBeforeModelChange", r, i, {
        $files: u,
        $file: u && u.length ? u[0] : null,
        $newFiles: v,
        $duplicateFiles: y,
        $event: c,
      })
      var x = l.attrGetter("ngfValidateAfterResize", r, i), A = l.attrGetter("ngfModelOptions", r, i)
      l.validate(v, $ ? m.length : 0, n, r, i).then(function (e) {
        f ? d(v, [], u, y, F) : (A && A.allowInvalid || x ? b = v : (b = e.validFiles, w = e.invalidFiles), l.attrGetter("ngfFixOrientation", r, i) && l.isExifSupported() ? a(b, r, i).then(function () {
          g()
        }) : g())
      })
    }
  }, l
}]), ngFileUpload.directive("ngfSelect", ["$parse", "$timeout", "$compile", "Upload", function (e, t, n, r) {
  function i(e) {
    var t = e.match(/Android\D*(\d+)\.(\d+)/)
    if (t && t.length > 2) {
      var n = r.defaults.androidFixMinorVersion || 4
      
      return parseInt(t[1]) < 4 || parseInt(t[1]) === n && parseInt(t[2]) < n
    }
    
    return e.indexOf("Chrome") === -1 && /.*Windows.*Safari.*/.test(e)
  }

  function a(e, t, n, r, a, s, l, u) {
    function c() {
      return "input" === t[0].tagName.toLowerCase() && n.type && "file" === n.type.toLowerCase()
    }

    function f() {
      return y("ngfChange") || y("ngfSelect")
    }

    function d(t) {
      if (u.shouldUpdateOn("change", n, e)) {
        var i = t.__files_ || t.target && t.target.files, a = []
        if (!i) return
        for (var o = 0; o < i.length; o++) a.push(i[o])
        u.updateModel(r, n, e, f(), a.length ? a : null, t)
      }
    }

    function p(e, r) {
      function i(t) {
        e.attr("id", "ngf-" + t), r.attr("id", "ngf-label-" + t)
      }

      for (var a = 0; a < t[0].attributes.length; a++) {
        var o = t[0].attributes[a]
        "type" !== o.name && "class" !== o.name && "style" !== o.name && ("id" === o.name ? (i(o.value), w.push(n.$observe("id", i))) : e.attr(o.name, o.value || "required" !== o.name && "multiple" !== o.name ? o.value : o.name))
      }
    }

    function h() {
      if (c()) return t
      var e = angular.element('<input type="file">'), n = angular.element("<label>upload</label>")
      
      return n.css("visibility", "hidden").css("position", "absolute").css("overflow", "hidden").css("width", "0px").css("height", "0px").css("border", "none").css("margin", "0px").css("padding", "0px").attr("tabindex", "-1"), p(e, n), o.push({
        el: t,
        ref: n,
      }), document.body.appendChild(n.append(e)[0]), e
    }

    function g(n) {
      if (t.attr("disabled")) return !1
      if (!y("ngfSelectDisabled", e)) {
        var r = v(n)
        if (null != r) return r
        m(n)
        try {
          c() || document.body.contains(F[0]) || (o.push({
            el: t,
            ref: F.parent(),
          }), document.body.appendChild(F.parent()[0]), F.bind("change", d))
        } catch (a) {
        }
        
        return i(navigator.userAgent) ? setTimeout(function () {
          F[0].click()
        }, 0) : F[0].click(), !1
      }
    }

    function v(e) {
      var t = e.changedTouches || e.originalEvent && e.originalEvent.changedTouches
      if (t) {
        if ("touchstart" === e.type) return $ = t[0].clientX, b = t[0].clientY, !0
        if ("touchend" === e.type) {
          var n = t[0].clientX, r = t[0].clientY
          if (Math.abs(n - $) > 20 || Math.abs(r - b) > 20) return e.stopPropagation(), e.preventDefault(), !1
        }
        
        return !0
      }
    }

    function m(t) {
      u.shouldUpdateOn("click", n, e) && F.val() && (F.val(null), u.updateModel(r, n, e, f(), null, t, !0))
    }

    function _(e) {
      if (F && !F.attr("__ngf_ie10_Fix_")) {
        if (!F[0].parentNode) return void (F = null)
        e.preventDefault(), e.stopPropagation(), F.unbind("click")
        var t = F.clone()
        
        return F.replaceWith(t), F = t, F.attr("__ngf_ie10_Fix_", "true"), F.bind("change", d), F.bind("click", _), F[0].click(), !1
      }
      F.removeAttr("__ngf_ie10_Fix_")
    }

    var y = function (e, t) {
      return u.attrGetter(e, n, t)
    }
    u.registerModelChangeValidator(r, n, e)
    var w = []
    y("ngfMultiple") && w.push(e.$watch(y("ngfMultiple"), function () {
      F.attr("multiple", y("ngfMultiple", e))
    })), y("ngfCapture") && w.push(e.$watch(y("ngfCapture"), function () {
      F.attr("capture", y("ngfCapture", e))
    })), y("ngfAccept") && w.push(e.$watch(y("ngfAccept"), function () {
      F.attr("accept", y("ngfAccept", e))
    })), w.push(n.$observe("accept", function () {
      F.attr("accept", y("accept"))
    }))
    var b = 0, $ = 0, F = t
    c() || (F = h()), F.bind("change", d), c() ? t.bind("click", m) : t.bind("click touchstart touchend", g), navigator.appVersion.indexOf("MSIE 10") !== -1 && F.bind("click", _), r && r.$formatters.push(function (e) {
      return null != e && 0 !== e.length || F.val() && F.val(null), e
    }), e.$on("$destroy", function () {
      c() || F.parent().remove(), angular.forEach(w, function (e) {
        e()
      })
    }), s(function () {
      for (var e = 0; e < o.length; e++) {
        var t = o[e]
        document.body.contains(t.el[0]) || (o.splice(e, 1), t.ref.remove())
      }
    }), window.FileAPI && window.FileAPI.ngfFixIE && window.FileAPI.ngfFixIE(t, F, d)
  }

  var o = []
  
  return {
    restrict: "AEC", require: "?ngModel", link: function (i, o, s, l) {
      a(i, o, s, l, e, t, n, r)
    },
  }
}]), function () {
  function e(e) {
    return "img" === e.tagName.toLowerCase() ? "image" : "audio" === e.tagName.toLowerCase() ? "audio" : "video" === e.tagName.toLowerCase() ? "video" : /./
  }

  function t(t, n, r, i, a, o, s, l) {
    function u(e) {
      var o = t.attrGetter("ngfNoObjectUrl", a, r)
      t.dataUrl(e, o)["finally"](function () {
        n(function () {
          var t = (o ? e.$ngfDataUrl : e.$ngfBlobUrl) || e.$ngfDataUrl
          l ? i.css("background-image", "url('" + (t || "") + "')") : i.attr("src", t), t ? i.removeClass("ng-hide") : i.addClass("ng-hide")
        })
      })
    }

    n(function () {
      var n = r.$watch(a[o], function (n) {
        var c = s
        if ("ngfThumbnail" === o && (c || (c = {
          width: i[0].naturalWidth || i[0].clientWidth,
          height: i[0].naturalHeight || i[0].clientHeight,
        }), 0 === c.width && window.getComputedStyle)) {
          var f = getComputedStyle(i[0])
          f.width && f.width.indexOf("px") > -1 && f.height && f.height.indexOf("px") > -1 && (c = {
            width: parseInt(f.width.slice(0, -2)),
            height: parseInt(f.height.slice(0, -2)),
          })
        }
        
        return angular.isString(n) ? (i.removeClass("ng-hide"), l ? i.css("background-image", "url('" + n + "')") : i.attr("src", n)) : void (!n || !n.type || 0 !== n.type.search(e(i[0])) || l && 0 !== n.type.indexOf("image") ? i.addClass("ng-hide") : c && t.isResizeSupported() ? (c.resizeIf = function (e, i) {
          return t.attrGetter("ngfResizeIf", a, r, { $width: e, $height: i, $file: n })
        }, t.resize(n, c).then(function (e) {
          u(e)
        }, function (e) {
          throw e
        })) : u(n))
      })
      r.$on("$destroy", function () {
        n()
      })
    })
  }

  ngFileUpload.service("UploadDataUrl", ["UploadBase", "$timeout", "$q", function (e, t, n) {
    var r = e
    
    return r.base64DataUrl = function (e) {
      if (angular.isArray(e)) {
        var t = n.defer(), i = 0
        
        return angular.forEach(e, function (n) {
          r.dataUrl(n, !0)["finally"](function () {
            if (i++, i === e.length) {
              var n = []
              angular.forEach(e, function (e) {
                n.push(e.$ngfDataUrl)
              }), t.resolve(n, e)
            }
          })
        }), t.promise
      }
      
      return r.dataUrl(e, !0)
    }, r.dataUrl = function (e, i) {
      if (!e) return r.emptyPromise(e, e)
      if (i && null != e.$ngfDataUrl || !i && null != e.$ngfBlobUrl) return r.emptyPromise(i ? e.$ngfDataUrl : e.$ngfBlobUrl, e)
      var a = i ? e.$$ngfDataUrlPromise : e.$$ngfBlobUrlPromise
      if (a) return a
      var o = n.defer()
      
      return t(function () {
        if (window.FileReader && e && (!window.FileAPI || navigator.userAgent.indexOf("MSIE 8") === -1 || e.size < 2e4) && (!window.FileAPI || navigator.userAgent.indexOf("MSIE 9") === -1 || e.size < 4e6)) {
          var n = window.URL || window.webkitURL
          if (n && n.createObjectURL && !i) {
            var a
            try {
              a = n.createObjectURL(e)
            } catch (s) {
              return void t(function () {
                e.$ngfBlobUrl = "", o.reject()
              })
            }
            t(function () {
              if (e.$ngfBlobUrl = a, a) {
                o.resolve(a, e), r.blobUrls = r.blobUrls || [], r.blobUrlsTotalSize = r.blobUrlsTotalSize || 0, r.blobUrls.push({
                  url: a,
                  size: e.size,
                }), r.blobUrlsTotalSize += e.size || 0
                for (var t = r.defaults.blobUrlsMaxMemory || 268435456, i = r.defaults.blobUrlsMaxQueueSize || 200; (r.blobUrlsTotalSize > t || r.blobUrls.length > i) && r.blobUrls.length > 1;) {
                  var s = r.blobUrls.splice(0, 1)[0]
                  n.revokeObjectURL(s.url), r.blobUrlsTotalSize -= s.size
                }
              }
            })
          } else {
            var l = new FileReader
            l.onload = function (n) {
              t(function () {
                e.$ngfDataUrl = n.target.result, o.resolve(n.target.result, e), t(function () {
                  delete e.$ngfDataUrl
                }, 1e3)
              })
            }, l.onerror = function () {
              t(function () {
                e.$ngfDataUrl = "", o.reject()
              })
            }, l.readAsDataURL(e)
          }
        } else t(function () {
          e[i ? "$ngfDataUrl" : "$ngfBlobUrl"] = "", o.reject()
        })
      }), a = i ? e.$$ngfDataUrlPromise = o.promise : e.$$ngfBlobUrlPromise = o.promise, a["finally"](function () {
        delete e[i ? "$$ngfDataUrlPromise" : "$$ngfBlobUrlPromise"]
      }), a
    }, r
  }]), ngFileUpload.directive("ngfSrc", ["Upload", "$timeout", function (e, n) {
    return {
      restrict: "AE", link: function (r, i, a) {
        t(e, n, r, i, a, "ngfSrc", e.attrGetter("ngfResize", a, r), !1)
      },
    }
  }]), ngFileUpload.directive("ngfBackground", ["Upload", "$timeout", function (e, n) {
    return {
      restrict: "AE", link: function (r, i, a) {
        t(e, n, r, i, a, "ngfBackground", e.attrGetter("ngfResize", a, r), !0)
      },
    }
  }]), ngFileUpload.directive("ngfThumbnail", ["Upload", "$timeout", function (e, n) {
    return {
      restrict: "AE", link: function (r, i, a) {
        var o = e.attrGetter("ngfSize", a, r)
        t(e, n, r, i, a, "ngfThumbnail", o, e.attrGetter("ngfAsBackground", a, r))
      },
    }
  }]), ngFileUpload.config(["$compileProvider", function (e) {
    e.imgSrcSanitizationWhitelist && e.imgSrcSanitizationWhitelist(/^\s*(https?|ftp|mailto|tel|webcal|local|file|data|blob):/), e.aHrefSanitizationWhitelist && e.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|tel|webcal|local|file|data|blob):/)
  }]), ngFileUpload.filter("ngfDataUrl", ["UploadDataUrl", "$sce", function (e, t) {
    return function (n, r, i) {
      if (angular.isString(n)) return t.trustAsResourceUrl(n)
      var a = n && ((r ? n.$ngfDataUrl : n.$ngfBlobUrl) || n.$ngfDataUrl)
      
      return n && !a ? (!n.$ngfDataUrlFilterInProgress && angular.isObject(n) && (n.$ngfDataUrlFilterInProgress = !0, e.dataUrl(n, r)), "") : (n && delete n.$ngfDataUrlFilterInProgress, (n && a ? i ? t.trustAsResourceUrl(a) : a : n) || "")
    }
  }])
}(), ngFileUpload.service("UploadValidate", ["UploadDataUrl", "$q", "$timeout", function (e, t, n) {
  function r(e) {
    var t = "", n = []
    if (e.length > 2 && "/" === e[0] && "/" === e[e.length - 1]) t = e.substring(1, e.length - 1); else {
      var i = e.split(",")
      if (i.length > 1) for (var a = 0; a < i.length; a++) {
        var o = r(i[a])
        o.regexp ? (t += "(" + o.regexp + ")", a < i.length - 1 && (t += "|")) : n = n.concat(o.excludes)
      } else 0 === e.indexOf("!") ? n.push("^((?!" + r(e.substring(1)).regexp + ").)*$") : (0 === e.indexOf(".") && (e = "*" + e), t = "^" + e.replace(new RegExp("[.\\\\+*?[^\\]$(){}=!<>|:\\-]", "g"), "\\$&") + "$", t = t.replace(/\\\*/g, ".*").replace(/\\\?/g, "."))
    }
    
    return { regexp: t, excludes: n }
  }

  function i(e, t) {
    null == t || e.$dirty || (e.$setDirty ? e.$setDirty() : e.$dirty = !0)
  }

  var a = e
  
  return a.validatePattern = function (e, t) {
    if (!t) return !0
    var n = r(t), i = !0
    if (n.regexp && n.regexp.length) {
      var a = new RegExp(n.regexp, "i")
      i = null != e.type && a.test(e.type) || null != e.name && a.test(e.name)
    }
    for (var o = n.excludes.length; o--;) {
      var s = new RegExp(n.excludes[o], "i")
      i = i && (null == e.type || s.test(e.type)) && (null == e.name || s.test(e.name))
    }
    
    return i
  }, a.ratioToFloat = function (e) {
    var t = e.toString(), n = t.search(/[x:]/i)
    
    return t = n > -1 ? parseFloat(t.substring(0, n)) / parseFloat(t.substring(n + 1)) : parseFloat(t)
  }, a.registerModelChangeValidator = function (e, t, n) {
    e && e.$formatters.push(function (r) {
      if (e.$dirty) {
        var i = r
        r && !angular.isArray(r) && (i = [r]), a.validate(i, 0, e, t, n).then(function () {
          a.applyModelValidation(e, i)
        })
      }
      
      return r
    })
  }, a.applyModelValidation = function (e, t) {
    i(e, t), angular.forEach(e.$ngfValidations, function (t) {
      e.$setValidity(t.name, t.valid)
    })
  }, a.getValidationAttr = function (e, t, n, r, i) {
    var o = "ngf" + n[0].toUpperCase() + n.substr(1), s = a.attrGetter(o, e, t, { $file: i })
    if (null == s && (s = a.attrGetter("ngfValidate", e, t, { $file: i }))) {
      var l = (r || n).split(".")
      s = s[l[0]], l.length > 1 && (s = s && s[l[1]])
    }
    
    return s
  }, a.validate = function (e, n, r, i, o) {
    function s(t, n, s) {
      if (e) {
        for (var l = e.length, u = null; l--;) {
          var p = e[l]
          if (p) {
            var h = a.getValidationAttr(i, o, t, n, p)
            null != h && (s(p, h, l) || (c.indexOf(t) === -1 ? (p.$error = t,
            (p.$errorMessages = p.$errorMessages || {})[t] = !0, p.$errorParam = h, d.indexOf(p) === -1 && d.push(p), f || e.splice(l, 1), u = !1) : e.splice(l, 1)))
          }
        }
        null !== u && r.$ngfValidations.push({ name: t, valid: u })
      }
    }

    function l(n, s, l, p, h) {
      function g(t, r, i) {
        function a(a) {
          if (a()) if (c.indexOf(n) === -1) {
            if (r.$error = n, (r.$errorMessages = r.$errorMessages || {})[n] = !0, r.$errorParam = i, d.indexOf(r) === -1 && d.push(r), !f) {
              var o = e.indexOf(r)
              o > -1 && e.splice(o, 1)
            }
            t.resolve(!1)
          } else {
            var s = e.indexOf(r)
            s > -1 && e.splice(s, 1), t.resolve(!0)
          } else t.resolve(!0)
        }

        null != i ? p(r, i).then(function (e) {
          a(function () {
            return !h(e, i)
          })
        }, function () {
          a(function () {
            return u("ngfValidateForce", { $file: r })
          })
        }) : t.resolve(!0)
      }

      var v = [a.emptyPromise(!0)]
      e && (e = void 0 === e.length ? [e] : e, angular.forEach(e, function (e) {
        var r = t.defer()
        
        return v.push(r.promise), !l || null != e.type && 0 === e.type.search(l) ? void ("dimensions" === n && null != a.attrGetter("ngfDimensions", i) ? a.imageDimensions(e).then(function (t) {
          g(r, e, u("ngfDimensions", { $file: e, $width: t.width, $height: t.height }))
        }, function () {
          r.resolve(!1)
        }) : "duration" === n && null != a.attrGetter("ngfDuration", i) ? a.mediaDuration(e).then(function (t) {
          g(r, e, u("ngfDuration", { $file: e, $duration: t }))
        }, function () {
          r.resolve(!1)
        }) : g(r, e, a.getValidationAttr(i, o, n, s, e))) : void r.resolve(!0)
      }))
      var m = t.defer()
      
      return t.all(v).then(function (e) {
        for (var t = !0, i = 0; i < e.length; i++) if (!e[i]) {
          t = !1
          break
        }
        r.$ngfValidations.push({ name: n, valid: t }), m.resolve(t)
      }), m.promise
    }

    r = r || {}, r.$ngfValidations = r.$ngfValidations || [], angular.forEach(r.$ngfValidations, function (e) {
      e.valid = !0
    })
    var u = function (e, t) {
        return a.attrGetter(e, i, o, t)
      }, c = (a.attrGetter("ngfIgnoreInvalid", i, o) || "").split(" "),
      f = a.attrGetter("ngfRunAllValidations", i, o)
    if (null == e || 0 === e.length) return a.emptyPromise({ validFiles: e, invalidFiles: [] })
    e = void 0 === e.length ? [e] : e.slice(0)
    var d = []
    s("pattern", null, a.validatePattern), s("minSize", "size.min", function (e, t) {
      return e.size + .1 >= a.translateScalars(t)
    }), s("maxSize", "size.max", function (e, t) {
      return e.size - .1 <= a.translateScalars(t)
    })
    var p = 0
    if (s("maxTotalSize", null, function (t, n) {
      return p += t.size, !(p > a.translateScalars(n)) || (e.splice(0, e.length), !1)
    }), s("validateFn", null, function (e, t) {
      return t === !0 || null === t || "" === t
    }), !e.length) return a.emptyPromise({ validFiles: [], invalidFiles: d })
    var h = t.defer(), g = []
    
    return g.push(l("maxHeight", "height.max", /image/, this.imageDimensions, function (e, t) {
      return e.height <= t
    })), g.push(l("minHeight", "height.min", /image/, this.imageDimensions, function (e, t) {
      return e.height >= t
    })), g.push(l("maxWidth", "width.max", /image/, this.imageDimensions, function (e, t) {
      return e.width <= t
    })), g.push(l("minWidth", "width.min", /image/, this.imageDimensions, function (e, t) {
      return e.width >= t
    })), g.push(l("dimensions", null, /image/, function (e, t) {
      return a.emptyPromise(t)
    }, function (e) {
      return e
    })), g.push(l("ratio", null, /image/, this.imageDimensions, function (e, t) {
      for (var n = t.toString().split(","), r = !1, i = 0; i < n.length; i++) Math.abs(e.width / e.height - a.ratioToFloat(n[i])) < .01 && (r = !0)
      
      return r
    })), g.push(l("maxRatio", "ratio.max", /image/, this.imageDimensions, function (e, t) {
      return e.width / e.height - a.ratioToFloat(t) < 1e-4
    })), g.push(l("minRatio", "ratio.min", /image/, this.imageDimensions, function (e, t) {
      return e.width / e.height - a.ratioToFloat(t) > -1e-4
    })), g.push(l("maxDuration", "duration.max", /audio|video/, this.mediaDuration, function (e, t) {
      return e <= a.translateScalars(t)
    })), g.push(l("minDuration", "duration.min", /audio|video/, this.mediaDuration, function (e, t) {
      return e >= a.translateScalars(t)
    })), g.push(l("duration", null, /audio|video/, function (e, t) {
      return a.emptyPromise(t)
    }, function (e) {
      return e
    })), g.push(l("validateAsyncFn", null, null, function (e, t) {
      return t
    }, function (e) {
      return e === !0 || null === e || "" === e
    })), t.all(g).then(function () {
      if (f) for (var t = 0; t < e.length; t++) {
        var r = e[t]
        r.$error && e.splice(t--, 1)
      }
      f = !1, s("maxFiles", null, function (e, t, r) {
        return n + r < t
      }), h.resolve({ validFiles: e, invalidFiles: d })
    }), h.promise
  }, a.imageDimensions = function (e) {
    if (e.$ngfWidth && e.$ngfHeight) {
      var r = t.defer()
      
      return n(function () {
        r.resolve({ width: e.$ngfWidth, height: e.$ngfHeight })
      }), r.promise
    }
    if (e.$ngfDimensionPromise) return e.$ngfDimensionPromise
    var i = t.defer()
    
    return n(function () {
      return 0 !== e.type.indexOf("image") ? void i.reject("not image") : void a.dataUrl(e).then(function (t) {
        function r() {
          var t = s[0].naturalWidth || s[0].clientWidth, n = s[0].naturalHeight || s[0].clientHeight
          s.remove(), e.$ngfWidth = t, e.$ngfHeight = n, i.resolve({ width: t, height: n })
        }

        function a() {
          s.remove(), i.reject("load error")
        }

        function o() {
          n(function () {
            s[0].parentNode && (s[0].clientWidth ? r() : l++ > 10 ? a() : o())
          }, 1e3)
        }

        var s = angular.element("<img>").attr("src", t).css("visibility", "hidden").css("position", "fixed").css("max-width", "none !important").css("max-height", "none !important")
        s.on("load", r), s.on("error", a)
        var l = 0
        o(), angular.element(document.getElementsByTagName("body")[0]).append(s)
      }, function () {
        i.reject("load error")
      })
    }), e.$ngfDimensionPromise = i.promise, e.$ngfDimensionPromise["finally"](function () {
      delete e.$ngfDimensionPromise
    }), e.$ngfDimensionPromise
  }, a.mediaDuration = function (e) {
    if (e.$ngfDuration) {
      var r = t.defer()
      
      return n(function () {
        r.resolve(e.$ngfDuration)
      }), r.promise
    }
    if (e.$ngfDurationPromise) return e.$ngfDurationPromise
    var i = t.defer()
    
    return n(function () {
      return 0 !== e.type.indexOf("audio") && 0 !== e.type.indexOf("video") ? void i.reject("not media") : void a.dataUrl(e).then(function (t) {
        function r() {
          var t = s[0].duration
          e.$ngfDuration = t, s.remove(), i.resolve(t)
        }

        function a() {
          s.remove(), i.reject("load error")
        }

        function o() {
          n(function () {
            s[0].parentNode && (s[0].duration ? r() : l > 10 ? a() : o())
          }, 1e3)
        }

        var s = angular.element(0 === e.type.indexOf("audio") ? "<audio>" : "<video>").attr("src", t).css("visibility", "none").css("position", "fixed")
        s.on("loadedmetadata", r), s.on("error", a)
        var l = 0
        o(), angular.element(document.body).append(s)
      }, function () {
        i.reject("load error")
      })
    }), e.$ngfDurationPromise = i.promise, e.$ngfDurationPromise["finally"](function () {
      delete e.$ngfDurationPromise
    }), e.$ngfDurationPromise
  }, a
}]), ngFileUpload.service("UploadResize", ["UploadValidate", "$q", function (e, t) {
  var n = e, r = function (e, t, n, r, i) {
      var a = i ? Math.max(n / e, r / t) : Math.min(n / e, r / t)
      
      return { width: e * a, height: t * a, marginX: e * a - n, marginY: t * a - r }
    }, i = function (e, i, a, o, s, l, u, c) {
      var f = t.defer(), d = document.createElement("canvas"), p = document.createElement("img")
      
      return p.setAttribute("style", "visibility:hidden;position:fixed;z-index:-100000"), document.body.appendChild(p), p.onload = function () {
        var e = p.width, t = p.height
        if (p.parentNode.removeChild(p), null != c && c(e, t) === !1) return void f.reject("resizeIf")
        try {
          if (l) {
            var h = n.ratioToFloat(l), g = e / t
            g < h ? (i = e, a = i / h) : (a = t, i = a * h)
          }
          i || (i = e), a || (a = t)
          var v = r(e, t, i, a, u)
          d.width = Math.min(v.width, i), d.height = Math.min(v.height, a)
          var m = d.getContext("2d")
          m.drawImage(p, Math.min(0, -v.marginX / 2), Math.min(0, -v.marginY / 2), v.width, v.height), f.resolve(d.toDataURL(s || "image/WebP", o || .934))
        } catch (_) {
          f.reject(_)
        }
      }, p.onerror = function () {
        p.parentNode.removeChild(p), f.reject()
      }, p.src = e, f.promise
    }
  
  return n.dataUrltoBlob = function (e, t, n) {
    for (var r = e.split(","), i = r[0].match(/:(.*?);/)[1], a = atob(r[1]), o = a.length, s = new Uint8Array(o); o--;) s[o] = a.charCodeAt(o)
    var l = new window.Blob([s], { type: i })
    
    return l.name = t, l.$ngfOrigSize = n, l
  }, n.isResizeSupported = function () {
    var e = document.createElement("canvas")
    
    return window.atob && e.getContext && e.getContext("2d") && window.Blob
  }, n.isResizeSupported() && Object.defineProperty(window.Blob.prototype, "name", {
    get: function () {
      return this.$ngfName
    }, set: function (e) {
      this.$ngfName = e
    }, configurable: !0,
  }), n.resize = function (e, r) {
    if (0 !== e.type.indexOf("image")) return n.emptyPromise(e)
    var a = t.defer()
    
    return n.dataUrl(e, !0).then(function (t) {
      i(t, r.width, r.height, r.quality, r.type || e.type, r.ratio, r.centerCrop, r.resizeIf).then(function (i) {
        if ("image/jpeg" === e.type && r.restoreExif !== !1) try {
          i = n.restoreExif(t, i)
        } catch (o) {
          setTimeout(function () {
            throw o
          }, 1)
        }
        try {
          var s = n.dataUrltoBlob(i, e.name, e.size)
          a.resolve(s)
        } catch (o) {
          a.reject(o)
        }
      }, function (t) {
        "resizeIf" === t && a.resolve(e), a.reject(t)
      })
    }, function (e) {
      a.reject(e)
    }), a.promise
  }, n
}]), function () {
  function e(e, n, r, i, a, o, s, l, u, c) {
    function f() {
      return n.attr("disabled") || _("ngfDropDisabled", e)
    }

    function d(t, n, r) {
      if (t) {
        var i
        try {
          i = t && t.getData && t.getData("text/html")
        } catch (a) {
        }
        v(t.items, t.files, _("ngfAllowDir", e) !== !1, _("multiple") || _("ngfMultiple", e)).then(function (e) {
          e.length ? p(e, n) : h(r, i).then(function (e) {
            p(e, n)
          })
        })
      }
    }

    function p(t, n) {
      l.updateModel(i, r, e, _("ngfChange") || _("ngfDrop"), t, n)
    }

    function h(t, n) {
      if (!l.shouldUpdateOn(t, r, e) || "string" != typeof n) return l.rejectPromise([])
      var i = []
      n.replace(/<(img src|img [^>]* src) *="([^"]*)"/gi, function (e, t, n) {
        i.push(n)
      })
      var a = [], o = []
      if (i.length) {
        angular.forEach(i, function (e) {
          a.push(l.urlToBlob(e).then(function (e) {
            o.push(e)
          }))
        })
        var s = c.defer()
        
        return c.all(a).then(function () {
          s.resolve(o)
        }, function (e) {
          s.reject(e)
        }), s.promise
      }
      
      return l.emptyPromise()
    }

    function g(e, t, n, r) {
      var i = _("ngfDragOverClass", e, { $event: n }), a = "dragover"
      if (angular.isString(i)) a = i; else if (i && (i.delay && ($ = i.delay), i.accept || i.reject)) {
        var o = n.dataTransfer.items
        if (null != o && o.length) for (var s = i.pattern || _("ngfPattern", e, { $event: n }), u = o.length; u--;) {
          if (!l.validatePattern(o[u], s)) {
            a = i.reject
            break
          }
          a = i.accept
        } else a = i.accept
      }
      r(a)
    }

    function v(t, n, i, a) {
      function o(e, t) {
        var n = c.defer()
        if (null != e) if (e.isDirectory) {
          var r = [l.emptyPromise()]
          if (d) {
            var i = { type: "directory" }
            i.name = i.path = (t || "") + e.name, p.push(i)
          }
          var a = e.createReader(), s = [], g = function () {
            a.readEntries(function (i) {
              try {
                i.length ? (s = s.concat(Array.prototype.slice.call(i || [], 0)), g()) : (angular.forEach(s.slice(0), function (n) {
                  p.length <= u && h <= f && r.push(o(n, (t ? t : "") + e.name + "/"))
                }), c.all(r).then(function () {
                  n.resolve()
                }, function (e) {
                  n.reject(e)
                }))
              } catch (a) {
                n.reject(a)
              }
            }, function (e) {
              n.reject(e)
            })
          }
          g()
        } else e.file(function (e) {
          try {
            e.path = (t ? t : "") + e.name, d && (e = l.rename(e, e.path)), p.push(e), h += e.size, n.resolve()
          } catch (r) {
            n.reject(r)
          }
        }, function (e) {
          n.reject(e)
        })
        
        return n.promise
      }

      var u = l.getValidationAttr(r, e, "maxFiles")
      null == u && (u = Number.MAX_VALUE)
      var f = l.getValidationAttr(r, e, "maxTotalSize")
      null == f && (f = Number.MAX_VALUE)
      var d = _("ngfIncludeDir", e), p = [], h = 0, g = [l.emptyPromise()]
      if (t && t.length > 0 && "file:" !== s.location.protocol) for (var v = 0; v < t.length; v++) {
        if (t[v].webkitGetAsEntry && t[v].webkitGetAsEntry() && t[v].webkitGetAsEntry().isDirectory) {
          var m = t[v].webkitGetAsEntry()
          if (m.isDirectory && !i) continue
          null != m && g.push(o(m))
        } else {
          var y = t[v].getAsFile()
          null != y && (p.push(y), h += y.size)
        }
        if (p.length > u || h > f || !a && p.length > 0) break
      } else if (null != n) for (var w = 0; w < n.length; w++) {
        var b = n.item(w)
        if ((b.type || b.size > 0) && (p.push(b), h += b.size), p.length > u || h > f || !a && p.length > 0) break
      }
      var $ = c.defer()
      
      return c.all(g).then(function () {
        if (a || d || !p.length) $.resolve(p); else {
          for (var e = 0; p[e] && "directory" === p[e].type;) e++
          $.resolve([p[e]])
        }
      }, function (e) {
        $.reject(e)
      }), $.promise
    }

    var m = t(), _ = function (e, t, n) {
      return l.attrGetter(e, r, t, n)
    }
    if (_("dropAvailable") && o(function () {
      e[_("dropAvailable")] ? e[_("dropAvailable")].value = m : e[_("dropAvailable")] = m
    }), !m) return void (_("ngfHideOnDropNotAvailable", e) === !0 && n.css("display", "none"))
    null == _("ngfSelect") && l.registerModelChangeValidator(i, r, e)
    var y, w = null, b = a(_("ngfStopPropagation")), $ = 1
    n[0].addEventListener("dragover", function (t) {
      if (!f() && l.shouldUpdateOn("drop", r, e)) {
        if (t.preventDefault(), b(e) && t.stopPropagation(), navigator.userAgent.indexOf("Chrome") > -1) {
          var i = t.dataTransfer.effectAllowed
          t.dataTransfer.dropEffect = "move" === i || "linkMove" === i ? "move" : "copy"
        }
        o.cancel(w), y || (y = "C", g(e, r, t, function (r) {
          y = r, n.addClass(y), _("ngfDrag", e, { $isDragging: !0, $class: y, $event: t })
        }))
      }
    }, !1), n[0].addEventListener("dragenter", function (t) {
      !f() && l.shouldUpdateOn("drop", r, e) && (t.preventDefault(), b(e) && t.stopPropagation())
    }, !1), n[0].addEventListener("dragleave", function (t) {
      !f() && l.shouldUpdateOn("drop", r, e) && (t.preventDefault(), b(e) && t.stopPropagation(), w = o(function () {
        y && n.removeClass(y), y = null, _("ngfDrag", e, { $isDragging: !1, $event: t })
      }, $ || 100))
    }, !1), n[0].addEventListener("drop", function (t) {
      !f() && l.shouldUpdateOn("drop", r, e) && (t.preventDefault(), b(e) && t.stopPropagation(), y && n.removeClass(y), y = null, d(t.dataTransfer, t, "dropUrl"))
    }, !1), n[0].addEventListener("paste", function (t) {
      navigator.userAgent.toLowerCase().indexOf("firefox") > -1 && _("ngfEnableFirefoxPaste", e) && t.preventDefault(), !f() && l.shouldUpdateOn("paste", r, e) && d(t.clipboardData || t.originalEvent.clipboardData, t, "pasteUrl")
    }, !1), navigator.userAgent.toLowerCase().indexOf("firefox") > -1 && _("ngfEnableFirefoxPaste", e) && (n.attr("contenteditable", !0), n.on("keypress", function (e) {
      e.metaKey || e.ctrlKey || e.preventDefault()
    }))
  }

  function t() {
    var e = document.createElement("div")
    
    return "draggable" in e && "ondrop" in e && !/Edge\/12./i.test(navigator.userAgent)
  }

  ngFileUpload.directive("ngfDrop", ["$parse", "$timeout", "$window", "Upload", "$http", "$q", function (t, n, r, i, a, o) {
    return {
      restrict: "AEC", require: "?ngModel", link: function (s, l, u, c) {
        e(s, l, u, c, t, n, r, i, a, o)
      },
    }
  }]), ngFileUpload.directive("ngfNoFileDrop", function () {
    return function (e, n) {
      t() && n.css("display", "none")
    }
  }), ngFileUpload.directive("ngfDropAvailable", ["$parse", "$timeout", "Upload", function (e, n, r) {
    return function (i, a, o) {
      if (t()) {
        var s = e(r.attrGetter("ngfDropAvailable", o))
        n(function () {
          s(i), s.assign && s.assign(i, !0)
        })
      }
    }
  }])
}(), ngFileUpload.service("UploadExif", ["UploadResize", "$q", function (e, t) {
  function n(e, t, n, r) {
    switch (t) {
    case 2:
      return e.transform(-1, 0, 0, 1, n, 0)
    case 3:
      return e.transform(-1, 0, 0, -1, n, r)
    case 4:
      return e.transform(1, 0, 0, -1, 0, r)
    case 5:
      return e.transform(0, 1, 1, 0, 0, 0)
    case 6:
      return e.transform(0, 1, -1, 0, r, 0)
    case 7:
      return e.transform(0, -1, -1, 0, r, n)
    case 8:
      return e.transform(0, -1, 1, 0, 0, n)
    }
  }

  function r(e) {
    for (var t = "", n = new Uint8Array(e), r = n.byteLength, i = 0; i < r; i++) t += String.fromCharCode(n[i])
    
    return window.btoa(t)
  }

  var i = e
  
  return i.isExifSupported = function () {
    return window.FileReader && (new FileReader).readAsArrayBuffer && i.isResizeSupported()
  }, i.readOrientation = function (e) {
    var n = t.defer(), r = new FileReader, i = e.slice ? e.slice(0, 65536) : e
    
    return r.readAsArrayBuffer(i), r.onerror = function (e) {
      return n.reject(e)
    }, r.onload = function (e) {
      var t = { orientation: 1 }, r = new DataView(this.result)
      if (65496 !== r.getUint16(0, !1)) return n.resolve(t)
      for (var i = r.byteLength, a = 2; a < i;) {
        var o = r.getUint16(a, !1)
        if (a += 2, 65505 === o) {
          if (1165519206 !== r.getUint32(a += 2, !1)) return n.resolve(t)
          var s = 18761 === r.getUint16(a += 6, !1)
          a += r.getUint32(a + 4, s)
          var l = r.getUint16(a, s)
          a += 2
          for (var u = 0; u < l; u++) if (274 === r.getUint16(a + 12 * u, s)) {
            var c = r.getUint16(a + 12 * u + 8, s)
            
            return c >= 2 && c <= 8 && (r.setUint16(a + 12 * u + 8, 1, s), t.fixedArrayBuffer = e.target.result), t.orientation = c, n.resolve(t)
          }
        } else {
          if (65280 !== (65280 & o)) break
          a += r.getUint16(a, !1)
        }
      }
      
      return n.resolve(t)
    }, n.promise
  }, i.applyExifRotation = function (e) {
    if (0 !== e.type.indexOf("image/jpeg")) return i.emptyPromise(e)
    var a = t.defer()
    
    return i.readOrientation(e).then(function (t) {
      return t.orientation < 2 || t.orientation > 8 ? a.resolve(e) : void i.dataUrl(e, !0).then(function (o) {
        var s = document.createElement("canvas"), l = document.createElement("img")
        l.onload = function () {
          try {
            s.width = t.orientation > 4 ? l.height : l.width, s.height = t.orientation > 4 ? l.width : l.height
            var o = s.getContext("2d")
            n(o, t.orientation, l.width, l.height), o.drawImage(l, 0, 0)
            var u = s.toDataURL(e.type || "image/WebP", .934)
            u = i.restoreExif(r(t.fixedArrayBuffer), u)
            var c = i.dataUrltoBlob(u, e.name)
            a.resolve(c)
          } catch (f) {
            return a.reject(f)
          }
        }, l.onerror = function () {
          a.reject()
        }, l.src = o
      }, function (e) {
        a.reject(e)
      })
    }, function (e) {
      a.reject(e)
    }), a.promise
  }, i.restoreExif = function (e, t) {
    var n = {}
    
    return n.KEY_STR = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=", n.encode64 = function (e) {
      var t, n, r, i, a, o = "", s = "", l = "", u = 0
      do t = e[u++], n = e[u++], s = e[u++], r = t >> 2, i = (3 & t) << 4 | n >> 4, a = (15 & n) << 2 | s >> 6, l = 63 & s, isNaN(n) ? a = l = 64 : isNaN(s) && (l = 64), o = o + this.KEY_STR.charAt(r) + this.KEY_STR.charAt(i) + this.KEY_STR.charAt(a) + this.KEY_STR.charAt(l), t = n = s = "", r = i = a = l = ""; while (u < e.length)
      
      return o
    }, n.restore = function (e, t) {
      e.match("data:image/jpeg;base64,") && (e = e.replace("data:image/jpeg;base64,", ""))
      var n = this.decode64(e), r = this.slice2Segments(n), i = this.exifManipulation(t, r)
      
      return "data:image/jpeg;base64," + this.encode64(i)
    }, n.exifManipulation = function (e, t) {
      var n = this.getExifArray(t), r = this.insertExif(e, n)
      
      return new Uint8Array(r)
    }, n.getExifArray = function (e) {
      for (var t, n = 0; n < e.length; n++) if (t = e[n], 255 === t[0] & 225 === t[1]) return t
      
      return []
    }, n.insertExif = function (e, t) {
      var n = e.replace("data:image/jpeg;base64,", ""), r = this.decode64(n), i = r.indexOf(255, 3),
        a = r.slice(0, i), o = r.slice(i), s = a
      
      return s = s.concat(t), s = s.concat(o)
    }, n.slice2Segments = function (e) {
      for (var t = 0, n = []; ;) {
        if (255 === e[t] & 218 === e[t + 1]) break
        if (255 === e[t] & 216 === e[t + 1]) t += 2; else {
          var r = 256 * e[t + 2] + e[t + 3], i = t + r + 2, a = e.slice(t, i)
          n.push(a), t = i
        }
        if (t > e.length) break
      }
      
      return n
    }, n.decode64 = function (e) {
      var t, n, r, i, a, o = "", s = "", l = 0, u = [], c = /[^A-Z0-9+/=]/gi
      c.exec(e), e = e.replace(/[^A-Z0-9+/=]/gi, "")
      do r = this.KEY_STR.indexOf(e.charAt(l++)), i = this.KEY_STR.indexOf(e.charAt(l++)), a = this.KEY_STR.indexOf(e.charAt(l++)), s = this.KEY_STR.indexOf(e.charAt(l++)), t = r << 2 | i >> 4, n = (15 & i) << 4 | a >> 2, o = (3 & a) << 6 | s, u.push(t), 64 !== a && u.push(n), 64 !== s && u.push(o), t = n = o = "", r = i = a = s = ""; while (l < e.length)
      
      return u
    }, n.restore(e, t)
  }, i
}]), function (e) {
  var t = {
    init: function (n) {
      return this.each(function () {
        t.destroy.call(this), this.opt = e.extend(!0, {}, e.fn.raty.defaults, n)
        var r = e(this), i = ["number", "readOnly", "score", "scoreName"]
        t._callback.call(this, i), this.opt.precision && t._adjustPrecision.call(this), this.opt.number = t._between(this.opt.number, 0, this.opt.numberMax), this.stars = t._createStars.call(this), this.score = t._createScore.call(this), t._apply.call(this, this.opt.score), this.opt.cancel && (this.cancel = t._createCancel.call(this)), this.opt.width && r.css("width", this.opt.width), this.opt.readOnly ? t._lock.call(this) : (r.css("cursor", "pointer"), t._binds.call(this)), t._target.call(this, this.opt.score), r.data({
          settings: this.opt,
          raty: !0,
        })
      })
    }, _adjustPrecision: function () {
      this.opt.targetType = "score", this.opt.half = !0
    }, _apply: function (e) {
      "undefined" != typeof e && e >= 0 && (e = t._between(e, 0, this.opt.number), this.score.val(e)), t._fill.call(this, e), e && t._roundStars.call(this, e)
    }, _between: function (e, t, n) {
      return Math.min(Math.max(parseFloat(e), t), n)
    }, _binds: function () {
      this.cancel && t._bindCancel.call(this), t._bindClick.call(this), t._bindOut.call(this), t._bindOver.call(this)
    }, _bindCancel: function () {
      t._bindClickCancel.call(this), t._bindOutCancel.call(this), t._bindOverCancel.call(this)
    }, _bindClick: function () {
      var t = this, n = e(t)
      t.stars.on("click.raty", function (r) {
        t.score.val(t.opt.half || t.opt.precision ? n.data("score") : e(this).data("score")), t.opt.click && t.opt.click.call(t, parseFloat(t.score.val()), r)
      })
    }, _bindClickCancel: function () {
      var e = this
      e.cancel.on("click.raty", function (t) {
        e.score.removeAttr("value"), e.opt.click && e.opt.click.call(e, null, t)
      })
    }, _bindOut: function () {
      var n = this
      e(this).on("mouseleave.raty", function (e) {
        var r = parseFloat(n.score.val()) || void 0
        t._apply.call(n, r), t._target.call(n, r, e), n.opt.mouseout && n.opt.mouseout.call(n, r, e)
      })
    }, _bindOutCancel: function () {
      var t = this
      t.cancel.on("mouseleave.raty", function (n) {
        e(this).attr("class", t.opt.cancelOff), t.opt.mouseout && t.opt.mouseout.call(t, t.score.val() || null, n)
      })
    }, _bindOverCancel: function () {
      var n = this
      n.cancel.on("mouseover.raty", function (r) {
        e(this).attr("class", n.opt.cancelOn), n.stars.attr("class", n.opt.starOff), t._target.call(n, null, r), n.opt.mouseover && n.opt.mouseover.call(n, null)
      })
    }, _bindOver: function () {
      var n = this, r = e(n), i = n.opt.half ? "mousemove.raty" : "mouseover.raty"
      n.stars.on(i, function (i) {
        var a = parseInt(e(this).data("score"), 10)
        if (n.opt.half) {
          var o = parseFloat((i.pageX - e(this).offset().left) / (n.opt.size ? n.opt.size : parseInt(r.css("font-size")))),
            s = o > .5 ? 1 : .5
          a = a - 1 + s, t._fill.call(n, a), n.opt.precision && (a = a - s + o), t._roundStars.call(n, a), r.data("score", a)
        } else t._fill.call(n, a)
        t._target.call(n, a, i), n.opt.mouseover && n.opt.mouseover.call(n, a, i)
      })
    }, _callback: function (e) {
      for (var t in e) "function" == typeof this.opt[e[t]] && (this.opt[e[t]] = this.opt[e[t]].call(this))
    }, _createCancel: function () {
      var t = e(this), n = this.opt.cancelOff, r = e("<i />", { "class": n, title: this.opt.cancelHint })
      
      return "left" == this.opt.cancelPlace ? t.prepend("&#160;").prepend(r) : t.append("&#160;").append(r), r
    }, _createScore: function () {
      return e("<input />", { type: "hidden", name: this.opt.scoreName }).appendTo(this)
    }, _createStars: function () {
      for (var n = e(this), r = 1; r <= this.opt.number; r++) {
        var i = t._getHint.call(this, r), a = this.opt.score && this.opt.score >= r ? "starOn" : "starOff"
        a = this.opt[a], e("<i />", {
          "class": a,
          title: i,
          "data-score": r,
        }).appendTo(this), this.opt.space && n.append(r < this.opt.number ? "&#160;" : "")
      }
      
      return n.children("i")
    }, _error: function (t) {
      e(this).html(t), e.error(t)
    }, _fill: function (e) {
      for (var t = this, n = 0, r = 1; r <= t.stars.length; r++) {
        var i = t.stars.eq(r - 1), a = t.opt.single ? r == e : r <= e
        if (t.opt.iconRange && t.opt.iconRange.length > n) {
          var o = t.opt.iconRange[n], s = o.on || t.opt.starOn, l = o.off || t.opt.starOff, u = a ? s : l
          r <= o.range && i.attr("class", u), r == o.range && n++
        } else {
          var u = a ? "starOn" : "starOff"
          i.attr("class", this.opt[u])
        }
      }
    }, _getHint: function (e) {
      var t = this.opt.hints[e - 1]
      
      return "" === t ? "" : t || e
    }, _lock: function () {
      var n = parseInt(this.score.val(), 10), r = n ? t._getHint.call(this, n) : this.opt.noRatedMsg
      e(this).data("readonly", !0).css("cursor", "").attr("title", r), this.score.attr("readonly", "readonly"), this.stars.attr("title", r), this.cancel && this.cancel.hide()
    }, _roundStars: function (e) {
      var t = (e - Math.floor(e)).toFixed(2)
      if (t > this.opt.round.down) {
        var n = "starOn"
        this.opt.halfShow && t < this.opt.round.up ? n = "starHalf" : t < this.opt.round.full && (n = "starOff"), this.stars.eq(Math.ceil(e) - 1).attr("class", this.opt[n])
      }
    }, _target: function (n, r) {
      if (this.opt.target) {
        var i = e(this.opt.target)
        0 === i.length && t._error.call(this, "Target selector invalid or missing!"), this.opt.targetFormat.indexOf("{score}") < 0 && t._error.call(this, 'Template "{score}" missing!')
        var a = r && "mouseover" == r.type
        void 0 === n ? n = this.opt.targetText : null === n ? n = a ? this.opt.cancelHint : this.opt.targetText : ("hint" == this.opt.targetType ? n = t._getHint.call(this, Math.ceil(n)) : this.opt.precision && (n = parseFloat(n).toFixed(1)), a || this.opt.targetKeep || (n = this.opt.targetText)), n && (n = this.opt.targetFormat.toString().replace("{score}", n)), i.is(":input") ? i.val(n) : i.html(n)
      }
    }, _unlock: function () {
      e(this).data("readonly", !1).css("cursor", "pointer").removeAttr("title"), this.score.removeAttr("readonly", "readonly")
      for (var n = 0; n < this.opt.number; n++) this.stars.eq(n).attr("title", t._getHint.call(this, n + 1))
      this.cancel && this.cancel.css("display", "")
    }, cancel: function (n) {
      return this.each(function () {
        e(this).data("readonly") !== !0 && (t[n ? "click" : "score"].call(this, null), this.score.removeAttr("value"))
      })
    }, click: function (n) {
      return e(this).each(function () {
        e(this).data("readonly") !== !0 && (t._apply.call(this, n), this.opt.click || t._error.call(this, 'You must add the "click: function(score, evt) { }" callback.'), this.opt.click.call(this, n, e.Event("click")), t._target.call(this, n))
      })
    }, destroy: function () {
      return e(this).each(function () {
        var t = e(this), n = t.data("raw")
        n ? t.off(".raty").empty().css({
          cursor: n.style.cursor,
          width: n.style.width,
        }).removeData("readonly") : t.data("raw", t.clone()[0])
      })
    }, getScore: function () {
      var t, n = []
      
      return e(this).each(function () {
        t = this.score.val(), n.push(t ? parseFloat(t) : void 0)
      }), n.length > 1 ? n : n[0]
    }, readOnly: function (n) {
      return this.each(function () {
        var r = e(this)
        r.data("readonly") !== n && (n ? (r.off(".raty").children("i").off(".raty"), t._lock.call(this)) : (t._binds.call(this), t._unlock.call(this)), r.data("readonly", n))
      })
    }, reload: function () {
      return t.set.call(this, {})
    }, score: function () {
      return arguments.length ? t.setScore.apply(this, arguments) : t.getScore.call(this)
    }, set: function (t) {
      return this.each(function () {
        var n = e(this), r = n.data("settings"), i = e.extend({}, r, t)
        n.raty(i)
      })
    }, setScore: function (n) {
      return e(this).each(function () {
        e(this).data("readonly") !== !0 && (t._apply.call(this, n), t._target.call(this, n))
      })
    },
  }
  e.fn.raty = function (n) {
    return t[n] ? t[n].apply(this, Array.prototype.slice.call(arguments, 1)) : "object" != typeof n && n ? void e.error("Method " + n + " does not exist!") : t.init.apply(this, arguments)
  }, e.fn.raty.defaults = {
    cancel: !1,
    cancelHint: "Cancel this rating!",
    cancelOff: "fa fa-fw fa-minus-square",
    cancelOn: "fa fa-fw fa-check-square",
    cancelPlace: "left",
    click: void 0,
    half: !1,
    halfShow: !0,
    hints: ["malo", "pobre", "regular", "bueno", "excepcional"],
    iconRange: void 0,
    mouseout: void 0,
    mouseover: void 0,
    noRatedMsg: "Not rated yet!",
    number: 5,
    numberMax: 20,
    precision: !1,
    readOnly: !1,
    round: { down: .25, full: .6, up: .76 },
    score: void 0,
    scoreName: "score",
    single: !1,
    size: null,
    space: !0,
    starHalf: "fa fa-fw fa-star-half-o",
    starOff: "fa fa-fw fa-star-o",
    starOn: "fa fa-fw fa-star",
    target: void 0,
    targetFormat: "{score}",
    targetKeep: !1,
    targetText: "",
    targetType: "hint",
    width: !1,
  }
}(jQuery)
