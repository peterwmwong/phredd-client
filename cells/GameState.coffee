define ['Events','PlayerState'], (Events,PlayerState)->
  class GameState extends Events
    constructor: ->
      @playerState = new PlayerState()
  
  new GameState()
