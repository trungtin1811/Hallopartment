'use strict';

/*
 * jquery-countTo
 * Copyright (c) 2012-2014 Matt Huggins - The MIT License
 * URL: https://github.com/mhuggins/jquery-countTo/
 */

(function (n) { function i(n, t) { return n.toFixed(t.decimals) } var t = function (i, r) { this.$element = n(i); this.options = n.extend({}, t.DEFAULTS, this.dataOptions(), r); this.init() }; t.DEFAULTS = { from: 0, to: 0, speed: 1e3, refreshInterval: 100, decimals: 0, formatter: i, onUpdate: null, onComplete: null }; t.prototype.init = function () { this.value = this.options.from; this.loops = Math.ceil(this.options.speed / this.options.refreshInterval); this.loopCount = 0; this.increment = (this.options.to - this.options.from) / this.loops }; t.prototype.dataOptions = function () { var n = { from: this.$element.data("from"), to: this.$element.data("to"), speed: this.$element.data("speed"), refreshInterval: this.$element.data("refresh-interval"), decimals: this.$element.data("decimals") }, i = Object.keys(n), r, t; for (r in i) t = i[r], typeof n[t] == "undefined" && delete n[t]; return n }; t.prototype.update = function () { this.value += this.increment; this.loopCount++; this.render(); typeof this.options.onUpdate == "function" && this.options.onUpdate.call(this.$element, this.value); this.loopCount >= this.loops && (clearInterval(this.interval), this.value = this.options.to, typeof this.options.onComplete == "function" && this.options.onComplete.call(this.$element, this.value)) }; t.prototype.render = function () { var n = this.options.formatter.call(this.$element, this.value, this.options); this.$element.text(n) }; t.prototype.restart = function () { this.stop(); this.init(); this.start() }; t.prototype.start = function () { this.stop(); this.render(); this.interval = setInterval(this.update.bind(this), this.options.refreshInterval) }; t.prototype.stop = function () { this.interval && clearInterval(this.interval) }; t.prototype.toggle = function () { this.interval ? this.stop() : this.start() }; n.fn.countTo = function (i) { return this.each(function () { var u = n(this), r = u.data("countTo"), f = !r || typeof i == "object", e = typeof i == "object" ? i : {}, o = typeof i == "string" ? i : "start"; f && (r && r.stop(), u.data("countTo", r = new t(this, e))); r[o].call(r) }) } })(jQuery);

