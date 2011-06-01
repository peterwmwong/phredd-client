define ['GameState'], (GameState)->
  render: (R)->
    """
    <div class='container'>
    #{R ['red','pink','yellow','blue','orange','green'], (color)->"
      <div class='iconBar #{color}'>
        <div class='iconContainer'>
          <div class='icon'>&nbsp;</div>
        </div>
        <div class='barContainer'>
          <div class='bar'>&nbsp;</div>
        </div>
      </div>
    "}
    </div>
    """

