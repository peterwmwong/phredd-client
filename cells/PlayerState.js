var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
};
define(['Events'], function(Events) {
  var PlayerState, card;
  card = function(obj) {
    return obj;
  };
  return PlayerState = (function() {
    __extends(PlayerState, Events);
    function PlayerState() {
      this.cards = [
        card({
          name: 'Fire',
          imgUrl: 'images/cards/Arcane_Sanctum.jpg'
        }), card({
          name: 'Water',
          imgUrl: 'images/cards/Arcane_Sanctum.jpg'
        }), card({
          name: 'Wind',
          imgUrl: 'images/cards/Arcane_Sanctum.jpg'
        }), card({
          name: 'Earth',
          imgUrl: 'images/cards/Arcane_Sanctum.jpg'
        }), card({
          name: 'Earth',
          imgUrl: 'images/cards/Arcane_Sanctum.jpg'
        })
      ];
    }
    return PlayerState;
  })();
});