var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
};
define(['Events', 'PlayerState'], function(Events, PlayerState) {
  var GameState;
  GameState = (function() {
    __extends(GameState, Events);
    function GameState() {
      this.playerState = new PlayerState();
    }
    return GameState;
  })();
  return new GameState();
});