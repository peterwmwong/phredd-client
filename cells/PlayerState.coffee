define ['Events'], (Events)->
  card = (obj)-> obj

  class PlayerState extends Events
    constructor: ->
      @cards = [
        card name: 'Fire', imgUrl: 'images/cards/10.JPG'
        card name: 'Water', imgUrl: 'images/cards/11.JPG'
        card name: 'Wind', imgUrl: 'images/cards/12.JPG'
        card name: 'Earth', imgUrl: 'images/cards/13.JPG'
        card name: 'Earth', imgUrl: 'images/cards/14.JPG'
      ]


  
