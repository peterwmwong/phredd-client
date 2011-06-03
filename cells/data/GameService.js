define(function() {
  var Card, Unit, sid;
  Unit = function(c) {
    return c;
  };
  Card = function(c) {
    return c;
  };
  sid = 0;
  return {
    getCards: function(done) {
      var i;
      return done((function() {
        var _results;
        _results = [];
        for (i = 1; i <= 5; i++) {
          _results.push(Card({
            name: "Card " + i,
            desc: "Desc " + i,
            imgUrl: "images/cards/1" + i + ".JPG"
          }));
        }
        return _results;
      })());
    },
    getManaState: function(done) {
      return done({
        fire: 100,
        water: 80,
        ice: 75,
        wind: 40,
        earth: 20
      });
    },
    getArea: function(_arg, done) {
      var x, y;
      x = _arg.x, y = _arg.y;
      return done({
        land: {
          type: 'fire'
        },
        group: {
          type: 'ally',
          units: [
            Unit({
              name: 'Ant',
              health: 75
            }), Unit({
              name: 'Snake',
              health: 50
            }), Unit({
              name: 'Tiger',
              health: 30
            }), Unit({
              name: 'Dragon',
              health: 100
            })
          ]
        }
      });
    }
  };
});