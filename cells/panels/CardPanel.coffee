define ['GameState'], (GameState)->
  render: (R,A)->
    """
    #{R GameState.playerState.cards, (card)-> "
      <img class='card' src='#{card.imgUrl}' />
    "}
    """
