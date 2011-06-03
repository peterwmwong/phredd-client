define(['data/GameService'], function(GameService) {
  return {
    render: function(R, A) {
      return GameService.getCards(function(cards) {
        return A(R(cards, function(card) {
          return "<img class='card' src='" + card.imgUrl + "' />";
        }));
      });
    }
  };
});