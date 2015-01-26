seajs.config({alias:{dot:"js/vendor/doT.min",ztree:"js/vendor/zTree/jquery.ztree.all-3.5.min.js"},paths:{ui:"js/ui"},base:seajs.resolve("/"),vars:{locale:"cn"},map:[[/^(.*\.(?:css|js))(.*)$/i,"$1?20150101"]]}),function(a){"use strict";var b=function(b){return b.$=function(b){a(b,this.el)},b.el=a(b.el||"<div/>"),b.init&&b.init.apply(b),_.each(b.events,function(c,d){var e=d.indexOf(" ");b.el.on(d.slice(0,e),a.trim(d.slice(e+1)),function(a){var d=_.isString(c)?b[c]:c;d&&d.call(this,a,b)})}),b};_.extend(b,{illegalCharacter:/[^\\\/:\*\?\"<>\|]/,itemsOnPage:15});var c;if(c=window.ActiveXObject?{ie:window.atob?10:document.addEventListener?9:document.querySelector?8:window.XMLHttpRequest?7:6}:{ie11:"-ms-scroll-limit"in document.documentElement.style&&"-ms-ime-align"in document.documentElement.style,chrome:!!window.chrome&&window.chrome.webstore,firefox:!!window.sidebar&&!window.sidebar.nodeName,safari:/constructor/i.test(window.HTMLElement),opera:!!window.opera||/opera|opr/i.test(navigator.userAgent)},b.browser=c,_.mixin({guid:function(a){var b,c=_.now().toString(32);for(b=0;5>b;b++)c+=Math.floor(65535*Math.random()).toString(32);return c+=_.uniqueId().toString(32),a?a+c:c},proto:Object.create||function(a){function b(){}return b.prototype=a,new b},dot:doT.template,queryString:function(b,c,d){var e={};if("string"!=typeof b||0===a.trim(b).length)return e;b=a.trim(b).replace(/^\?+/,"");var f,g,h,i,j=b.split(c||"&"),k=/^(\w+)\[\]$/;d=d||"=";for(var l=0;l<j.length;l++)f=j[l].split(d),g=decodeURIComponent(a.trim(f[0])),h=decodeURIComponent(a.trim(f.slice(1).join(d))),i=g.match(k),i&&i[1]&&(g=i[1]),e.hasOwnProperty(g)?(_.isArray(e[g])||(e[g]=[e[g]]),e[g].push(h)):e[g]=i?[h]:h;return e}}),c.ie<10){var d=/^INPUT|TEXTAREA$/,e=function(a){return d.test(a.nodeName)};a.event.special.input={setup:function(){if(!e(this))return!1;var b=this,d=this.value,f=function(){d!==b.value&&(d=b.value,a.event.trigger("input",null,b))};d=b.value,9==c.ie&&(a.event.add(b,"keyup._inputFixed",function(a){var b=a.originalEvent.keyCode;(8==b||46==b)&&f()}),a.event.add(b,"cut._inputFixed",function(){setTimeout(f)})),b.attachEvent("onpropertychange",a.data(b,"@inputFixed",function(a){"value"==a.propertyName.toLowerCase()&&f()}))},teardown:function(){return e(this)?(9==c.ie&&a.event.remove(this,"._inputFixed"),this.detachEvent("onpropertychange",a.data(this,"@inputFixed")),void a.removeData(this,"@inputFixed")):!1}}}a.fn.input=function(a){return this.on("input",a)};var f=function(b){b=a.extend({baseparms:{},beforeLoad:a.noop,afterLoad:a.noop},b);var c=b.filter,d=b.baseparms;return d.count&&!d.page&&(d.page=1),{config:b,load:function(d){b.beforeLoad.call(b,d),d&&(c=d);var e=a.extend({},baseparams,c);a.ajax({url:b.url,data:e,cache:b.cache,dataType:"JSON",success:function(a){b.afterLoad.call(b,a)}})}}};b.loader=f;var g=["log","silver","note","info","warn","error","link"],h=b.button=function(b,c){var d=a(b);return void 0===d.data("btype")&&(c=c||_.find(g,function(a){return d.hasClass(a)}),c&&(d.addClass(c+"-hover"),d.mouseenter(function(){a(this).addClass(c+"-hover")}).mouseleave(function(){a(this).removeClass(c+"-hover")}).mousedown(function(b){var d=a(this);d.hasClass("active")||(b.preventDefault(),d.addClass(c+"-active"),a(document).one("mouseup",function(){d.removeClass(c+"-active")}))})),d.data("btype",c)),d};a(document).on("mouseenter",".b."+g.join(",.b."),function(){h(this)}),define("ui",function(require){return require("api"),b}),window.UI=b}(jQuery),$.ajaxSetup({cache:!UI.browser.ie,complete:function(){},data:{},error:function(){}}),$(document).ajaxSuccess(function(a,b){b.responseJSON&&10000001==b.responseJSON.errorCode}),function(){if(!window.console){var a=window.console={};_.each("assert clear count debug dir dirxml error exception group groupCollapsed groupEnd info log markTimeline profile profileEnd table time timeEnd timeStamp trace warn".split(" "),function(b){a[b]=$.noop})}}(),UI.browser.ie<9&&_.each("abbr article aside audio bdi canvas data datalist details dialog figcaption figure footer header hgroup main mark meter nav output picture progress section summary template time video".split(" "),function(a){document.createElement(a)});