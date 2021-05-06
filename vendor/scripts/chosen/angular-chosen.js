/**
 * angular-chosen-localytics - Angular Chosen directive is an AngularJS Directive that brings the Chosen jQuery in a Angular way
 * @version v1.8.0
 * @link http://github.com/leocaseiro/angular-chosen
 * @license MIT
 */
(function(){var e,t=[].indexOf||function(e){for(var t=0,n=this.length;t<n;t++)if(t in this&&this[t]===e)return t;return-1};angular.module("localytics.directives",[]),e=angular.module("localytics.directives"),e.provider("chosen",function(){var e;return e={},{setOption:function(t){angular.extend(e,t)},$get:function(){return e}}}),e.directive("chosen",["chosen","$timeout",function(e,n){var r,i,a,s;return i=/^\s*([\s\S]+?)(?:\s+as\s+([\s\S]+?))?(?:\s+group\s+by\s+([\s\S]+?))?\s+for\s+(?:([\$\w][\$\w]*)|(?:\(\s*([\$\w][\$\w]*)\s*,\s*([\$\w][\$\w]*)\s*\)))\s+in\s+([\s\S]+?)(?:\s+track\s+by\s+([\s\S]+?))?$/,r=["persistentCreateOption","createOptionText","createOption","skipNoResults","noResultsText","allowSingleDeselect","disableSearchThreshold","disableSearch","enableSplitWordSearch","inheritSelectClasses","maxSelectedOptions","placeholderTextMultiple","placeholderTextSingle","searchContains","singleBackstrokeDelete","displayDisabledOptions","displaySelectedOptions","width","includeGroupLabelInSelected","maxShownResults"],s=function(e){return e.replace(/[A-Z]/g,function(e){return"_"+e.toLowerCase()})},a=function(e){var t;if(angular.isArray(e))return 0===e.length;if(angular.isObject(e))for(t in e)if(e.hasOwnProperty(t))return!1;return!0},{restrict:"A",require:"?ngModel",priority:1,link:function(o,l,u,c){var d,f,h,g,p,b,v,y,S,w,O,m;if(o.disabledValuesHistory=o.disabledValuesHistory?o.disabledValuesHistory:[],l=$(l),l.addClass("localytics-chosen"),f=o.$eval(u.chosen)||{},b=angular.copy(e),angular.extend(b,f),angular.forEach(u,function(e,n){if(t.call(r,n)>=0)return u.$observe(n,function(e){var t;return t=String(l.attr(u.$attr[n])).slice(0,2),b[s(n)]="{{"===t?e:o.$eval(e),w()})}),y=function(){return l.addClass("loading").attr("disabled",!0).trigger("chosen:updated")},S=function(){return l.removeClass("loading"),angular.isDefined(u.disabled)?l.attr("disabled",u.disabled):l.attr("disabled",!1),l.trigger("chosen:updated")},d=null,h=!1,g=function(){var e,t;if(d){if(t=$(l.next(".chosen-with-drop")),t&&t.length>0)return;return l.trigger("chosen:updated")}if(o.$evalAsync(function(){d=l.chosen(b).data("chosen")}),angular.isObject(d))return e=d.default_text},w=function(){return d&&h?l.attr("data-placeholder",d.results_none_found).attr("disabled",!0):l.removeAttr("data-placeholder"),l.trigger("chosen:updated")},c?(v=c.$render,c.$render=function(){return v(),g()},l.on("chosen:hiding_dropdown",function(){return o.$apply(function(){return c.$setTouched()})}),u.multiple&&(m=function(){return c.$viewValue},o.$watch(m,c.$render,!0))):g(),u.$observe("disabled",function(){return l.trigger("chosen:updated")}),u.ngOptions&&c)return p=u.ngOptions.match(i),O=p[7],o.$watchCollection(O,function(e,t){var r;return r=n(function(){return angular.isUndefined(e)?y():(h=a(e),S(),w())})}),o.$on("$destroy",function(e){if("undefined"!=typeof timer&&null!==timer)return n.cancel(timer)})}}}])}).call(this);