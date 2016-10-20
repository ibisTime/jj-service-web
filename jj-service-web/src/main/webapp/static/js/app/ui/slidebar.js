define([
    'app/util/event',
    'app/util/position',
    'Handlebars'
], function(event, pos, Handlebars) {

    var template = __inline('slidebar.handlebars');
    var css = __inline('slidebar.css');
    $('<style>'+css+'</style>').appendTo('head');

    var isMoved = false;

    var init = function(cfg, place) {
        this.cfg = cfg;
        var selector = place ? '#' + place : 'body';
        var items = cfg.items, item, resItems = [];
        for (var i = 0, len = items.length; i < len; i++) {
            item = items[i];
            if (typeof item != 'object') {
                item = {value: item, displayValue: item};
            }
            resItems.push(item);
        }
        this.items = resItems;
        this.onTap = cfg.onTap;
        var content = template({items: resItems});
        this.$el = $(content).appendTo(selector);
        this.$innerEl = this.$el.find('.slidebar-inner');
        this.$itemsEl = this.$el.find('.slidebar-scale');
        this.$indicatorEl = this.$el.find('.slidebar-indicator');
        this.disable(cfg.disabled);
        this.select(cfg.value);
    };

    var initEvent = function() {
        var me = this;
        event.tap(this.$innerEl, function(dom, e) {
            if (!me.disabled) {
                var target = e.target;
                if ($(e.target).hasClass('slidebar-scale')) {
                    var oldValue = me.value;
                    me.select($(target).attr('data-value'));
                    if (oldValue != me.value) {
                        me.onTap && me.onTap(me.value);
                    }
                }
            }

        });

        me.$innerEl.on('touchstart', function(e) {
            e.preventDefault();
            var target = e.target;
            if (me.canMove(target)) {
                me.$indicatorEl.addClass('slidebar-indicator-pressed');
                me.$indicatorEl.removeClass('slidebar-indicator-animated');
                isMoved = true;
            }
        });
        me.$innerEl.on('touchmove', function(e) {
            e.preventDefault();
            var target = e.target;
            if (isMoved) {
                var offset = e.originalEvent.changedTouches[0].clientX - me.$indicatorEl.width() / 2 - me.$el[0].offsetLeft;
                offset = Math.max(offset, 2);
                offset = Math.min(offset, me.$el.width() - me.$indicatorEl.width());
                me.$indicatorEl.css('left', offset + 'px');
            }
        });
        me.$innerEl.on('touchend', function(e) {
            if (isMoved) {
                me.$indicatorEl.removeClass('slidebar-indicator-pressed');
                var unitLength = me.$el.width() / me.cfg.items.length;
                var offset = parseFloat(me.$indicatorEl.css('left')) + me.$indicatorEl.width() / 2;
                var resultIndex = Math.floor(offset / unitLength);
                var oldValue = me.value;
                me.select(resultIndex);
                if (oldValue != me.value) {
                    me.onTap && me.onTap(me.value);
                }
                isMoved = false;
            }
        });
    };

    SlideBar.prototype.canMove = function(target) {
        return ($(target).hasClass('active') || $(target).hasClass('slidebar-indicator')) && !this.disabled;
    };

    function SlideBar(cfg, place) {
        init.call(this, cfg, place);
        initEvent.call(this);
    }

    SlideBar.prototype.select = function(item) {
        this.$indicatorEl.addClass('slidebar-indicator-animated');
        var selectedEl;
        if (typeof item == 'number') {
            selectedEl = this.$itemsEl[item];
        } else if (!item) {
            selectedEl = this.$itemsEl[0];
        } else if (typeof item == 'string') {
            for (var i = 0, len = this.items.length; i < len; i++) {
                var _item = this.items[i];
                if (_item.value == item) {
                    selectedEl = this.$itemsEl[i];
                    break;
                }
            }
        }
        var width = pos.clientRect(selectedEl).width;
        this.value = $(selectedEl).attr('data-value');
        var offsetLeft = selectedEl.offsetLeft;
        this.$indicatorEl.css({
            'left': (offsetLeft - 0) + 'px',
            'width': width
        });
        this.$itemsEl.removeClass('active');
        $(selectedEl).addClass('active');
    };

    SlideBar.prototype.disable = function(disabled) {
        if (disabled) {
            this.$el.addClass('disabled');
        } else {
            this.$el.removeClass('disabled');
        }
        this.disabled = disabled;
    };

    return SlideBar;

});