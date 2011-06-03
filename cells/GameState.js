var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
};
define(['Events', 'PlayerState', 'data/GameService'], function(Events, PlayerState, GameService) {
  var GameState;
  GameState = (function() {
    __extends(GameState, Events);
    function GameState() {
      this.gid = 0;
    }
    return GameState;
  })();
  return new GameState();
});