/*
jquery-circle-progress - jQuery Plugin to draw animated circular progress bars

URL: http://kottenator.github.io/jquery-circle-progress/
Author: Rostyslav Bryzgunov <kottenator@gmail.com>
Version: 1.1.3
License: MIT
*/
(function(n){function t(n){this.init(n)}t.prototype={value:0,size:100,startAngle:-Math.PI,thickness:"auto",fill:{gradient:["#3aeabb","#fdd250"]},emptyFill:"rgba(0, 0, 0, .1)",animation:{duration:1200,easing:"circleProgressEasing"},animationStartValue:0,reverse:!1,lineCap:"butt",constructor:t,el:null,canvas:null,ctx:null,radius:0,arcFill:null,lastFrameValue:0,init:function(t){n.extend(this,t);this.radius=this.size/2;this.initWidget();this.initFill();this.draw()},initWidget:function(){var t=this.canvas=this.canvas||n("<canvas>").prependTo(this.el)[0];t.width=this.size;t.height=this.size;this.ctx=t.getContext("2d")},initFill:function(){function a(){var t=n("<canvas>")[0];t.width=r.size;t.height=r.size;t.getContext("2d").drawImage(e,0,0,u,u);r.arcFill=r.ctx.createPattern(t,"no-repeat");r.drawFrame(r.lastFrameValue)}var r=this,t=this.fill,c=this.ctx,u=this.size,i,o,f,h,e;if(!t)throw Error("The fill is not specified!");if(t.color&&(this.arcFill=t.color),t.gradient)if(i=t.gradient,i.length==1)this.arcFill=i[0];else if(i.length>1){var s=t.gradientAngle||0,v=t.gradientDirection||[u/2*(1-Math.cos(s)),u/2*(1+Math.sin(s)),u/2*(1+Math.cos(s)),u/2*(1-Math.sin(s))],l=c.createLinearGradient.apply(c,v);for(o=0;o<i.length;o++)f=i[o],h=o/(i.length-1),n.isArray(f)&&(h=f[1],f=f[0]),l.addColorStop(h,f);this.arcFill=l}t.image&&(t.image instanceof Image?e=t.image:(e=new Image,e.src=t.image),e.complete?a():e.onload=a)},draw:function(){this.animation?this.drawAnimated(this.value):this.drawFrame(this.value)},drawFrame:function(n){this.lastFrameValue=n;this.ctx.clearRect(0,0,this.size,this.size);this.drawEmptyArc(n);this.drawArc(n)},drawArc:function(n){var t=this.ctx,i=this.radius,u=this.getThickness(),r=this.startAngle;t.save();t.beginPath();this.reverse?t.arc(i,i,i-u/2,r-Math.PI*2*n,r):t.arc(i,i,i-u/2,r,r+Math.PI*2*n);t.lineWidth=u;t.lineCap=this.lineCap;t.strokeStyle=this.arcFill;t.stroke();t.restore()},drawEmptyArc:function(n){var t=this.ctx,i=this.radius,r=this.getThickness(),u=this.startAngle;n<1&&(t.save(),t.beginPath(),n<=0?t.arc(i,i,i-r/2,0,Math.PI*2):this.reverse?t.arc(i,i,i-r/2,u,u-Math.PI*2*n):t.arc(i,i,i-r/2,u+Math.PI*2*n,u),t.lineWidth=r,t.strokeStyle=this.emptyFill,t.stroke(),t.restore())},drawAnimated:function(t){var r=this,i=this.el,u=n(this.canvas);u.stop(!0,!1);i.trigger("circle-animation-start");u.css({animationProgress:0}).animate({animationProgress:1},n.extend({},this.animation,{step:function(n){var u=r.animationStartValue*(1-n)+t*n;r.drawFrame(u);i.trigger("circle-animation-progress",[n,u])}})).promise().always(function(){i.trigger("circle-animation-end")})},getThickness:function(){return n.isNumeric(this.thickness)?this.thickness:this.size/14},getValue:function(){return this.value},setValue:function(n){this.animation&&(this.animationStartValue=this.lastFrameValue);this.value=n;this.draw()}};n.circleProgress={defaults:t.prototype};n.easing.circleProgressEasing=function(n,t,i,r,u){return(t/=u/2)<1?r/2*t*t*t+i:r/2*((t-=2)*t*t+2)+i};n.fn.circleProgress=function(i,r){var u="circle-progress",f=this.data(u),e;if(i=="widget"){if(!f)throw Error('Calling "widget" method on not initialized instance is forbidden');return f.canvas}if(i=="value"){if(!f)throw Error('Calling "value" method on not initialized instance is forbidden');return typeof r=="undefined"?f.getValue():(e=arguments[1],this.each(function(){n(this).data(u).setValue(e)}))}return this.each(function(){var e=n(this),o=e.data(u),f=n.isPlainObject(i)?i:{},r;o?o.init(f):(r=n.extend({},e.data()),typeof r.fill=="string"&&(r.fill=JSON.parse(r.fill)),typeof r.animation=="string"&&(r.animation=JSON.parse(r.animation)),f=n.extend(r,f),f.el=e,o=new t(f),e.data(u,o))})}})(jQuery);

/**
 * downCount: Simple Countdown clock with offset
 * Author: Sonny T. <hi@sonnyt.com>, sonnyt.com
 * License: MIT
 */

