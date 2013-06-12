(function(){var t=function(t,e){return function(){return t.apply(e,arguments)}},e={}.hasOwnProperty,i=function(t,i){function n(){this.constructor=t}for(var o in i)e.call(i,o)&&(t[o]=i[o]);return n.prototype=i.prototype,t.prototype=new n,t.__super__=i.prototype,t},n=[].indexOf||function(t){for(var e=0,i=this.length;i>e;e++)if(e in this&&this[e]===t)return e;return-1};if("undefined"==typeof Backbone||null===Backbone)throw Error("Backbone is not defined. Please include the latest version from http://documentcloud.github.com/backbone/backbone.js");Backbone.Modal=function(e){function o(){this.triggerCancel=t(this.triggerCancel,this),this.triggerSubmit=t(this.triggerSubmit,this),this.triggerView=t(this.triggerView,this),this.clickOutside=t(this.clickOutside,this),this.checkKey=t(this.checkKey,this),this.args=Array.prototype.slice.apply(arguments),Backbone.View.prototype.constructor.apply(this,this.args),this.setUIElements(),this.delegateModalEvents()}return i(o,e),o.prototype.prefix="bb-modal",o.prototype.render=function(t){var e,i,n=this;return null==t&&(t={}),e=this.serializeData(),this.$el.addClass(""+this.prefix+"-wrapper"),this.modalEl=$("<div />").addClass(this.prefix),this.template&&this.modalEl.html(this.template(e)),this.$el.html(this.modalEl),$("body").on("keyup",this.checkKey),$("body").on("click",this.clickOutside),this.viewContainer?(this.viewContainerEl=this.modalEl.find(this.viewContainer),this.viewContainerEl.addClass(""+this.prefix+"-views")):this.viewContainerEl=this.modalEl,this.$el.show(),(null!=(i=this.views)?i.length:void 0)>0&&this.openAt(0),"function"==typeof this.onRender&&this.onRender(),this.modalEl.css({opacity:0}),this.$el.fadeIn({duration:100,complete:function(){return n.modalEl.addClass(""+n.prefix+"-animation-open")}}),this},o.prototype.setUIElements=function(){var t;if(this.template=this.getOption("template"),this.views=this.getOption("views"),null!=(t=this.views)&&(t.length=_.size(this.views)),this.viewContainer=this.getOption("viewContainer"),this.$el.hide(),_.isUndefined(this.template)&&_.isUndefined(this.views))throw Error("No template or views defined for Backbone.Modal");if(this.template&&this.views&&_.isUndefined(this.viewContainer))throw Error("No viewContainer defined for Backbone.Modal")},o.prototype.getOption=function(t){return t?this.options&&n.call(this.options,t)>=0&&null!=this.options[t]?this.options[t]:this[t]:void 0},o.prototype.serializeData=function(){var t;return t={},this.model&&(t=_.extend(t,this.model.toJSON())),this.collection&&(t=_.extend(t,{items:this.collection.toJSON()})),t},o.prototype.delegateModalEvents=function(){var t,e,i,n,o,s,r;this.active=!0,t=this.getOption("cancelEl"),o=this.getOption("submitEl"),o&&this.$el.on("click",o,this.triggerSubmit),t&&this.$el.on("click",t,this.triggerCancel),r=[];for(e in this.views)"length"!==e?(i=e.match(/^(\S+)\s*(.*)$/),s=i[1],n=i[2],r.push(this.$el.on(s,n,this.views[e],this.triggerView))):r.push(void 0);return r},o.prototype.undelegateModalEvents=function(){return this.active=!1,this.$el.off()},o.prototype.checkKey=function(t){if(this.active)switch(t.keyCode){case 27:return this.triggerCancel();case 13:return this.triggerSubmit()}},o.prototype.clickOutside=function(t){return $(t.target).hasClass(""+this.prefix+"-wrapper")&&this.active?this.triggerCancel(null,!0):void 0},o.prototype.buildView=function(t){var e;if(t)return _.isFunction(t)?(e=new t(this.args[0]),e instanceof Backbone.View?{el:e.render().$el,view:e}:{el:t(this.args[0])}):{view:t,el:t.$el}},o.prototype.triggerView=function(t){var e,i;return null!=t&&"function"==typeof t.preventDefault&&t.preventDefault(),i=t.data,e=this.buildView(i.view),this.currentView=e.view||e.el,i.onActive&&(_.isFunction(i.onActive)?i.onActive(this):_.isString(i.onActive)&&this[i.onActive].call(this,i)),this.shouldAnimate?this.animateToView(e.el):(this.shouldAnimate=!0,this.$(this.viewContainerEl).html(e.el))},o.prototype.animateToView=function(t){var e,i,n,o,s=this;return o=$("<tester/>"),o.html(this.$el.clone().css({top:-9999,left:-9999})),0!==$("tester").length?$("tester").replaceWith(o):$("body").append(o),e=this.viewContainer?o.find(this.viewContainer):o,e.removeAttr("style"),n=e.outerHeight(),e.html(t),i=e.outerHeight(),n===i?this.$(this.viewContainerEl).html(t):(this.$(this.viewContainerEl).css({opacity:0}),this.$(this.viewContainerEl).animate({height:i},100,function(){return s.$(s.viewContainerEl).removeAttr("style"),s.$(s.viewContainerEl).html(t)}))},o.prototype.triggerSubmit=function(t){return null!=t&&t.preventDefault(),this.beforeSubmit&&this.beforeSubmit()===!1?void 0:("function"==typeof this.submit&&this.submit(),this.regionEnabled?this.trigger("modal:close"):this.close())},o.prototype.triggerCancel=function(t){return null!=t&&t.preventDefault(),this.beforeCancel&&this.beforeCancel()===!1?void 0:("function"==typeof this.cancel&&this.cancel(),this.regionEnabled?this.trigger("modal:close"):this.close())},o.prototype.close=function(){var t=this;return $("body").off("keyup",this.checkKey),$("body").off("click",this.clickOutside),console.log("yayy"),"function"==typeof this.onClose&&this.onClose(),this.shouldAnimate=!1,this.modalEl.addClass("bb-modal-animation-close"),this.$el.fadeOut({duration:200}),_.delay(function(){var e;return null!=(e=t.currentView)&&"function"==typeof e.remove&&e.remove(),t.remove()},200)},o.prototype.openAt=function(t){var e,i,n;e=0;for(i in this.views)"length"!==i&&(e===t&&(n=this.views[i]),e++);return n&&(this.currentIndex=t,this.triggerView({data:n})),this},o.prototype.next=function(){return this.currentIndex+1<this.views.length-1?this.openAt(this.currentIndex+1):void 0},o.prototype.previous=function(){return this.currentIndex-1<this.views.length-1?this.openAt(this.currentIndex-1):void 0},o}(Backbone.View)}).call(this);