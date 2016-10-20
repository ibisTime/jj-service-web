define([], function() {
    var res = {};
    res.container = function() {
      return {
          height: document.documentElement.clientHeight,
          width: document.documentElement.clientWidth
      };
    };
    res.offset = function(el) {
        return $(el).offset();
    };
    res.clientRect = function(el) {
        return el.getBoundingClientRect();
    };
    return res;
});