(function(n){n.fn.downCount=function(t,i){function o(){var y=new Date(u.date),p=f(),h=y-p;if(h<0){clearInterval(e);i&&typeof i=="function"&&i();return}var a=1e3,c=a*60,l=c*60,v=l*24,n=Math.floor(h/v),t=Math.floor(h%v/l),o=Math.floor(h%l/c),s=Math.floor(h%c/a);n=String(n).length>=2?n:"0"+n;t=String(t).length>=2?t:"0"+t;o=String(o).length>=2?o:"0"+o;s=String(s).length>=2?s:"0"+s;var w=n===1?"day":"days",b=t===1?"hour":"hours",k=o===1?"minute":"minutes",d=s===1?"second":"seconds";r.find(".days").text(n);r.find(".hours").text(t);r.find(".minutes").text(o);r.find(".seconds").text(s);r.find(".days_ref").text(w);r.find(".hours_ref").text(b);r.find(".minutes_ref").text(k);r.find(".seconds_ref").text(d)}var u=n.extend({date:null,offset:null},t),r,f,e;u.date||n.error("Date is not defined.");Date.parse(u.date)||n.error("Incorrect date format, it should look like this, 12/24/2012 12:00:00.");r=this;f=function(){var n=new Date,t=n.getTime()+n.getTimezoneOffset()*6e4;return new Date(t+36e5*u.offset)};e=setInterval(o,1e3)}})(jQuery);

/*
* ===========================================================
* PROGRESS BAR - CIRCLE PROGRESS BAR - COUNTER - COUNTDOWN - FRAMEWORK Y
* ===========================================================
* This script manage the following component: progress bar, circle progress bar, counter and countdown.
* Documentation: www.framework-y.com/components/components.html#counter
* Documentation: www.framework-y.com/components/components.html#countdown
* Documentation: www.framework-y.com/components/components.html#progress-bar
* 
* Pixor - Copyright (c) Federico Schiocchet - Pixor - Framework Y
*/

(function ($) {
    $(document).ready(function () {
        var cache = $("[data-time].countdown");
        $(cache).each(function (index) {
            $(this).downCount({
                date: $(this).attr("data-time"),
                offset: $(this).attr("data-utc-offset")
            });
        });
        $(window).scroll(function () {
            cache = $(".counter");
            $(cache).each(function () {
                if (isScrollView(this)) {
                    var tr = $(this).attr("data-trigger");
                    if (isEmpty(tr) || tr == "scroll") {
                        $(this).countTo({
                            formatter: function (value, options) {
                                return value.toFixed(options.decimals).replace(/\B(?=(?:\d{3})+(?!\d))/g, '.');
                            }
                        });
                        $(this).attr("data-trigger", "null");
                    }
                }
            });
            cache = $("[data-progress].progress-bar");
            $(cache).each(function () {
                if (isScrollView(this)) {
                    var tr = $(this).attr("data-trigger");
                    if (isEmpty(tr) || tr == "scroll") {
                        $(this).css("width", 0);
                        $(this).css("width", $(this).attr("data-progress") + "%");
                        $(this).attr("data-trigger", "null");
                    }
                }
            });
            cache = $("[data-progress].progress-circle");
            $(cache).each(function () {
                if (isScrollView(this)) {
                    var tr = $(this).attr("data-trigger");
                    if (isEmpty(tr) || tr == "scroll") {
                        $(this).progressCircle();
                        $(this).attr("data-trigger", "null");
                    }
                }
            });
        })
    });
    $.fn.progressCircle = function () {
        var optionsString = $(this).attr("data-options");
        var optionsArr;
        var _size = $(this).attr("data-size");
        var _color = $(this).attr("data-color");
        var _unit = $(this).attr("data-unit");
        var _thickness = $(this).attr("data-thickness");
        var _thickness = $(this).attr("data-thickness");
        if (isEmpty(_color)) _color = "#565656";
        if (isEmpty(_thickness)) _thickness = 2;
        if (isEmpty(_size) || _size == "auto") _size = $(this).outerWidth();
        if (_unit == null) _unit = "%";
        var options = {
            value: parseInt($(this).attr("data-progress"), 10) / 100,
            size: _size,
            fill: {
                gradient: [_color, _color]
            },
            thickness: _thickness,
            startAngle: -Math.PI / 2
        }
        if (!isEmpty(optionsString)) {
            optionsArr = optionsString.split(",");
            options = getOptionsString(optionsString, options);
        }
        $(this).circleProgress(options);
        var inner = $(this).find(".inner-circle .counter-circle");
        if (inner) {
            $(this).find(".inner-circle").css("display", "table")
            $(this).on('circle-animation-progress', function (event, progress, stepValue) {
                $(inner).html(parseInt(stepValue.toFixed(2) * 100, 10) + " " + _unit);
            });
        }
    }
}(jQuery));


