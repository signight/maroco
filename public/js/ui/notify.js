/*
 * jQuery Notify
 */
define(function(require, exports, module) {
    var template = _.dot('{{?it.type=="dialog"}}\
<i class="f f-multiply dialog-close"></i>\
<div class="dialog-title">{{=it.icon}}{{=it.title}}</div>\
<div class="dialog-con">{{=it.msg}}</div>\
{{?it.buttons}}\
<div class="dialog-foot">\
{{~it.buttons :v:i}}\
<b class="b xr m4 {{=v.cls||"log"}}">{{=v.label}}</b>\
{{~}}\
</div>\
{{?}}\
{{??}}\
{{=it.icon}}{{=it.msg}}{{?it.closeable}}<i class="f f-multiply notify-close"></i>{{?}}\
{{?}}');
    var defaults = {
            cls: 'log',
            type: 'notify',
            icon: '',
            title: '',
            msg: '', //内容
            timeout: 0,
            template: template,
            draggable: false,
            events: {
                'click >.notify-close,>.dialog-close': 'close'
            },
            onclose: $.noop,
            oninit: $.noop,
            onrender: $.noop,
            close: function(e, config) {
                config = config || this;
                config.el.remove();
                config.el = null;
                config.onclose.apply(config || this);
                config.close = $.noop;
            },
            position: {
                at: 'center',
                my: 'center',
                of: window
            },
            init: function() {
                var _t = this;
                _t.oninit.apply(_t);
                if (_t.buttons) _t.buttons.reverse();
                _t.el.addClass(_t.cls + ' ' + _t.type).html(_t.template(_t));
                if (_t.timeout) {
                    setTimeout(function() {
                        _t.close();
                    }, _t.timeout * 1000);
                }
                _t.onrender.apply(_t);
                _t.el.appendTo('body').position(_t.position);
                if (_t.draggable) {
                    _t.el.draggable();
                }

            }
        }
        //创建元素
    var dialog = function(option) {
        option = _.extend(_.proto(defaults), option);
        return UI(option);
    }
    _.extend(dialog, {
        loading: function(config) {
            return this(_.extend({
                msg: '<i class="i i-loading m2"></i> 加载中'
            }, config));
        },
        confirm: function(config) {
            return this(_.extend({
                cls: 'note',
                icon: '<i class="m2 f-lg f f-warn"></i>',
                closeable: true,
                oninit: function() {
                    this.msg += '<i class="f f-checkmark notify-checkmark"></i>';
                    this.events = {
                        'click .notify-checkmark': 'doConfirm',
                        'click .notify-close': 'doConfirm'
                    }
                    this.doConfirm = function(e, _config) {
                        _config.close();
                        config.callback && config.callback($(this).hasClass('notify-checkmark'));
                    }
                }
            }, config));
        },
        clear: function() {
            $('.notify').remove();
        }
    });
    var notifyIcon='info bell warn tool checkmark'.split(' ');
    _.each(['info', 'note', 'warn', 'error', 'safe'], function(o, i) {
        dialog[o] = function(msg, timeout) {
            return this({
                cls: o,
                icon:'<i class="m2 f-lg f f-'+notifyIcon[i]+'"></i>',
                msg: msg,
                timeout: timeout==undefined?3:timeout
            });
        }
    });
    return dialog;
});
