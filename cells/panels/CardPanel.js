define(['GameState'], function(GameState) {
  return {
    render: function(R, A) {
      return "" + (R(GameState.playerState.cards, function(card) {
        return "  <img class='card' src='" + card.imgUrl + "' />";
      }));
    }
  };
});