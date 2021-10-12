'use strict';

/*
* ===========================================================
* TABS AND ACCORDION - FRAMEWORK Y
* ===========================================================
* This script manage the tabs, collpse and accordion container components.
* Documentation: www.framework-y.com/containers/others.html#tabs
* Documentation: www.framework-y.com/containers/others.html#collapse
* Documentation: www.framework-y.com/containers/others.html#accordion-lists
* 
* Pixor - Copyright (c) Federico Schiocchet - Pixor - Framework Y
*/

!function (t) { function i(i) { var a = t(i).closest(".collapse-box"), e = t(a).find(".panel"), s = t(a).attr("data-height"); isEmpty(s) || t(e).removeClass("no-gradient"); var n = t(this).attr("data-time"); isEmpty(n) && (n = 500), t(e).animate({ height: isEmpty(s) ? 0 : s }, parseInt(n, 10), function () { isEmpty(s) && (t(e).css("display", "none"), t(e).css("height", "")) }) } function a(i) { var a = t(i).closest(".collapse-box"), e = t(a).find(".panel"), s = t(a).attr("data-height"), n = t(i).attr("data-height"); t(e).css("display", "block").css("height", ""); var l = t(e).height(); t(e).css("height", 0), isEmpty(n) || (l = n); var h = t(i).attr("data-time"); isEmpty(h) && (h = 500), isEmpty(s) || (t(e).css("height", s + "px"), t(e).addClass("no-gradient")), t(e).animate({ height: l }, parseInt(h, 10)) } t(document).ready(function () { t("body").on("click", ".tab-box .nav li", function (i) { var a = t(this).find("a").attr("href"); "#" == a && (a = null); var e = t(this).closest(".tab-box"), s = t(e).attr("data-tab-anima"); t(e).find("> .panel, > .panel-box .panel").removeClass("active"), t(e).find("> .nav li").removeClass("active"), t(this).addClass("active"); var n = t(e).find("> .panel:eq(" + t(this).index() + "), > .panel-box .panel:eq(" + t(this).index() + ")"); if (isEmpty(a) || (n = t(e).find(a)), t(n).addClass("active"), isEmpty(s) || (t(n).css("opacity", 0), t(n).showAnima(s)), t.isFunction(t.fn.initFlexSlider)) { var l = 0; t(n).find(".flexslider").each(function () { t(this).initFlexSlider(), l++ }), l && t(window).trigger("resize").trigger("scroll") } if (t(this).closest(".mega-menu").length) return !1; i.preventDefault() }), t("body").on("click", "header .mega-tabs", function () { t(this).find(".nav-tabs li:first-child").addClass("active") }), t(".tab-box.left,.tab-box.right").each(function () { var i = t(this).find(".nav"), a = t(this).find(".panel-box"); t(a).outerHeight() < t(i).outerHeight() ? t(a).find(".panel").css("height", t(i).outerHeight() + "px") : t(i).css("height", t(a).find(".panel").outerHeight() + "px") }), t(".nav.nav-justified-v").each(function () { var i = t(this).find("li").length, a = t(this).find("li a"); t(a).css("height", t(this).outerHeight() / i + "px"), t(a).css("line-height", t(a).height() + "px") }), t("*[data-height].collapse-box").each(function () { var i = t(this).find(".panel"); t(i).css("height", t(this).attr("data-height") + "px"), t(i).show() }), t(".accordion-list[data-open]").each(function () { var i = t(this).attr("data-open"); t(this).find(".list-group-item").eq(parseInt(i, 10) - 1).find("a").click() }) }), t(".collapse-box .collapse-button").toggleClick(function () { var i = this; a(i); var e = t(i).attr("data-button-open-text"); isEmpty(e) || (t(i).attr("data-button-close-text", t(this).find("b").html()), setTimeout(function () { t(i).find("b").html(e) }, 500)) }, function () { var a = this; i(a); var e = t(a).attr("data-button-close-text"); isEmpty(e) || setTimeout(function () { t(a).find("b").html(e) }, 500) }), t("body").on("click", ".accordion-list .list-group-item > a", function () { var i = t(this).closest(".accordion-list"), a = t(this).closest(".list-group-item"), e = t(i).attr("data-type"), s = t(i).attr("data-time"), n = t(i).attr("data-height"), l = t(i).find(".active-panel .panel"); if (t(i).find(".list-group-item").removeClass("active-panel"), isEmpty(e) && (e = ""), t(t(i).find(".panel")).each(function () { t(this).clearQueue() }), t(this).hasClass("active") || "block" == t(a).find(".panel").css("display")) { t(this).removeClass("active"); var h = t(a).find(".panel"); isEmpty(s) && (s = 500), t(h).animate({ height: 0 }, s, function () { t(h).css("display", "none").css("height", "") }) } else { var o = 0, c = t(i).find(".list-group-item > a"); t(c).each(function () { t(this).hasClass("active") && (o = 300) }), t(c).removeClass("active"), t(this).addClass("active"), t(a).addClass("active-panel"), "visible" == e ? t(t(a).find(".panel")).collapse({ milliseconds: s, height: n }) : (t(l).animate({ height: 0 }, o, function () { t(l).css("display", "none").css("height", "") }), "accordion" == e ? t(a).find(".panel").collapse({ milliseconds: s, height: n }) : t(l).promise().done(function () { t(a).find(".panel").collapse({ milliseconds: s, height: n }) })) } }), t.fn.collapse = function (i) { var a = "", e = ""; isEmpty(i) || (a = i.milliseconds, e = i.height), isEmpty(a) && (a = 500); var s = this; t(s).css("display", "block"); var n = t(s).height(); t(s).css("height", "0px"), isEmpty(e) || (n = e), t(s).animate({ height: n }, parseInt(a, 10)) } }(jQuery);

