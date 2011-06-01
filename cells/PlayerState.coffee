define ['Events'], (Events)->
  card = (obj)-> obj

  class PlayerState extends Events
    constructor: ->
      @cards = [
        card name: 'Fire', imgUrl: 'images/cards/Arcane_Sanctum.jpg'
        card name: 'Water', imgUrl: 'images/cards/Arcane_Sanctum.jpg'
        card name: 'Wind', imgUrl: 'images/cards/Arcane_Sanctum.jpg'
        card name: 'Earth', imgUrl: 'images/cards/Arcane_Sanctum.jpg'
        card name: 'Earth', imgUrl: 'images/cards/Arcane_Sanctum.jpg'
      ]


  
