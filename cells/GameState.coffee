define ['Events','PlayerState','data/GameService'], (Events, PlayerState, GameService)->
  class GameState extends Events
    constructor: ->
      @gid = 0
  
  new GameState()
