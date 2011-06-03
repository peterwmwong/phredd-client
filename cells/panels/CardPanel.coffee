define ['data/GameService'], (GameService)->
  render: (R,A)->
    GameService.getCards (cards)->
      A R cards, (card)->
        "<img class='card' src='#{card.imgUrl}' />"
