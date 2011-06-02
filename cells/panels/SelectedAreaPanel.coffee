define ['GameState'], (GameState)->
  render: (R)->
    """
    <div class='unitgroup'>
    #{R ['Ant','Snake','Tiger','Leviathan'], (name)->"
      <div class='unit'>
        <div class='icon'></div>
        <div class='info'>
          <div class='name'>#{name}</div>
          <div class='healthbar'></div>
        </div>
      </div>
    "}
    </div>
    """
