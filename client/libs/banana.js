;(function (window, $) {
    var banana = this.banana = function(element, methods) {
        this.element = element;
        this.$element = $(element);
        this.methods = $.extend({}, this.defaults, methods);

        this.init();
    };
    
    /*!
     * (c) Todd Oh. All rights reserved.
     * 
     * banana 2.5
     */
    
    banana.prototype = {
        defaults: {
            set: ['1'],
            alpha: null,
            duration: null,
            timing: 'cubic-bezier(0.2, 1.0, 0.1, 1)',
            transform: null,
            rotate: 0,
            scale: 0,
            animation: null,
            anidelay: 0,
            callback: function() {}
        },
        
        init: function () {
            var self = this, seq = self.methods.set, st = 500;
            if (!$.isEmptyObject(seq)) {
                $.each(seq, function () {
                    var methodData = this.toString();
                    switch (methodData) {
                    case '1':
                        self.load();
                        break;
                    case '0':
                        self.unload();
                        break;
                    case 'activetrans':
                        self.movement('load');
                        break;
                    case 'inactivetrans':
                        self.movement('unload');
                        break;
                    case 'trans':
                        self.movement();
                        break;
                    case 'activeani':
                        self.animateobj('load');
                        break;
                    case 'inactiveani':
                        self.animateobj('unload');
                        break;
                    case 'ani':
                        self.animateobj();
                        break;
                    case 'callback':
                        if (self.methods.duration !== null) {
                            setTimeout(function () { self.methods.callback(); }, self.methods.duration);
                        } else {
                            setTimeout(function () { self.methods.callback(); }, st);
                        }
                        break;
                    }

                    return this;
                });
            }

            return;
        },

        load: function () {
            var self = this, element = self.element, method = self.methods;
            try {
                if ($(element).attr('banana-status') != '1') {
                    if ($(element).attr('banana-option') == 'baseresize') {
                        $(element).attr('banana-option', 'baseresizeDo');
                    }

                    $(element).attr('banana-status','none');

                    if (method.duration !== null) {
                        if ($(element).attr('banana-option') == 'baseresizeDo') {
                            $(element).attr('banana-option', 'baseresize');
                        }
                        $(element).attr('banana-status','1');
                    } else {
                        setTimeout(function () {
                            if ($(element).attr('banana-option') == 'baseresizeDo') {
                                $(element).attr('banana-option', 'baseresize');
                            }
                            $(element).attr('banana-status','1');
                        }, 50);
                    }
                }
            } catch (err) {

            }

            return;
        },

        unload: function () {
            var self = this, element = self.element, method = self.methods, st = 500;
            try {
                if ($(element).attr('banana-status') == '1') {
                    $(element).attr('banana-status','none');
                    var transitCode = $(element).attr('banana-option');
                    if (transitCode !== undefined && transitCode.toLowerCase().indexOf('base') !== -1) {
                        if ($(element).attr('banana-option') == 'baseresizeAll') {
                            $(element).attr('banana-option', 'baseresizeAllDo');
                        }
                        
                        setTimeout(function () {
                            $(element).attr('banana-status','0');
                            if ($(element).attr('banana-option') == 'baseresizeDo') {
                                $(element).attr('banana-option', 'baseresize');
                            } else if ($(element).attr('banana-option') == 'baseresizeAllDo') {
                                $(element).attr('banana-option', 'baseresizeAll');
                            }
                        }, st);
                    } else {
                        if ($(element).attr('banana-status') != '0') {
                            $(element).attr('banana-status','0');
                        }
                    }
                }
            } catch (err) {
                //
            }

            return;
        },
        
        movement: function (statusparam) {
            var self = this, element = self.element, method = self.methods, delay = 50;
            method.transform = $.extend({data: "0, 0, 0"}, method.transform);
            if (statusparam === 'load') {
                self.load();
            } else {
                delay = 0;
            }

            try {
                var transformData;
                if (method.rotate !== 0) {
                    transformData = 'translate3d(' + method.transform.data + ') rotate(' + method.rotate + 'deg)';
                } else if (method.scale !== 0) {
                    transformData = 'scale3d(' + method.transform.data + ')';
                } else {
                    transformData = 'translate3d(' + method.transform.data + ')';
                }
                
                setTimeout(function() {
                    $(element).css({ 
                        transitionDuration: method.duration + 'ms',
                        opacity: method.alpha,
                        transitionTimingFunction: method.timing,
                        transform: transformData
                    });

                    setTimeout(function() {
                        if (statusparam === 'unload') {
                            self.unload();
                            $(element).css({ 
                                transitionDuration: '', 
                                transitionTimingFunction: '',
                                transform: ''
                            });
                        } else if (statusparam === 'load') {
                            $(element).css({ 
                                transitionDuration: '0s', 
                                transitionTimingFunction: 'ease'
                            });
                        } else {
                            if (method.alpha !== null && method.alpha < 1.0) {
                                $(element).css({ 
                                    transitionDuration: '', 
                                    transitionTimingFunction: ''
                                });
                            } else {
                                $(element).css({ 
                                    transitionDuration: '', 
                                    transitionTimingFunction: '',
                                    transform: '',
                                    opacity: ''
                                });
                            }
                            
                        }
                    }, method.duration);
                }, delay);
            } catch (err) {
                //
            }
            
            return;
        },
        
        animateobj: function (statusparam) {
            var self = this, element = self.element, method = self.methods, delay = 50;
            if (statusparam === 'load') {
                self.load();
            } else {
                delay = 0;
            }

            $(element).removeClass(method.animation);
            
            setTimeout(function() {
                $(element).addClass(method.animation);
                switch (statusparam) {
                case 'load':
                    switch (method.animation) {
                    case 'objPopout':
                        //$(element).addClass('objScaled');
                        break;
                    }
                    break;
                case 'unload':
                    setTimeout(function() { 
                        self.unload(); 
                        switch (method.animation) {
                        case 'objPopin':
                            $(element).removeClass('objPopout');
                            $(element).removeClass('objPrePopout');
                            $(element).removeClass('objPopin');
                            break;
                        }
                    }, 500);
                    break;
                }

                $(element).one('animationend webkitAnimationEnd', function () {
                    switch (method.animation) {
                    case 'objPopShadow':
                        $(element).removeClass('objPopShadow');
                        break;
                    case 'objShake':
                        $(element).removeClass('objShake');
                        break;
                    case 'objBounce':
                        $(element).removeClass('objBounce');
                        break;
                    }
                });
            }, delay + method.anidelay);
            
            return;
        }
    };
    
    banana.defaults = banana.prototype.defaults;
    
    $.fn.banana = function(methods){
        new banana(this, methods);
        return;
    };
    
    window.banana = banana;
    
})(window, $);