var __slice = Array.prototype.slice;
define(function() {
  var Eventful;
  return Eventful = (function() {
    function Eventful() {}
    Eventful.constructor = function() {
      return this.bus = $(document.createElement('div'));
    };
    Eventful.prototype.bind = function() {
      var args, _ref;
      args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      return (_ref = this.bus).bind.apply(_ref, args);
    };
    Eventful.prototype.one = function() {
      var args, _ref;
      args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      return (_ref = this.bus).one.apply(_ref, args);
    };
    Eventful.prototype.unbind = function() {
      var args, _ref;
      args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      return (_ref = this.bus).unbind.apply(_ref, args);
    };
    return Eventful;
  })();
});