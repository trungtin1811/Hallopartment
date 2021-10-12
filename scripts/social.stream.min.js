/*
 * Tweetie: A simple Twitter feed plugin
 * Author: Sonny T. <hi@sonnyt.com>, sonnyt.com
 */
(function ($) {
    'use strict';
    function isEmpty(obj) { if (typeof (obj) !== "undefined" && obj !== null && (obj.length > 0 || typeof (obj) == 'number' || typeof (obj.length) == "undefined") && obj !== "undefined") return false; else return true; }
    $.fn.twittie = function () { var e = arguments[0] instanceof Object ? arguments[0] : {}, t = "function" == typeof arguments[0] ? arguments[0] : arguments[1], a = ""; $("script").each(function () { var e = $(this).attr("src"); if (!isEmpty(e) && e.indexOf("social.stream.min.js") > -1) return a = $(this).attr("src"), a = a.substr(0, a.lastIndexOf("/")), !1 }); var r = $.extend({ username: null, list: null, hashtag: null, count: 10, hideReplies: !1, dateFormat: "%b/%d/%Y", template: '<div class="tweet-cnt"><a href="{{url}}" target="_blank">{{avatar}}</a><div class="tweets_txt">{{tweet}}<span>{{date}}</span></div></div>', apiPath: a + "/tweetie/api/tweet.php", loadingText: '<div class="feeds-loading"></div>' }, e); r.list && !r.username && $.error("If you want to fetch tweets from a list, you must define the username of the list owner."); var n = function (e) { return e.replace(/(https?:\/\/([-\w\.]+)+(:\d+)?(\/([\w\/_\.]*(\?\S+)?)?)?)/gi, '<a href="$1" target="_blank" title="Visit this link">$1</a>').replace(/#([a-zA-Z0-9_]+)/g, '<a href="https://twitter.com/search?q=%23$1&amp;src=hash" target="_blank" title="Search for #$1">#$1</a>').replace(/@([a-zA-Z0-9_]+)/g, '<a href="https://twitter.com/$1" target="_blank" title="$1 on Twitter">@$1</a>') }, s = function (e) { for (var t = e.split(" "), a = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"], n = { "%d": (e = new Date(Date.parse(t[1] + " " + t[2] + ", " + t[5] + " " + t[3] + " UTC"))).getDate(), "%m": e.getMonth() + 1, "%b": a[e.getMonth()].substr(0, 3), "%B": a[e.getMonth()], "%y": String(e.getFullYear()).slice(-2), "%Y": e.getFullYear() }, s = r.dateFormat, i = r.dateFormat.match(/%[dmbByY]/g), l = 0, u = i.length; l < u; l++) s = s.replace(i[l], n[i[l]]); return s }, i = function (e) { for (var t = r.template, a = ["date", "tweet", "avatar", "url", "retweeted", "screen_name", "user_name"], n = 0, s = a.length; n < s; n++) t = t.replace(new RegExp("{{" + a[n] + "}}", "gi"), e[a[n]]); return t }; this.html("<span>" + r.loadingText + "</span>"); var l = this; $.getJSON(r.apiPath, { username: r.username, list: r.list, hashtag: r.hashtag, count: r.count, exclude_replies: r.hideReplies }, function (e) { l.find("span").fadeOut("fast", function () { l.html("<ul></ul>"); for (var a = 0; a < r.count; a++) { var u = !1; if (e[a]) u = e[a]; else { if (void 0 === e.statuses || !e.statuses[a]) break; u = e.statuses[a] } var c = u.retweeted ? u.retweeted_status.text : u.text; null != r.length && c.length > r.length && (c = c.substr(0, parseInt(r.length)) + "..."), c = n(u.retweeted ? "RT @" + u.user.screen_name + ": " + c : c); var h = { user_name: u.user.name, date: s(u.created_at), tweet: c, avatar: '<img src="' + u.user.profile_image_url + '" />', url: "https://twitter.com/" + u.user.screen_name + "/status/" + u.id_str, retweeted: u.retweeted, screen_name: n("@" + u.user.screen_name) }; l.find("ul").append("<li>" + i(h) + "</li>") } "function" == typeof t && t() }) }) };
})(jQuery);


/*
 * Facebook Wall
 * https://github.com/thomasclausen/jquery-facebook-wall
 * Under MIT License
 */
!function (e) { e.fn.facebook_wall = function (t) { function s(e) { return a(i(l(e))) } function a(e) { return e.replace(/(\r\n)|(\n\r)|\r|\n/g, "<br />") } function i(e) { return e.replace(/((http|https|ftp):\/\/[\w?=&.\/-;#~%-]+(?![\w\s?&.\/;#~%"=-]*>))/g, '<a href="$1" target="_blank">$1</a>') } function l(e) { return e.replace(/</g, "&lt;").replace(/>/g, "&gt;") } function n(e) { var s = new Date(1e3 * e), a = (s.toGMTString(), Math.round((new Date).getTime() / 1e3) - e); return a < 10 ? t.text_labels.seconds.few : a < 60 ? Math.round(a) + t.text_labels.seconds.plural : 1 === Math.round(a / 60) ? Math.round(a / 60) + t.text_labels.minutes.singular : Math.round(a / 60) < 60 ? Math.round(a / 60) + t.text_labels.minutes.plural : 1 === Math.round(a / 3600) ? Math.round(a / 3600) + t.text_labels.hours.singular : Math.round(a / 3600) < 24 ? Math.round(a / 3600) + t.text_labels.hours.plural : 1 === Math.round(a / 86400) ? Math.round(a / 86400) + t.text_labels.days.singular : Math.round(a / 86400) <= 10 ? Math.round(a / 86400) + t.text_labels.days.plural : t.text_labels.weekdays[s.getDay()] + " " + s.getDate() + ". " + t.text_labels.months[s.getMonth()] + " " + s.getFullYear() } if (void 0 !== t.id && void 0 !== t.access_token) { var o = "https://graph.facebook.com/", r = (t = e.extend({ id: "", access_token: "", limit: 15, timeout: 400, speed: 400, effect: "slide", locale: "en_US", avatar_size: "square", message_length: 200, comments: !0, show_guest_entries: !0, text_labels: { shares: { singular: "Shared % time", plural: "Shared % times" }, likes: { singular: "% Like", plural: "% Likes" }, comments: { singular: "% comment", plural: "% comments" }, like: "Like", comment: "Write comment", share: "Share", weekdays: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"], months: ["januari", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"], seconds: { few: "second ago", plural: " seconds ago" }, minutes: { singular: " minut ago", plural: " minutes ago" }, hours: { singular: " hour ago", plural: " hours ago" }, days: { singular: " day ago", plural: " days ago" } }, on_complete: null }, t)).comments ? "comments," : "", d = o + "v2.9/" + t.id + "/?access_token=" + t.access_token + "&locale=" + t.locale + "&date_format=U&fields=posts.limit(" + t.limit + "){caption,message,picture,from,link,source,properties,icon,actions,is_hidden,is_expired,likes," + r + "shares,status_type,object_id,created_time,updated_time,type}", c = e(this); c.append('<div class="feeds-loading facebook-loading"></div>'), e.getJSON(d, function (a) { e.each(a.posts.data, function () { var e = "", a = "", i = ""; if (!1 === this.is_hidden) { if ("link" === this.type ? a = "type-link " : "photo" === this.type ? a = "type-photo " : "status" === this.type ? a = "type-status " : "video" === this.type && (a = "type-video "), e += '<li class="post ' + a + "avatar-size-" + t.avatar_size + '">', e += '<div class="meta-header">', e += '<div class="avatar"><a href="http://www.facebook.com/profile.php?id=' + this.from.id + '" target="_blank" title="' + this.from.name + '"><img src="' + (o + this.from.id) + "/picture?type=" + t.avatar_size + '" alt="' + this.from.name + '" /></a></div>', e += '<div class="author"><a href="http://www.facebook.com/profile.php?id=' + this.from.id + '" target="_blank" title="' + this.from.name + '">' + this.from.name + "</a></div>", e += '<div class="date">' + n(this.created_time) + "</div>", e += "</div>", void 0 !== this.message ? t.message_length > 0 && this.message.length > t.message_length ? e += '<div class="message">' + s(this.message.substring(0, t.message_length)) + "...</div>" : e += '<div class="message">' + s(this.message) + "</div>" : void 0 !== this.story && (t.message_length > 0 && this.story.length > t.message_length ? e += '<div class="story">' + s(this.story.substring(0, t.message_length)) + "...</div>" : e += '<div class="story">' + s(this.story) + "</div>"), "link" !== this.type && "photo" !== this.type && "video" !== this.type || (e += '<div class="media' + (void 0 !== this.picture || void 0 !== this.object_id ? " border-left" : "") + ' clearfix">', void 0 !== this.picture ? e += '<div class="image"><a href="' + this.link + '" target="_blank"><img src="' + this.picture + '" /></a></div>' : void 0 !== this.object_id && (e += '<div class="image"><a href="' + this.link + '" target="_blank"><img src="' + (o + this.object_id) + '/picture?type=album" /></a></div>'), e += '<div class="media-meta">', void 0 !== this.name && (e += '<div class="name"><a href="' + this.link + '" target="_blank">' + this.name + "</a></div>"), void 0 !== this.caption && (e += '<div class="caption">' + s(this.caption) + "</div>"), void 0 !== this.description && (e += '<div class="description">' + s(this.description) + "</div>"), e += "</div>", e += "</div>"), e += '<div class="meta-footer">', e += '<time class="date" datetime="' + this.created_time + '" pubdate>' + n(this.created_time) + "</time>", void 0 !== this.likes && void 0 !== this.likes.data && (void 0 !== this.likes.count ? 1 === this.likes.count ? e += '<span class="seperator">&middot;</span><span class="likes">' + t.text_labels.likes.singular.replace("%", this.likes.count) + "</span>" : e += '<span class="seperator">&middot;</span><span class="likes">' + t.text_labels.likes.plural.replace("%", this.likes.count) + "</span>" : 1 === this.likes.data.length ? e += '<span class="seperator">&middot;</span><span class="likes">' + t.text_labels.likes.singular.replace("%", this.likes.data.length) + "</span>" : e += '<span class="seperator">&middot;</span><span class="likes">' + t.text_labels.likes.plural.replace("%", this.likes.data.length) + "</span>"), void 0 !== this.comments && void 0 !== this.comments.data && (1 === this.comments.data.length ? e += '<span class="seperator">&middot;</span><span class="comments">' + t.text_labels.comments.singular.replace("%", this.comments.data.length) + "</span>" : e += '<span class="seperator">&middot;</span><span class="comments">' + t.text_labels.comments.plural.replace("%", this.comments.data.length) + "</span>"), void 0 !== this.shares ? 1 === this.shares.count ? e += '<span class="seperator">&middot;</span><span class="shares">' + t.text_labels.shares.singular.replace("%", this.shares.count) + "</span>" : e += '<span class="seperator">&middot;</span><span class="shares">' + t.text_labels.shares.plural.replace("%", this.shares.count) + "</span>" : e += '<span class="seperator">&middot;</span><span class="shares">' + t.text_labels.shares.plural.replace("%", "0") + "</span>", i = this.id.split("_"), e += '<div class="actionlinks"><span class="like"><a href="http://www.facebook.com/permalink.php?story_fbid=' + i[1] + "&id=" + i[0] + '" target="_blank">' + t.text_labels.like + '</a></span><span class="seperator">&middot;</span><span class="comment"><a href="http://www.facebook.com/permalink.php?story_fbid=' + i[1] + "&id=" + i[0] + '" target="_blank">' + t.text_labels.comment + '</a></span><span class="seperator">&middot;</span><span class="share"><a href="http://www.facebook.com/permalink.php?story_fbid=' + i[1] + "&id=" + i[0] + '" target="_blank">' + t.text_labels.share + "</a></span></div>", e += "</div>", void 0 !== this.likes && void 0 !== this.likes.data) { e += '<ul class="like-list">'; for (var l = 0; l < this.likes.data.length; l++) e += '<li class="like">', e += '<div class="meta-header">', e += '<div class="avatar"><a href="http://www.facebook.com/profile.php?id=' + this.likes.data[l].id + '" target="_blank" title="' + this.likes.data[l].name + '"><img src="' + (o + this.likes.data[l].id) + "/picture?type=" + t.avatar_size + '" alt="' + this.likes.data[l].name + '" /></a></div>', e += '<div class="author"><a href="http://www.facebook.com/profile.php?id=' + this.likes.data[l].id + '" target="_blank" title="' + this.likes.data[l].name + '">' + this.likes.data[l].name + "</a>" + t.text_labels.likes.singular.replace("%", "") + "</div>", e += "</div>", e += "</li>"; e += "</ul>" } if (void 0 !== this.comments && void 0 !== this.comments.data) { e += '<ul class="comment-list">'; for (var r = 0; r < this.comments.data.length; r++) e += '<li class="comment">', e += '<div class="meta-header">', e += '<div class="avatar"><a href="http://www.facebook.com/profile.php?id=' + this.comments.data[r].from.id + '" target="_blank" title="' + this.comments.data[r].from.name + '"><img src="' + (o + this.comments.data[r].from.id) + "/picture?type=" + t.avatar_size + '" alt="' + this.comments.data[r].from.name + '" /></a></div>', e += '<div class="author"><a href="http://www.facebook.com/profile.php?id=' + this.comments.data[r].from.id + '" target="_blank" title="' + this.comments.data[r].from.name + '">' + this.comments.data[r].from.name + "</a></div>", e += '<time class="date" datetime="' + this.comments.data[r].created_time + '" pubdate>' + n(this.comments.data[r].created_time) + "</time>", e += "</div>", e += '<div class="message">' + s(this.comments.data[r].message) + "</div>", e += '<time class="date" datetime="' + this.comments.data[r].created_time + '" pubdate>' + n(this.comments.data[r].created_time) + "</time>", e += "</li>"; e += "</ul>" } e += "</li>", c.append(e) } }) }).done(function () { e(".facebook-loading", c).fadeOut(800, function () { e(this).remove(); for (var s = 0; s < c.children("li").length; s++) "none" === t.effect ? c.children("li").eq(s).show() : "fade" === t.effect ? c.children("li").eq(s).delay(s * t.timeout).fadeIn(t.speed) : c.children("li").eq(s).delay(s * t.timeout).slideDown(t.speed, function () { e(this).css("overflow", "visible") }) }), e.isFunction(t.on_complete) && t.on_complete.call() }) } } }(jQuery);


/*
* ===========================================================
* SOCIAL STREAM - FRAMEWORK Y
* ===========================================================
* Social stream of Facebook and Twitter, this script have 4 display types: simple list, scroll box container, slider and carousel
* The script require Flexslider for slider and carousel display type and Scroll box for scroll box display type
* Documentation: www.framework-y.com/components/social.html
* 
* Schiocco - Copyright (c) Federico Schiocchet - Schiocco - Framework Y
*/

var facebook_token = "468579063493515|vbOM4x_ROvDmC_03g3iI-KXqYA0";
(function ($) {
    $(document).ready(function () {
        $("[data-social-id].social-feed-fb").each(function () {
            var t = this;
            var count = 4;
            var optionsString = $(t).attr("data-options");
            var id = $(t).attr("data-social-id");
            var token = $(t).attr("data-token");
            if (isEmpty(token)) token = facebook_token;
            var optionsArr;
            var options = {
                access_token: token,
                limit: count,
                locale: "en_US",
                show_guest_entries: false
            }

            if (!isEmpty(optionsString)) {
                optionsArr = optionsString.split(",");
                options = getOptionsString(optionsString, options);
            }

            if (!isEmpty(id)) options["id"] = id;
            $(t).facebook_wall(options);

            if ($(t).hasClass("flexslider")) {
                var timerVar;
                timerVar = self.setInterval(function () {
                    if ($(t).find('li.post').length == options["limit"] && $(t).find('.facebook-loading').length == 0) {
                        $(t).html("<ul class='slides'>" + $(t).html() + "</ul>");


                        $(t).find("li").each(function (index) {
                            $(this).html("<div class='fb-container'>" + $(this).html() + '</div>');

                        });

                        if (isEmpty($(t).attr("data-trigger"))) $(t).initFlexSlider();
                        $(t).css("opacity", 1);
                        clearInterval(timerVar);
                    }
                }, 1000);
            }
        });
        $("[data-social-id].social-feed-tw").each(function () {
            var t = this;
            var optionsString = $(t).attr("data-options");
            var id = $(t).attr("data-social-id");
            var optionsArr;
            var options = {
                count: 10
            }

            if (!isEmpty(optionsString)) {
                optionsArr = optionsString.split(",");
                options = getOptionsString(optionsString, options);
            }

            if (!isEmpty(id)) options["username"] = id;
            $(t).twittie(options, function () {
                if ($(t).hasClass("flexslider")) {
                    $(t).find("ul").addClass("slides");
                    $(t).initFlexSlider();
                }
            });
        });
    });
}(jQuery));


